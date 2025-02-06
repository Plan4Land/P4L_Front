import styled from "styled-components";
import { colors } from "./GlobalStyle";
import { ScrollBar } from "../Component/ButtonComponent";

export const TourItemInfoBox = styled.div`
  width: 60%;
  margin: auto;
  padding: 20px;
  .tour-title {
    width: 100%;
    border-bottom: 2px solid #ddd;
    margin-bottom: 2px;
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
      top: 55px;
      right: 50px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .bookmark:hover {
      opacity: 0.7;
    }
    h3 {
      margin-bottom: 2px;
      margin-top: 0;
      color: ${colors.colorA};
    }
    p {
      color: gray;
      margin-top: 2px;
    }
  }
  .item-map {
    display: flex;
    margin: 20px auto;
    width: 100%;
    height: 500px;
    gap: 10px;

    @media (max-width: 1024px) {
      flex-direction: column;
      height: 800px;
    }
  }
  @media (max-width: 1024px) {
    width: 90%;
    .tourThumb {
      width: 100%;
    }
    .tour-title {
      font-size: 20px;
    }
    .tour-details {
      .bookmark {
        font-size: 1.5em;
        top: 40px;
        right: 40px;
      }
      p {
        font-size: 11px;
      }
    }
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
  @media (max-width: 1024px) {
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
      color: black;
      font-weight: bold;
      cursor: pointer;
      border: none;
      border-radius: 10px;
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
      color: white;
      background-color: ${colors.colorC};
    }
  }
  .informationDetail {
    width: 90%;
    margin: 10px auto;
  }
  .info-item {
    display: flex;
    margin: auto;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    align-items: center;
    .info-name {
      font-weight: bold;
      width: 100px;
      display: inline-block;
      color: ${colors.colorA};
      white-space: nowrap;
    }
    .info-content {
      white-space: normal;
      word-break: break-word;
    }
  }
  .info-detail,
  .info-description {
    margin: 10px auto;
    line-height: 1.5;
    height: 75%;
    overflow-y: scroll;
    ${ScrollBar}
  }
  @media (max-width: 1024px) {
    width: 100%;
    .info-content {
      font-size: 13px;
    }
    .tabs {
      height: 30px;
      button {
        height: 20px;
      }
    }
    .informationDetail {
      margin: 5px auto;
      .info-name {
        font-size: 15px;
      }
    }
  }
`;
