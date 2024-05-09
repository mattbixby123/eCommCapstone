import React, { useEffect, useState } from "react";
import { useFetchAllCustomerDataQuery } from "../redux/api";

function AdminView() {
  const { data: customers = [], error, isLoading } = useFetchAllCustomerDataQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(9);

  // Handle delete customer
  // const handleDeleteCustomer = (customerId) => {
  //   // Your delete logic here
  // };

  // Handle toggle isAdmin status
  // const handleToggleAdmin = (customerId) => {
  //   // Your toggle admin logic here
  // };

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <span>{customer.name}</span>
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
