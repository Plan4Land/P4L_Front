import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const List = styled.div`
  display: flex;
  width: 100%;
  margin: 20px;
  margin-bottom: 50px;
`;

export const Table = styled.table`
  width: 90vh;
  border-collapse: collapse;
  text-align: center;

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`;

export const TrafficBox = styled.div`
  display: flex;
  width: 100%;
  margin: 20px;
  margin-bottom: 50px;
`;

export const SelectTourItem = styled.div`
  width: 450px;
  padding-top: 40px;
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
    right: 30px;

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
    color: ${colors.colorA};
  }

  .toggle-button:hover {
    color: ${colors.colorB};
  }
  /* SelectTourItem 기본 상태 숨기기 (모바일 화면) */
  @media (max-width: 768px) {
    display: none; /* 기본적으로 숨기기 */
    &.open {
      display: block; /* .open 클래스가 추가되면 보이게 설정 */
    }
    position: absolute;
    z-index: 10;
    background-color: white;
    top: 100px;
    button {
      font-size: 10px;
      width: 80px;
      height: 30px;
      padding: 0;
    }
    h3 {
      font-size: 18px;
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

    &:hover {
      background: transparent;
      color: ${colors.colorA};
      border: none;
      transform: none;
    }
  }

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

  .tour-list,
  .plannerList {
    width: 90%;
  }
`;
