import React from "react";
import styled from "styled-components";
import { colors } from "../Style/GlobalStyle";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    padding: 8px 16px;
    margin: 0 5px;
    font-size: 14px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
  }

  button:hover {
    font-weight: bold;
    color: ${colors.colorA};
  }

  button.active {
    font-weight: bold;
    text-decoration: underline;
    color: ${colors.colorA};
  }

  button:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }
`;

// 페이지네이션 컴포넌트
export const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = [];

  const firstPage = currentPage - 1;
  const lastPage = Math.min(currentPage + 3, totalPages);

  for (let i = firstPage; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {currentPage > 0 && (
        <button onClick={() => handlePageChange(0)}>&lt; &lt;</button>
      )}
      {currentPage > 0 && (
        <button onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handlePageChange(number - 1)}
          className={currentPage === number - 1 ? "active" : ""}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages - 1 && (
        <button onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
      )}
      {currentPage < totalPages - 1 && (
        <button onClick={() => handlePageChange(totalPages - 1)}>
          &gt; &gt;
        </button>
      )}
    </PaginationContainer>
  );
};
