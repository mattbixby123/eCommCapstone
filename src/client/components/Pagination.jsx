// Pagination.js
// work in progress - pagination seems to be working but cannot get the react component to render and allow us to change pages.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useFetchAllBooksQuery,
  useFetchAllComicsQuery,
  useFetchAllMagazinesQuery,
} from '../redux/api'; // Adjust the import path as per your project structure

const Pagination = ({ dataType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const pageSize = 10; // Number of items per page

  // Choose the appropriate query hook based on dataType
  const fetchFunction = () => {
    switch (dataType) {
      case 'Books':
        return useFetchAllBooksQuery;
      case 'Comics':
        return useFetchAllComicsQuery;
      case 'Magazines':
        return useFetchAllMagazinesQuery;
      default:
        return null;
    }
  };

  const query = fetchFunction();
  const { data: fetchedData, error, isLoading } = query(currentPage);


  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData.data);
      setTotalPages(fetchedData.totalPages);
    }
  }, [fetchedData]);

  useEffect(() => {
    console.log('Fetched Data:', data);
  }, [data]); // Log fetched data whenever it changes

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Data</div>;

  return (
    <div>
      {/* Display the data */}
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Pagination controls */}
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
