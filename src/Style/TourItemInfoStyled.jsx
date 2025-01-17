import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const TourItemInfoBox = styled.div`
  width: 80%;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  .tour-image {
    width: 600px;
    height: 450px;
    margin: auto;
    border-radius: 10px;
  }
  .tour-details {
    padding: 30px;
    position: relative;
    .bookmark {
      color: ${colors.colorA};
      font-size: 2em;
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .bookmark:hover {
      opacity: 0.7;
    }
  }
  .item-map {
    margin: 20px auto;
    grid-column: span 2;
    width: 100%;
    height: 500px;
    border: 1px solid black;
  }
  @media (max-width: 768px) {
  }
`;
