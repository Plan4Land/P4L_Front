import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const MyPageMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 1000px;
  justify-content: center;
  margin: 20px 0 20px 0;
  margin-bottom: 150px;

  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: fixed;
    top: 20vh;
    left: 5vw;
    width: 150px;
    z-index: 1;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
  .MyPageMenu {
    margin-left: 20px;
    width: 60%;
  }
  @media (max-width: 768px) {
    .menu {
      width: 100px;
    }
  }
`;
export const UserMain = styled.div`
  margin: 50px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const UserInfo = styled.div`
  width: 90%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e7e7e7;
  border-radius: 20px;
  margin-bottom: 15px;

  .ProfileImg {
    height: 100px;
    width: 100px;
    min-width: 100px;
    border: 1px solid black;
    border-radius: 50%;
  }
  .follow {
    cursor: pointer;
  }
  .Button {
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .check-invitation {
      display: flex;
      position: relative;
      .invite-alarm {
        background-color: red;
        display: flex;
        position: absolute;
        left: -0.3rem;
        top: -0.3rem;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
  }
  .user {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 0 20px 0 20px;
  }
`;

export const UserPlanning = styled.div`
  height: 100%;
  width: 100%;
  .myPlanList {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pagebutton {
    display: flex;
    justify-content: center;
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
    width: 19rem;
    text-align: left;
    margin: 10px;
  }

  .label {
    margin: 0;
    margin-bottom: 5px;
    font-size: 17px;
    font-weight: bold;
  }

  .owner {
    margin: 0;
    font-size: 15px;
    span {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
