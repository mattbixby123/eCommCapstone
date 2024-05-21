import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchAllCustomerDataQuery } from "../redux/api";
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
  const { data: customers, error, isLoading } = useFetchAllCustomerDataQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(9);
  const token = useSelector(state => state.auth.token); // Using useSelector to access the token
  
  const filteredCustomers = customers && customers.length > 0
  ? customers.filter((customer) =>
    customer.username && customer.username.toLowerCase().includes(searchQuery.toLowerCase())
)
: [];

// Get current customers for pagination
const indexOfLastCustomer = currentPage * customersPerPage;
const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
const currentCustomers = filteredCustomers.slice(
  indexOfFirstCustomer,
  indexOfLastCustomer
);

// Change page
const handlePageChange = (event, value) => setCurrentPage(value);

// Handle delete customer
// const handleDeleteCustomer = (customerId) => {
//   // Your delete logic here
// };

// Handle toggle isAdmin status
// const handleToggleAdmin = (customerId) => {
//   // Your toggle admin logic here
// };

// Filter customers based on search query

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

/*import { useState } from 'react';
import './App.css';

import { mockTransactions } from './mockData';

/* My list creates a customer scroll list with amount spent and date of transaction */

//     <>
//     <h2>Customer Log</h2>
    
 
//     </>

// /* My Chart organizes revenue by year by mapping over mock transactions */

// function MyChart() {
//   let nineteen = 0;
//   let twenty = 0;
//   let twentyone = 0;
//   let twentytwo = 0

//   mockTransactions.map((transaction) => {
//     if (transaction.date.includes('2019')) {
//       nineteen += parseInt(transaction.cost)
//     } else if (transaction.date.includes('2020')) {
//       twenty += parseInt(transaction.cost)
//     } else if (transaction.date.includes('2021')) {
//       twentyone += parseInt(transaction.cost)
//     } else twentytwo += parseInt(transaction.cost)
//   });
  
//   return (
//     <>
//     <h2>Revenue by Year</h2>
//     <BarChart
//       series={[
//         { data: [nineteen, twenty, twentyone, twentytwo] },
//       ]}
//       height={290}
//       xAxis={[{ data: ['2019', '2020', '2021', '2022'], scaleType: 'band' }]}
//       margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
//     />
//     </>
//   );
// }

// /* Displays Revenues earned */

// function RevenuesEarned() {
//   let revenue = 0;
//     mockTransactions.forEach((transaction) => {
//       revenue += parseInt(transaction.cost)
//     });
//     console.log(revenue);
//     return `$${revenue}`;
  
// }




// /* Displays sidebar */

// function MyAccordion() {
//   return (
//     <div>
//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1-content"
//           id="panel1-header"
//         >
//           Dashboard
//         </AccordionSummary>
//         <AccordionDetails>
//           1. The customer log contains all restaurant transactions between 2019 and 2022.        
//         </AccordionDetails>
//         <AccordionDetails>
//           2. The total revenues earned are displayed
//         </AccordionDetails>
//         <AccordionDetails>
//           3. A chart showing the revenues earned by year demonstrates that 2022 was the most profitable year.
//         </AccordionDetails>
//       </Accordion>
//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2-content"
//           id="panel2-header"
//         >
//           Address
//         </AccordionSummary>
//         <AccordionDetails>
//           123 Restaurant Row
//         </AccordionDetails>
//         <AccordionDetails>
//           New York, NY 11111
//         </AccordionDetails>
//       </Accordion>
//       <Accordion defaultExpanded>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3-content"
//           id="panel3-header"
//         >
//           Data Acknowledgment
//         </AccordionSummary>
//         <AccordionDetails>
//           I have read the following material and understand it.
//         </AccordionDetails>
//         <AccordionActions>
//           <Button>Cancel</Button>
//           <Button>Agree</Button>
//         </AccordionActions>
//       </Accordion>
//     </div>
//   )
  
// }


// /* Displays all other components in a grid */

// function MyGrid() {
//   return (


