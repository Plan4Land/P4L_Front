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

  .tour-title {
    margin-bottom: 15px;
    display: table;
    strong {
      margin-right: 5px;
    }
  }
  .tourThumb {
    width: 80%;
    text-align: center;
    margin: auto;
    .tour-image {
      margin: auto;
      width: 100%;
      height: 40vh;
      border-radius: 10px;
      object-fit: cover;
    }
    .swiper-button-next,
    .swiper-button-prev {
      color: white !important;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    }

    .swiper-button-next:after,
    .swiper-button-prev:after {
      font-size: 24px;
      font-weight: bold;
    }

    .swiper-pagination-bullet-active {
      background-color: ${colors.colorB};
    }
  }
  h2 {
    margin: 30px 4% 15px;
    padding-bottom: 4px;
    border-bottom: 1.8px solid #ddd;
    display: inline-block;
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
  width: 60%;
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
export const SpotInformation = styled.div`
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  height: 300px;
  width: 80%;
  overflow: hidden;
  .tabs {
    justify-items: center;
    align-items: center;
    display: flex;
    height: 50px;
    border-bottom: 1px solid #ddd;
    width: 100%;
    button {
      font-weight: bold;
      cursor: pointer;
      border: none;
      background-color: transparent;
      height: 30px;
      margin: auto;
      width: 30%;
      transition: all 0.2s ease;
      &:hover {
        opacity: 0.7;
      }
    }
    button.active {
      background-color: ${colors.colorC};
    }
  }
  .informationDetail {
    width: 90%;
    margin: 10px auto;
  }
  .info-item {
    display: flex;
    margin: 20px auto;
  }
  .info-detail,
  .info-description {
    margin: 10px auto;
    line-height: 1.5;
    height: 75%;
    overflow-y: scroll;
    ${ScrollBar}
    .info-name {
      font-weight: bold;
      width: 100px;
      display: inline-block;
      color: ${colors.colorA};
    }
    .info-content {
      display: table-cell;
    }
  }
`;
