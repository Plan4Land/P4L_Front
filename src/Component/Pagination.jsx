import React from "react";
import {Button} from "./ButtonComponent";


export const Pagination = ({currentPage, totalPages, handlePageChange}) => {
  const pageNumbers = []

  const firstPage = Math.max(currentPage - 2, 1);
  const lastPage = Math.min(currentPage + 5, totalPages);

  for (let i = firstPage; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 0 &&
        (<Button onClick={() => handlePageChange(0)}>맨 처음</Button>)}
      {currentPage > 0 &&
        ( <Button onClick={() => handlePageChange(currentPage - 1)}>
          ◀
        </Button>)}
      {pageNumbers.map((number) => (
        <Button key={number} onClick={() => handlePageChange(number - 1)}
              className={currentPage === number - 1 ? "active" : ""}>
          {number}
        </Button>))}
      {currentPage < totalPages - 1 && (
      <Button onClick={() => handlePageChange(currentPage + 1)}>
        ▶
      </Button>)}
      {currentPage < totalPages - 1 && (
      <Button onClick={() => handlePageChange(totalPages - 1)}>
        맨 끝
      </Button>)}
    </div>
  );
}