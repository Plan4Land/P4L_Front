import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const List = styled.div`
  display: flex;
  width: 100%;
  margin: 20px;
  margin-bottom: 50px;
`;

export const SelectTourItem = styled.div`
  width: 450px;
  padding-top: 60px;
  left: 20px;
  position: relative;
  button {
    font-size: 12px;
    background-color: white;
    color: ${colors.colorA};
    height: 35px;
    width: 130px;
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
    position: absolute;
    top: 10px;
    right: 60px;

    &:hover {
      cursor: pointer;
      background-color: #f3f3f3;
      opacity: 0.7;
      color: gray;
    }
  }
  .toggle-button {
    font-size: 16px;
    cursor: pointer;
    background: transparent;
    border: none;
    color: ${colors.colorA}; /* 원하는 텍스트 색상 */
  }

  .toggle-button:hover {
    color: ${colors.colorB}; /* 호버 시 색상 변경 */
  }
`;

export const SearchSt = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;

  .search-wrapper {
    position: relative;
    flex-grow: 0.9;
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
    top: 5%;
    scale: 110%;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: ${colors.colorA};
    width: 20px;

    /* hover 시 아무 변화가 없도록 설정 */
    &:hover {
      background: transparent;
      color: ${colors.colorA};
      border: none;
      transform: none;
    }
  }

  /* button의 다른 hover 스타일을 덮어쓸 수 있도록 구체적으로 설정 */
  button.search-button:hover {
    background: transparent;
    color: ${colors.colorA};
    border: none;
    transform: none;
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;

  .tour-list {
    width: 90%;
  }
`;
