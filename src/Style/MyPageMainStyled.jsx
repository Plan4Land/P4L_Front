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
export const UserMain = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const UserInfo = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  gap: 20px;
  .ProfileImg {
    height: 100px;
    width: 100px;
    border: 1px solid black;
    border-radius: 50%;
  }
  .follow {
    cursor: pointer;
  }
`;
export const UserPlanning = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
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
export const InvitePlanning = styled.div`
  .invited-planning-list {
    margin-top: 20px;
    width: 500px;
  }

  .invited-planning-item {
    margin-bottom: 15px;
    padding: 15px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
  }

  .planning-details {
    margin: 10px;
  }

  .label {
    font-weight: bold;
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
