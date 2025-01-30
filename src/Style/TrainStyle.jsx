import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 1000px;
  height: 800px;
  margin: 20px auto;
  gap: 15px;

  .datepicker {
    display: flex;
    .datepicker-component {
      min-width: 250px;
      width: 35%;
      height: 80%;
    }
  }
  .search-button {
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    height: 100px;
  }
`;
export const MenuTitle = styled.div`
  min-width: 150px;
  background-color: aquamarine;
`;
export const VehicleKindContainer = styled.div`
  display: flex;
  width: 70%;
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

  /* .checkbox-name {
    border: none;
    background-color: transparent;
    font-size: 16px;
  } */
`;
export const SelectStationContainer = styled.div`
  display: flex;
`;

export const SelectStation = styled.div`
  width: 60%;
`;
