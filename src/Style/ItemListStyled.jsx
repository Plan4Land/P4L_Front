import styled from "styled-components";

export const SelectTourItem = styled.div`
  width: 500px;
  button {
    /* 선택된 버튼 스타일 */
    &.selected {
      opacity: 0.7;
      color: white;
    }
  }
`;
