import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchAllCustomerDataQuery, useUpdateCustomerMutation, useDeleteCustomerMutation } from "../redux/api";
import Pagination from "@mui/material/Pagination";
import { Paper, Grid, Box, Button, List, ListItem, ListItemText, ListSubheader, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddProduct from "./AddProduct";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { lightBlue } from '@mui/material/colors';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1a20227' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  margin: 10,
  paddingBottom: theme.spacing(4),
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  marginRight: theme.spacing(2),
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

function AdminView() {
  const { data: customers, error, isLoading, refetch } = useFetchAllCustomerDataQuery();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(9);
  const token = useSelector(state => state.auth.token); 
  
  const filteredCustomers = customers && customers.length > 0
  ? customers.filter((customer) =>
    customer.username && customer.username.toLowerCase().includes(searchQuery.toLowerCase())
)
: [];

const indexOfLastCustomer = currentPage * customersPerPage;
const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
const currentCustomers = filteredCustomers.slice(
  indexOfFirstCustomer,
  indexOfLastCustomer
);

const handlePageChange = (event, value) => setCurrentPage(value);

const handleDeleteCustomer = async (customerId) => {


  const customer = customers.find((cust) => cust.id === customerId);

  if (customer) {
    try {
      await deleteCustomer(customerId).unwrap();
      console.log(`Customer ${customerId} (${customer.username}) deleted successfully`);
      refetch(); // Refetch the customer data after delete
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  } else {
    console.error(`Customer with id ${customerId} not found`);
  }
};

const handleToggleAdmin = async (customerId) => {
  const customer = customers.find((cust) => cust.id === customerId);
  if (customer) {
    const updatedCustomer = { ...customer, isAdmin: !customer.isAdmin };
    try {
      await updateCustomer({ id: customer.id, ...updatedCustomer }).unwrap();
      console.log(`Customer ${customer.id}, ${customer.username} admin status toggled successfully`);
    } catch (error) {
      console.error("Failed to update customer:", error);
    }
  }
};

  return (
    <>
      <AddProduct />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <SearchContainer>
                <SearchInput
                  label="Search customers"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchContainer>
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : error ? (
                <Typography>Error: {error.message}</Typography>
              ) : (
                <>
                  {currentCustomers.map((customer) => (
                    <Box key={customer.id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography>{customer.username}</Typography>
                      <ButtonGroup>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleToggleAdmin(customer.id)}
                        >
                          Toggle Admin
                        </Button>
                      </ButtonGroup>
                    </Box>
                  ))}
                  {filteredCustomers.length > customersPerPage && (
                    <Pagination
                      count={Math.ceil(filteredCustomers.length / customersPerPage)}
                      color="primary"
                      onChange={handlePageChange}
                      page={currentPage}
                      sx={{ mt: 2 }}
                    />
                  )}
                </>
              )}
            </Item>
            <Item>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 800,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                {currentCustomers.map((customer) => (
                  <li key={`section-${customer.id}`}>
                    <ul className="user-list">
                      <ListSubheader>{`${customer.firstName} ${customer.lastName}`}</ListSubheader>
                      <ListItem>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <ListItemText primary={`Username: ${customer.username}`} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <ListItemText primary={`Email: ${customer.email}`} />
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <ListItemText 
                              primary={`${customer.addressLine1}, ${customer.addressLine2}, ${customer.city}, ${customer.state} ${customer.postalCode}`} 
                            />
                          </Grid>
                        </Grid>
                      </ListItem>
                    </ul>
                  </li>
                ))}
              </List>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AdminView;

