import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const SelectTourItem = styled.div`
  width: 500px;
  padding-left: 20px;
  button {
    font-size: 12px;
    background-color: white;
    color: ${colors.colorA};
    height: 35px;
    width: 140px;
    margin: 4px;
    &:hover {
      background-color: ${colors.colorB};
      color: white;
    }
    &.selected {
      background-color: ${colors.colorB};
      color: white;
    }
  }
  .reset-button {
    width: 80px;
    height: 20px;
    font-size: 10px;
    padding: 0;
    background-color: #f3f3f3;
    border: none;
    border-radius: 50px;
    color: gray;

    &:hover {
      cursor: pointer;
      background-color: #f3f3f3;
      opacity: 0.7;
      color: gray;
    }
  }
`;

export const SearchSt = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;

  .search-wrapper {
    position: relative;
    flex-grow: 0.8;
    display: flex;
    align-items: center;
  }

  .search {
    font-size: 14px;
    height: 40px;
    border-radius: 50px;
    border: 2.5px solid ${colors.colorA};
    padding-left: 20px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }

  .search-button {
    position: absolute;
    right: -50px;
    top: 5%;
    scale: 110%;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: ${colors.colorA};
  }
`;
