import styled from "styled-components";
import { colors } from "./GlobalStyle";
import { ScrollBar } from "../Component/ButtonComponent";

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
    top: 15vh;
    left: 5vw;
    width: 150px;
    z-index: 1;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
  .MyPageMenu {
    margin-left: 20px;
  }
  @media (max-width: 768px) {
    margin-top: -30px;
    .menu {
      position: absolute;
      visibility: hidden;
      opacity: 0;
      transform: translateX(-100%);
      transition: all 0.3s ease;
      top: 100px;
      &.open {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        p {
          font-size: 13px;
          margin-bottom: 3px;
        }
      }
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
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: ${colors.colorD}; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin-bottom: 15px;
  background-color: ${({ isInactive }) => (isInactive ? "#bbbbbb" : "white")};
  color: ${({ isInactive }) => (isInactive ? "#910505" : "inherit")};
  .inactiveUser {
    font-weight: bold;
    margin-right: 30px;
  }
  .ProfileImg {
    height: 100px;
    width: 100px;
    min-width: 100px;
    object-fit: cover;
    border-radius: 50%;
    background-color: white;
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
  @media (max-width: 768px) {
    flex-direction: column;
    /* width: 80vw; */
    height: 15vh;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    p {
      margin: 8px 0 0 0;
    }
    .ProfileImg {
      scale: 0.7;
    }
    .Button {
      margin: -10px 0 10px 0;
      flex-direction: row;
      scale: 0.6;
    }
  }
`;

export const UserPlanning = styled.div`
  height: 100%;
  width: 100%;

  .myPlanList {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .itemBox {
      border-bottom: 1px solid #ddd;
    }
  }
  .pagebutton {
    display: flex;
    justify-content: center;
  }
`;

export const FollowList = styled.div`
  width: 500px;
  height: 300px;

  .tabs {
    display: flex;
    justify-content: space-between;
    margin: 5px 100px;
    align-items: center;
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

export const OtherUserInfo = styled.div`
  width: 60%;
  margin: auto;
`;

export const ReportContent = styled.div`
  /* height: 500px; */
  width: 300px;
  h3 {
    color: ${colors.colorA};
  }
  textarea {
    width: 100%;
    height: 150px;
    resize: none;
    overflow-y: scroll;
    margin-bottom: 15px;
    ${ScrollBar}
  }
`;
