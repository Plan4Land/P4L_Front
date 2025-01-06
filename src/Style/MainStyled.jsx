import styled from "styled-components";

export const MainBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr); // 2행
  gap: 20px; // 상자 간 간격
  margin: 20px;
  height: 1000px;
`;

export const GridItem = styled.div`
  display: flex;
  border: 1px solid black;
  height: 100%;
`;
//         {/* 미니 검색창!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
export const QuickSearch = styled(GridItem)`
  grid-column: span 2;
  display: flex;
  flex-direction: column;

  .QuickSelect {
    display: flex;
    justify-content: space-around;

    padding: 10px;
    border-radius: 8px;

    button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      width: 100%;
      margin: 0 20px;
      transition: all 0.3s ease;
      font-size: 16px;
      color: #17520b;
      &:hover {
        opacity: 0.7;
      }
      &:active {
        opacity: 0.7;
      }
    }
  }

  .SearchBox {
    display: flex;
    flex-direction: column;
    height: 100%;

    .RegionSearch {
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        flex: 1;
        padding: 8px;
        margin-right: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #45a049;
        }

        &:active {
          background-color: #3e8e41;
        }
      }
    }

    .SelectTheme {
      display: flex;
      text-align: center;
      height: 100%;
      .Theme {
        margin: 10px;
        border: 1px solid black;
        width: 100%;
      }
    }
  }
`;

//         {/* 상위 관광지 n개 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
export const RecommItem = styled(GridItem)`
  grid-column: span 2;
`;
//         {/* 상위 플래닝 3개!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
export const RecommPlan = styled(GridItem)`
  grid-column: span 3;
`;
export const PlanBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;

  .item {
    border: 1px solid black;
    margin: 10px;
  }
`;
//         {/* 축제 미니 캘린더!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
export const Festive = styled(GridItem)`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  .react-calendar {
    width: 100%;
    height: 400px;
  }

  .react-calendar__tile {
    position: relative;
    height: 50px;
    aspect-ratio: 1;
    padding: 0;
  }

  .react-calendar__tile--now {
    position: relative;
    background: #fff6c0 !important;
    border-radius: 20% !important;
    padding: 0;
  }
  .red-dot {
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    bottom: 5px;
    left: 45%;
  }
  .react-calendar__month-view__days__day {
    color: black;
  }
  .react-calendar-sunday {
    color: red; /* 일요일 빨간색 */
  }

  .react-calendar-saturday {
    color: blue; /* 토요일 파란색 */
  }

  .react-calendar__tile {
    background-color: transparent;
  }
  .react-calendar__tile--inactive {
    color: #d3d3d3; /* 흐릿한 색상 */
    pointer-events: none; /* 클릭 불가능 */
  }
`;

export const HolidayList = styled.div`
  margin: 10px;
  width: 100%;
  height: 150px;
  overflow-y: auto;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 5px;
  ul {
    margin: 0;
    padding-left: 25px;
  }

  li {
    padding: 3px 0;
    font-size: 14px;
  }
`;
