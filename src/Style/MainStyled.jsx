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

export const QuickSearch = styled(GridItem)`
  grid-column: span 2;
`;
export const RecommItem = styled(GridItem)`
  grid-column: span 2;
`;
export const RecommPlan = styled(GridItem)`
  grid-column: span 3;
`;
export const Festive = styled(GridItem)`
  grid-column: span 1;
`;
