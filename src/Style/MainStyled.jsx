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
    background-color: beige;
    padding: 10px;
    border-radius: 8px;

    button {
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.3s ease;
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
  align-items: center;
  justify-content: center;
`;
