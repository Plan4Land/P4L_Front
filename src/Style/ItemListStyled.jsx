import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const List = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 50px;
  gap: 50px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const SelectTourItem = styled.div`
  width: 400px;
  padding-top: 40px;
  position: relative;
  h3 {
    margin-bottom: 0;
  }
  button {
    font-size: 12px;
    background-color: white;
    color: ${colors.colorA};
    height: 30px;
    width: 120px;
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
  .buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
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
    top: 110px;
    left: 40px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    .buttons {
      width: 80%;
      margin: auto;
    }
    button {
      font-size: 10px;
      width: 100px;
      height: 30px;
    }
    h3 {
      font-size: 18px;
      margin: 15px 0 5px 10px;
    }
  }
`;
export const FilterButton = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    text-align: center;
    width: 20px;
    padding: 10px 0 0 20px;
    background-color: transparent;
    color: gray;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
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
  flex-direction: column;
  align-items: center;
  height: 100%;

  .tour-list,
  .plannerList {
    padding: 0;
  }
  .selectMenu {
    width: 95%;
    display: flex;
    justify-content: space-between;
    button {
      height: 35px;
    }
  }
`;

export const SortSelect = styled.select`
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 150px;
  height: 30px;
  &:focus {
    outline: none;
    border-color: ${colors.colorA};
  }

  option {
    padding: 10px;
    background-color: white;
    color: #333;
  }
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
