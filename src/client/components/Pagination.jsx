// Pagination.js
// work in progress - pagination seems to be working but cannot get the react component to render and allow us to change pages.
import { useState, useEffect } from 'react';
import axios from 'axios';



const Pagination = (endpoint, page) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [results, setResults] = useState([]);

  const fetchResults = async (endpoint, page) => {
    try {
      const response = await axios.get(`api/product/${endpoint}?page=${page}&pageSize=10`);
      const { results, totalPages } = response.data;
      setResults(results);
      setTotalPages(totalPages);
    } catch (error) {
       console.log(error);
    }
  };
  
  useEffect(() => {
    fetchResults('comics', currentPage); // For comics
  }, [currentPage]);
  
  useEffect(() => {
    fetchResults('books', currentPage); // For books
  }, [currentPage]);
  
  useEffect(() => {
    fetchResults('magazines', currentPage); // For magazines
  }, [currentPage]);
  
  
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


  return (
    <div>
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
