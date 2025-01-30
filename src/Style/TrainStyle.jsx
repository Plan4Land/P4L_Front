import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80vw;
  height: 100%;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 0 10px;
  .menu-box {
    display: flex;
    padding: 10px 0 10px 0;
    width: 100%;
    margin: auto;
    border-bottom: 1px solid #ddd;
    .menu-title {
      padding: 5px 0;
      min-width: 150px;
      border-right: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }
    .select-content {
      padding: 5px 0;
      flex-direction: row;
    }
  }
  .datepicker {
    display: flex;
    .datepicker-component {
      min-width: 250px;
      width: 35%;
      height: 80%;
    }
  }
  .search-button {
    width: 80%;
    margin: 10px auto;
    border: none;
    :disabled {
    }
  }
`;

// export const MenuTitle = styled.div`
//   min-width: 150px;
//   display: flex;
//   align-items: center;
//   border: 1px solid black;
//   margin-right: 20px;
// `;
export const VehicleKindContainer = styled.div`
  display: flex;
  width: 80%;
  .checkbox-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  label {
    display: flex;
    width: 100px;
    button {
      all: unset;
    }
  }
`;
export const SelectStationContainer = styled.div`
  display: flex;
`;

export const SelectStation = styled.div`
  width: 60%;
  .select-wrapper {
    display: flex;
    select {
      min-width: 150px;
      padding: 5px;
      font-size: 14px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: white;
      color: #333;
      cursor: pointer;
      transition: all 0.3s ease;
      height: 30px;
      margin-right: 20px;
      &:focus {
        outline: none;
        border-color: ${colors.colorA};
      }

      option {
        padding: 10px;
        background-color: white;
        color: #333;
      }
    }
  }
`;

export const ScheduleResult = styled.div`
  .result-table {
    margin: 20px auto;
    width: 80vw;
    border: 1px solid #ddd;
    border-radius: 8px;
    table {
      width: 100%;
      border-collapse: collapse;
    }
    thead {
      width: 80vw;
      background-color: #f3f4f6;
    }
    th,
    td {
      padding: 12px 16px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    th {
      font-weight: bold;
      color: #333;
    }
    td:nth-child(1) {
      font-weight: bold;
    }
    tbody tr:nth-child(even) {
      background-color: #f9fafb;
    }

    tbody tr:hover {
      background-color: #f1f5f9;
    }

    td {
      font-size: 14px;
      color: #555;
    }
  }
`;
