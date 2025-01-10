import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const TourItemInfoBox = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  .tour-image {
    width: 500px;
    height: auto;
    border-radius: 10px;
  }
  .item-map {
    width: 500px;
    border: 1px solid black;
  }

  .tour-details {
    grid-column: span 2;
  }
`;
