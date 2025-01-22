import styled from "styled-components";
import { colors } from "./GlobalStyle";
import { ScrollBar } from "../Component/ButtonComponent";

export const MainBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr); // 2행
  row-gap: 20px;
  margin: 40px auto 50px auto;
  height: 1000px;
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
  grid-column: span 2;
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
      margin: 0 20px 20px;
      transition: all 0.3s ease;
      font-size: 16px;
      color: ${colors.colorA};
      &:hover {
        opacity: 0.7;
      }
      &.active {
        background-color: ${colors.colorC};
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
      flex-direction: column;

      a {
        width: 100%;
      }
      button {
        background-color: white;
        color: ${colors.colorA};
        height: 40px;
        width: 30%;
        margin: 5px;
        transition: all 0.3s ease;
        &:hover {
          background-color: ${colors.colorB};
          color: white;
          transform: translateY(-2px);
        }
      }
    }

    .SelectCategory {
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      width: 100%;
      .catebuttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        width: 100%;
        height: 100%;
        padding: 20px;
        justify-content: space-around;
      }
    }
  }
  @media (max-width: 768px) {
    button {
      font-size: 12px;
      padding: 5px;
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
        return "url(/img/cateimg/cate_tour.png)";
      case "200":
        return "url(/img/cateimg/cate_lodgin.png)";
      case "300":
        return "url(/img/cateimg/cate_restaurant.png)";
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
  grid-column: span 2;
  height: 500px;

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
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 0;
    color: ${colors.colorA};
  }
`;
export const PlanBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;

  .planitem {
    border: 1px solid black;
    border-radius: 20px;
    margin: 10px;
    overflow: hidden;
    cursor: pointer;
    img {
      min-height: 75%;
    }
  }
  @media (max-width: 768px) {
    height: 300px;
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
    height: 400px;
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
  width: 88%;
  height: 180px;
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
`;
