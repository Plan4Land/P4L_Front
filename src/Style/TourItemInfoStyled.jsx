import styled from "styled-components";
import { colors } from "./GlobalStyle";
import { ScrollBar } from "../Component/ButtonComponent";

export const TourItemInfoBox = styled.div`
  width: 60%;
  margin: auto;
  padding: 20px;

  .tour-title {
    width: 90%;
    border-bottom: 2px solid #ddd;
  }

  .tour-title,
  .info-item {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 15px;
    strong {
      margin-right: 5px;
    }
  }
  .tour-image {
    width: 100%;
    height: 450px;
    margin: auto;
    border-radius: 10px;
    object-fit: cover;
  }
  .tour-details {
    padding: 30px;
    position: relative;
    .bookmark {
      color: ${colors.colorA};
      font-size: 2em;
      position: absolute;
      top: 58px;
      right: 10px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .bookmark:hover {
      opacity: 0.7;
    }
    h3 {
      margin-bottom: 10px;
      margin-top: 0;
      color: ${colors.colorA};
    }
  }
  .item-map {
    display: flex;
    margin: 20px auto;
    width: 100%;
    height: 500px;
    gap: 10px;
    @media (max-width: 768px) {
      flex-direction: column;
      height: 800px;
    }
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const NearTravelList = styled.div`
  width: 70%;
  h3 {
    margin: 3px 0 8px 0;
  }
  .nearby-travelspot {
    width: 95%;
    height: 90%;
    padding: 5px 15px 5px 15px;
    overflow-y: scroll;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    ${ScrollBar}
    .nearbyspot {
      text-decoration: none;
      color: black;
      h4 {
        color: ${colors.colorA};
      }
    }
    .nearbyspot:visited,
    .nearbyspot:hover,
    .nearbyspot:active {
      color: inherit;
    }
  }
  .nearbybox {
    border-bottom: 1px solid #ddd;
    h4,
    p {
      margin: 10px 0;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    p {
      margin-bottom: 10px;
    }
  }
  @media (max-width: 768px) {
    height: 50%;
    width: 100%;
  }
`;
