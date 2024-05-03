// Pagination.js
// work in progress - pagination seems to be working but cannot get the react component to render and allow us to change pages.
import { useState, useEffect } from 'react';



const Pagination = ({ dataType }) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    dataType(totalPages, page)
      .then(({ data }) => {
        setResults(data.results);
        setTotalPages(data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [page]);
  
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return { results, totalPages, handleNextPage, handlePrevPage }
};

export default Pagination;
