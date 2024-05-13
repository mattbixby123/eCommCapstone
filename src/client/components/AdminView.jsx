import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchAllCustomerDataQuery } from "../redux/api";
import Pagination from "@mui/material/Pagination";

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

  return (
    <div>
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
            <div key={customer.id}>
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
    </div>
  );
}

export default AdminView;
