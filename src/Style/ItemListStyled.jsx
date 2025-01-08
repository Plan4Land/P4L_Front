import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const SelectTourItem = styled.div`
  width: 500px;
  button {
    /* 선택된 버튼 스타일 */
    &.selected {
      opacity: 0.7;
      color: white;
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
    flex-grow: 1;
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
    right: 15px;
    top: 23%;
    scale: 110%;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: ${colors.colorA};
  }
`;
