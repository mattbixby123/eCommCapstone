import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchAllCustomerDataQuery } from "../redux/api";
import Pagination from "@mui/material/Pagination";
import { Paper, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

/* The followin allowed for collapsing sidebar */
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';


/* The following allowed for the chart */
import { BarChart } from '@mui/x-charts/BarChart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { lightBlue } from "@mui/material/colors";

function AdminView() {
  const { data: customers, error, isLoading } = useFetchAllCustomerDataQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(9);
  const token = useSelector(state => state.auth.token); // Using useSelector to access the token
  
  // Handle delete customer
  // const handleDeleteCustomer = (customerId) => {
  //   // Your delete logic here
  // };

  // Handle toggle isAdmin status
  // const handleToggleAdmin = (customerId) => {
  //   // Your toggle admin logic here
  // };

  // Filter customers based on search query
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

  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  margin: 10
}));

  return (
  <>
    <Box sx={{ flexGrow: 10}}>
      <Grid container spacing={2}>
        <Grid item xl={4}>
          <Item>
            <input
              type="text"
              placeholder="Search customers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
              {isLoading ? (
                <div>Loading...</div>
                ) : error ? (
                <div>Error: {error.message}</div>
                ) : (
                <>
                  {currentCustomers.map((customer) => (
                    <div className='toggle-list'key={customer.id}>
                      <span>{customer.username}</span>
                      <button onClick={() => handleDeleteCustomer(customer.id)}>
                        Delete
                      </button>
                      <button onClick={() => handleToggleAdmin(customer.id)}>
                        Toggle Admin
                      </button>
                    </div>
                  ))}
                  {/* Pagination */}
                  {filteredCustomers.length > customersPerPage && (
                    <Pagination
                      count={Math.ceil(filteredCustomers.length / customersPerPage)}
                      color="primary"
                      onChange={handlePageChange}
                      page={currentPage}
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
              '& ul': { padding: 1 },
              }}
              subheader={<li />}
              >
              {currentCustomers.map((customer) => (
                <li key={`section-${customer.id}`}>
                  <ul className="user-list">
                    <ListSubheader>{`${customer.firstName} ${customer.lastName}`}</ListSubheader>
                      <ListItem key={`customer-${customer.id}`}>
                        <ListItemText secondary={`Username: ${customer.username}`}/>
                        <ListItemText secondary={`Email: ${customer.email}`}/>
                      </ListItem>
                    <ListSubheader>Address</ListSubheader>
                      <ListItem>
                        <ListItemText secondary={`${customer.addressLine1}, ${customer.addressLine2}, ${customer.city}, ${customer.state} ${customer.postalCode}`}/>
                      </ListItem>                       
                  </ul>
                </li>
              ))}
            </List>
          </Item>
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xl={4}>
          
        </Grid>
      </Grid>
    </Box>
  </>
  )  
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


