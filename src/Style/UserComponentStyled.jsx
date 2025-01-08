import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const UserMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  p {
    margin: 10px 0;
    cursor: pointer;
    font-size: 16px;
    color: #555;
    transition: all 0.3s ease;

    &.selected {
      color: ${colors.colorA}; /* 선택된 상태의 색상 */
      font-weight: bold;
    }

    &:hover {
      opacity: 0.7;
    }
  }
`;
