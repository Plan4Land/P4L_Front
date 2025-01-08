import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const MyPageMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  margin: 20px 0 20px 0;
  .menu {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .MyPageMenu {
    width: 80%;
    border: 1px solid black;
  }
`;
export const UserInfo = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .ProfileImg {
    height: 300px;
    width: 300px;
    border: 1px solid black;
    border-radius: 50%;
  }
  .UserExplain {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .UserDetail {
    margin-bottom: 10px;
  }
  .UserDetail:last-child {
    cursor: pointer;
  }

  .label {
    font-weight: bold;
    margin-right: 5px;
  }

  .value {
    color: #333;
  }
`;

export const FollowList = styled.div`
  width: 500px;
  height: 300px;
  overflow-y: scroll;
  .tabs {
    display: flex;
    justify-content: space-between;
    margin: 10px 100px;
    button {
      background-color: white;
      border: none;
      color: ${colors.colorA};
      cursor: pointer;
      margin-bottom: 20px;
      transition: all 0.3s ease;
      &:hover {
        background-color: ${colors.colorC};
      }
      &.active {
        background-color: ${colors.colorC};
      }
    }
  }
`;
