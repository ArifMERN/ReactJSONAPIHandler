import React, { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../ContextApi/ContextApi";

const Pagination = () => {
  const { currentPage, totalPages, dispatch } = useContext(DataContext);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  let postionOfEnd = Math.round(pageNumbers.length / 10);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(postionOfEnd || 10);
  const onPageChange = (pageNumber) => {
    dispatch({ type: "PAGE_CHANGE", payload: pageNumber });
    // Perform data fetching or any other action based on the new page number
  };
  const handleNext = () => {
    if (pageNumbers.length - end > postionOfEnd) {
      setStart((prev) => prev + postionOfEnd);

      setEnd((prev) => prev + postionOfEnd);
    } else {
      setStart(end);

      setEnd((prev) => prev + pageNumbers.length - end);
    }
  };
  const handlePrevious = () => {
    // need to edit this one
    if (pageNumbers.length - end > postionOfEnd) {
      setStart((prev) => prev - postionOfEnd);

      setEnd((prev) => prev - postionOfEnd);
    } else {
      setStart(end);

      setEnd((prev) => prev - pageNumbers.length - end);
    }
  };

  return (
    <footer>
      <div className="pagination">
        {start !== 0 && <button onClick={handlePrevious}>Prev</button>}
        {pageNumbers.slice(start, end).map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {end !== pageNumbers.length && (
          <button onClick={handleNext}>Next</button>
        )}
      </div>
    </footer>
  );
};

export default Pagination;
