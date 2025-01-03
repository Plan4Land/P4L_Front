import styled from "styled-components";

export const UserMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  p {
    margin: 10px 0;
    cursor: pointer;
    font-size: 16px;
    color: #555;
    transition: color 0.3s, font-weight 0.3s;

    &.selected {
      color: #007bff; /* 선택된 상태의 색상 */
      font-weight: bold;
    }

    &:hover {
      color: #0056b3; /* 호버 상태의 색상 */
    }
  }
`;
