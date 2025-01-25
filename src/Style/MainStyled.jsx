import styled from "styled-components";
import { colors } from "./GlobalStyle";
import { ScrollBar } from "../Component/ButtonComponent";
import searchCate1 from "../Img/cateimg/cate_tour.png"
import searchCate2 from "../Img/cateimg/cate_lodgin.png"
import searchCate3 from "../Img/cateimg/cate_restaurant.png"

export const MainBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 20px;
  margin: 40px auto 50px auto;
  height: 100%;
  width: 80%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    height: 100%;
  }
`;

export const GridItem = styled.div`
  display: flex;
  height: 100%;
`;
//         {/* 미니 검색창!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
export const QuickSearch = styled(GridItem)`
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  .QuickSelect {
    display: flex;
    padding: 10px;
    border-radius: 8px;
    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      width: 100%;
      height: 30px;
      margin: 0 20px;
      transition: all 0.3s ease;
      font-size: 16px;
      border-radius: 10px;
      color: ${colors.colorA};
      &:hover {
        opacity: 0.7;
      }
      &.active {
        background-color: ${colors.colorC};
        /* color: white; */
        color: black;
      }
    }
  }

  .SearchBox {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;

    .RegionSearch {
      width: 100%;
      .buttons {
        display: grid;
        height: 80%;
        grid-template-columns: repeat(5, 1fr);
      }
      a {
        margin: 10px;
        display: flex;
        text-decoration: none;
        justify-content: center;
        align-items: center;
      }
      button {
        background-color: white;
        color: ${colors.colorA};
        border: none;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        height: 100%;
        width: 100%;
        border-radius: 10px;
        transition: all 0.3s ease;
        font-size: 18px;
        &:hover {
          background-color: ${colors.colorB};
          color: white;
          transform: translateY(-2px);
        }
      }
      @media (max-width: 1024px) {
        .buttons {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      @media (max-width: 768px) {
        .buttons {
          grid-template-columns: repeat(3, 1fr);
        }
        a {
          margin: 5px;
        }
        button {
          font-size: 14px;
          padding: 0;
        }
      }
    }

    .SelectCategory {
      display: flex;
      text-align: center;
      width: 100%;
      .catebuttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        width: 100%;
        height: 100%;
        @media (max-width: 768px) {
          height: 80%;
        }
      }
    }
  }
`;

export const CateButton = styled.button`
  width: 90%;
  position: relative;
  height: 100%;
  background-size: cover;
  background-position: center;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  overflow: hidden;
  background-image: ${({ type }) => {
    switch (type) {
      case "100":
        return `url(${searchCate1})`;
      case "200":
        return `url(${searchCate2})`;
      case "300":
        return `url(${searchCate3})`;
      default:
        return "url(/img/cateimg/cate_tour.png)";
    }
  }};

  /* hover 시 배경 어두워지기 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); /* 기본값은 투명 */
    transition: background-color 0.5s ease; /* 어두워지는 효과 */
    z-index: 1; /* 텍스트보다 아래 */
  }

  /* hover 시 배경 어두워지기 */
  &:hover::before {
    background-color: rgba(0, 0, 0, 0.3); /* 어두운 레이어 */
  }

  /* 텍스트가 서서히 나타나도록 설정 */
  &::after {
    content: ${({ typeName }) => `"${typeName}"`};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 25px;
    opacity: 0; /* 기본값은 숨김 */
    z-index: 2; /* 어두운 레이어 위 */
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1; /* hover 시 텍스트 표시 */
  }
`;

//         {/* 상위 관광지 n개 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
export const RecommItem = styled(GridItem)`
  grid-column: span 3;
  height: 500px;
  margin-right: 20px;

  .topTourItem {
    overflow: hidden;
    text-align: center;
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .topTourItem img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    transition: transform 0.3s ease;
  }

  .topTourItem h3,
  .topTourItem p {
    position: absolute;
    z-index: 10;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 10px;
    transition: opacity 0.5s ease;
    opacity: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  }

  .topTourItem h3 {
    bottom: 50px;
    right: 10px;
    font-size: 30px;
    transition: bottom 1.5s ease, opacity 1.5s ease;
  }

  .topTourItem p {
    bottom: 20px;
    right: 10px;
    font-size: 18px;
    transition: bottom 3s ease, opacity 3s ease;
  }

  /* 슬라이드가 변경될 때 글자가 나타나는 애니메이션 */
  .swiper-slide-active .topTourItem h3,
  .swiper-slide-active .topTourItem p {
    opacity: 1;
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
  @media (max-width: 768px) {
    height: 350px;
  }
`;

//         {/* 상위 플래닝 3개!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
export const RecommPlan = styled(GridItem)`
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;
export const PlanBox = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  .recomplanner {
    width: 80%;
    display: flex;
    position: relative;
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    /* margin-top: 0; */
    .recomplanner {
      width: 100%;
    }
  }
  .planitem {
    height: 95%;
    margin: 10px;
    overflow: hidden;
    display: flex;
    cursor: pointer;
  }
  img {
    min-width: 50%;
    max-width: 50%;
    min-height: 90%;
    object-fit: cover;
    transform: translateX(-100%);
    opacity: 0;
    animation: slideInImage 1.5s forwards;
    @media (max-width: 768px) {
      min-width: 100%;
      max-width: 100%;
    }
  }
  // 플래너 정보
  .planExplain {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0 0 30px 20px;
    opacity: 0;
    transform: translateX(100%);
    animation: slideInText 1.5s forwards;
    animation-delay: 0.5s;
    h3 {
      font-size: 50px;
      margin: 0 0 0 10px;
      color: ${colors.colorD};
      text-shadow: 3px 3px 2px rgba(0, 0, 0, 1);
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    p {
      margin: 10px 0 0 20px;
      font-size: 20px;
      color: white;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
    }
    @media (max-width: 768px) {
      h3 {
        font-size: 40px;
      }
      p {
        font-size: 15px;
      }
      position: absolute;
      bottom: 5px;
      left: 0;
    }
  }
  // 플래너 소유자
  .owner {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    top: 0;
    left: 0;
    img {
      min-width: 50px;
      max-width: 50px;
      max-height: 50px;
      min-height: 50px;
      background-color: white;
      border-radius: 50%;
    }
    span {
      margin-left: 5px;
      white-space: nowrap;
      color: white;
      text-shadow: 3px 3px 2px rgba(0, 0, 0, 1);
    }
  }
  // 애니메이션 효과, 슬라이드 스타일
  @keyframes slideInImage {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInText {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
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
`;

//         {/* 미니 캘린더!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
export const Festive = styled(GridItem)`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  @media (max-width: 768px) {
    grid-column: span 2;
  }

  .react-calendar {
    width: 100%;
    height: 360px;
    border-radius: 10px;
    border: 1px solid #ddd;
  }

  .react-calendar__tile {
    position: relative;
    height: 45px;
    padding: 0;
    border-radius: 10px;
  }

  .react-calendar__tile--now {
    background: ${colors.colorD} !important;
  }

  .red-dot {
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    bottom: 8px;
    left: 47%;
  }

  .react-calendar__month-view__days__day {
    background-color: transparent;
    color: #333;
  }

  .react-calendar__month-view__weekdays__weekday--sunday {
    color: red;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday--saturday {
    color: blue;
    font-weight: bold;
  }

  .react-calendar__tile--inactive {
    color: #d3d3d3;
    pointer-events: none;
    background-color: transparent !important;
  }
`;

export const HolidayList = styled.div`
  margin: 10px;
  width: 80%;
  height: 120px;
  overflow-y: auto;
  border: 1px solid #ddd;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 0 15px 0 15px;
  ${ScrollBar}
  ul {
    padding-left: 10px;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
  }
  @media (max-width: 768px) {
    width: 93%;
  }
`;
