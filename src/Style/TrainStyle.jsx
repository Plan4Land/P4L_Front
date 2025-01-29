import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 1000px;
  height: 800px;
  margin: 20px auto;
  z-index: 1;

  .datepicker {
    margin: 15px auto;
    width: 60%;
  }
  .search-button {
    height: 40px;
    width: 600px;
    margin: 15px auto 15px;
  }
`;
export const SelectStationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 100%;
  height: 100px;
  background-color: white;
  z-index: 2;
`;

export const SelectStation = styled.div`
  width: 30%;
  height: 100%;

  .input-box {
    width: 100%;
    height: 100%;
    background-color: white;
    font-size: 17px;
  }
  .select-area-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 8.5%;
    background-color: white;
    border: 1px solid black;
    width: 900px;
    padding: 20px;
    box-sizing: border-box;

    .select-area,
    .select-station {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
    }
    button {
      width: 90px;
      height: 30px;
      margin: 2px 6px;
      white-space: nowrap;
    }
    hr {
      margin: 5px 0;
    }
  }
`;

export const VehicleKindContainer = styled.div`
  display: flex;
  margin: 0 auto;
`;
