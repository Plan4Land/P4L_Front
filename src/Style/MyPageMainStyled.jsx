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
  @media (max-width: 1024px) {
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
    /* p {
      font-size: 10px;
      margin: 8px 0 0 0;
    }
    .ProfileImg {
    } */
    .Button {
      margin: -20px 0 10px 0;
      flex-direction: row;
      scale: 0.6;
    }
    .user {
      scale: 0.7;
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
  .endList {
    text-align: center;
    margin: auto;
    color: gray;
    font-size: 13px;
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
      border-radius: 10px;
      /* margin-bottom: 20px; */
      transition: all 0.3s ease;
      padding: 5px 10px;
      &:hover {
        background-color: ${colors.colorC};
      }
      &.active {
        color: white;
        background-color: ${colors.colorC};
      }
    }
  }
`;
export const InvitePlanning = styled.div`
  height: 100%;
  .invited-planning-list {
    height: 85%;
    overflow-y: scroll;
    ${ScrollBar}
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
  @media (max-width: 768px) {
    h2 {
      font-size: 18px;
    }
    p {
      font-size: 13px;
    }
    .invited-planning-list {
      width: 300px;
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
      font-size: 11px;
      font-weight: bold;
    }

    .owner {
      margin: 0;
      font-size: 10px;
      span {
        font-size: 11px;
        font-weight: bold;
      }
    }
    .buttons {
      display: flex;
      align-items: center;
      gap: 5px;
      button {
        width: 45px;
        height: 25px;
        font-size: 10px;
      }
    }
  }
`;

export const OtherUserInfo = styled.div`
  width: 60%;
  margin: auto;
  @media (max-width: 768px) {
    margin-top: 40px;
    width: 90%;
  }
`;

export const ReportContent = styled.div`
  /* height: 500px; */
  width: 300px;
  h3 {
    color: ${colors.colorA};
  }
  textarea {
    width: 100%;
    height: 140px;
    resize: none;
    overflow-y: scroll;
    margin-bottom: 15px;
    border: 1px solid ${colors.colorA};
    border-radius: 5px;
    ${ScrollBar}
  }
`;

export const MenuBarButton = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    text-align: center;
    width: 20px;
    padding: 20px 0 0 20px;
    background-color: transparent;
    color: gray;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
  }
`;
