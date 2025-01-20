import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const MainContainer = styled.div`
  min-height: 700px; /////이거는 고민
  padding: 0 15vw;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  .menu-icons {
    display: flex;
    position: absolute;
    right: 15vw;
    top: 110px;

    .menu-icon {
      font-size: 2rem;
      color: #666666;
      cursor: pointer;
      margin-right: 4px;
      margin-left: 0.8vw;
      transition: all 0.3s ease;
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export const Info = styled.div`
  height: 300px; // 이것도 고정으로 할지 고민
  display: flex;
  box-sizing: border-box;
  position: relative;
  margin-top: 80px;
  .edit-box {
    width: 100%;
  }
  div {
    margin: auto 0 auto 0;
  }
  .planner-thumbnail {
    margin-right: 2%;
  }
  h1,
  h3 {
    margin: 3px;
  }

  .planner-thumbnail {
    width: 250px;
    height: 250px;
    flex-shrink: 0;
    @media (max-width: 1370px) {
      width: 200px;
      height: 200px;
    }

    @media (max-width: 768px) {
      width: 150px;
      height: 150px;
    }
  }

  .planner-edit-title {
    width: 400px;
    padding: 10px;
    margin: 0 0 10px 5px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-bottom: 1px solid #ccc;
  }

  .edit-button {
    margin-left: 3%;
    padding: 2px 8px;
    border-radius: 5px;
    border: 1px solid ${colors.colorB};
    background-color: ${colors.colorB};
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  .location-select {
    margin-left: 0.8%;
    font-size: 14px;
    padding: 5px;
    border: 1px solid #eee;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
    width: 25%;
    background-color: #f9f9f9;
    cursor: pointer;
  }
  .location-select:first-of-type {
    margin-bottom: 10px;
  }

  .location-select option {
    padding: 10px;
  }

  .theme-buttons {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 3px 10px;
    margin-bottom: 10px;
  }

  .theme-button {
    padding: 5px;
    width: 100%;
    max-width: 150px;
    margin: 5px;
    border-radius: 10px;
    background-color: white;
    border: 1px solid ${colors.colorB};
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    &:hover {
      opacity: 0.7;
    }
  }

  .theme-button.selected {
    background-color: ${colors.colorB};
    color: white;
  }

  .theme-button:disabled {
    background-color: #f0f1f0;
    cursor: default;
  }
`;

export const Users = styled.div`
  width: 100%;
  height: 100px; // 이것도 고정으로 할지 고민
  display: flex;
  align-items: center;
  position: relative;
  /* background-color: bisque; */

  .no-participants {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-size: 30px;
    background-color: ${colors.colorB};
    cursor: pointer;
    &:hover {
      scale: 1.1;
    }
  }
  .editing-info {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .edit-button,
  .edit-button-complete {
    position: absolute;
    right: 0;
    bottom: -5px;
    border: none;
    color: black;
    width: 80px;
    height: 25px;
    font-size: 13px;
    white-space: nowrap;
  }
  .edit-button {
    background-color: #ddd;
  }
  .edit-button-complete {
    background-color: #89bafa;
  }
`;

export const UserProfile = styled.div`
  display: flex;
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-left: -35px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:first-of-type {
    margin-left: 0;
  }
  &:hover {
    scale: 1.05;
  }
`;

export const ParticipantsContainer = styled.div`
  width: 70%;
  height: 100%;
  overflow-y: auto;
  margin: 15px 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  img {
    cursor: pointer;
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .participantsInfo {
    display: flex;
    align-items: center;
    p {
      margin-left: 20px;
    }
  }
`;

export const SearchedUserContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 90%;
  margin: 4% auto;

  .searched-user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 5%;

    p {
      margin: 0;
    }

    .searched-id {
      font-size: 12px;
      color: #555;
      margin-top: 3%;
    }
  }

  .searched-user-invite {
    display: flex;
    position: absolute;
    right: 0;
    margin: auto 0;
  }
`;

export const SearchedUserHr = styled.hr`
  width: 97%;
  border: 0;
  border-top: 1px solid #ccc;
`;

export const UserName = styled.div`
  width: 120px;
  height: 40px;
  margin-right: 70px;
  padding-left: 10px;
  display: flex;
  align-items: center;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 600px; // 이것도 고정으로 할지 고민
  display: flex;
  justify-content: center;
  padding: 2%;
  box-sizing: border-box;
  /* background-color: skyblue; */
`;

export const MainPlanning = styled.div`
  width: 50%;
  min-width: 400px; // 이거도 고민
  min-height: 100px; // 이거 고민
  max-height: 600px; // 이것도 고민
  /* display: flex;
  flex-direction: column; */
  overflow-y: auto;
  overflow-x: hidden;
  /* overflow-x: visible; */
  border-radius: 10px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.5);

  .planning-day {
    display: flex;
    position: relative;
    align-items: center;
    width: 90%;
    height: 40px;
    margin: 10px auto 0;
    cursor: pointer;
    background-color: ${colors.colorC};
    border-radius: 5px;
    padding-left: 10px;

    .arrow {
      display: flex;
      position: absolute;
      right: 7px;
      color: ${colors.colorA};
      transition: all 0.3s ease;
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export const KakaoMapContainer = styled.div`
  min-width: 400px;
  width: 40%;
  height: 400px;
  margin-left: 1%;
  z-index: 1;
  background-color: antiquewhite;
`;

// 플래닝 생성 페이지!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const MakePlanningContainer = styled.div`
  /* width: 50%; */
  min-height: 75vh;
  padding: 0 30vw;
  margin: 3vh 0 10vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2.question-title {
    margin: 30px 0 20px 0;
  }
  .select-option {
    position: relative;
    top: 10px;
    transition: all 0.5s ease;
  }

  .select-option.visible {
    top: 0;
  }

  .location-select {
    font-size: 16px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
    width: 400px;
    background-color: #f9f9f9;
    cursor: pointer;
  }
  .location-select:first-of-type {
    margin-bottom: 10px;
  }

  .location-select option {
    padding: 10px;
  }

  .theme-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px; /* 버튼 사이 간격 */
  }

  .theme-button {
    padding: 10px 20px;
    width: 100%;
    max-width: 200px;
    margin: 5px;
    border-radius: 10px;
    background-color: white;
    border: 1px solid ${colors.colorB};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${colors.colorB};
      color: white;
      opacity: 0.7;
    }
  }

  .theme-button.selected {
    background-color: ${colors.colorB};
    color: white;
  }

  .theme-button:disabled {
    background-color: #f0f1f0;
    cursor: default;
  }

  .title-input {
    width: 400px;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #ccc;
  }

  .profile-container {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 18px;
    }
    .theme-buttons {
      gap: 5px;
    }
    .theme-button {
      font-size: 10px;
      width: 100%;
      min-width: 100px;
      padding: 10px;
      margin-top: 0;
      margin-bottom: 0;
    }
    .location-select {
      width: 70vw;
      font-size: 10px;
      padding: 5px;
    }
    .planningTitle {
      input {
        width: 70vw;
      }
    }
    .profile-container {
      width: 100px;
      height: 100px;
    }
    .public {
      scale: 0.8;
    }
    .select-option {
      button {
        font-size: 12px;
        padding: 10px 20px 10px 20px;
        width: 100%;
      }
    }
  }
`;

export const DatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 420px;
  width: 70%;
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 20px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    scale: 0.7;
  }
  span {
    margin: 0 5px;
  }

  .input-date-picker {
    // 시작일, 종료일 input
    height: 35px;
    text-align: center;
    color: #777;
    font-size: 100%;
    border: none;
    border-radius: 20px;
    background-color: transparent;
    cursor: pointer;
    caret-color: transparent;
  }

  .input-date-picker:hover::placeholder {
    /* background-color: #ddd; */
    color: black;
    /* font-weight: bold; */
  }

  .input-date-picker:focus {
    outline: none; // 포커스 시 검은색 테두리 제거
  }

  // 꼬다리
  .react-datepicker-popper[data-placement^="bottom"]
    .react-datepicker__triangle {
    fill: ${colors.colorC};
    color: ${colors.colorC};
  }

  // 달력 헤더
  .react-datepicker__header {
    background-color: ${colors.colorC};
  }

  // 날짜 변경 버튼
  .react-datepicker__navigation-icon::before {
    border-color: ${colors.colorB};
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: "";
    display: block;
    height: 9px;
    position: absolute;
    top: 6px;
    width: 9px;
  }

  // 선택 날짜
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    border-radius: 0.3rem;
    background-color: ${colors.colorC};
    color: rgb(0, 0, 0);
  }

  .react-datepicker__day--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ),
  .react-datepicker__month-text--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ),
  .react-datepicker__quarter-text--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ),
  .react-datepicker__year-text--in-selecting-range:not(
      .react-datepicker__day--in-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--in-range,
      .react-datepicker__year-text--in-range
    ) {
    background-color: ${colors.colorC};
  }
  .jFcLGg
    .react-datepicker__day--in-range:not(
      .react-datepicker__day--in-selecting-range,
      .react-datepicker__month-text__month-text--in-selecting-range,
      .react-datepicker__quarter-text--in-selecting-range,
      .react-datepicker____year-text--in-selecting-range
    ) {
    background-color: white;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    border-radius: 0.3rem;
    background-color: ${colors.colorC};
    /* color: #fff; */
    color: black;
  }
  .react-datepicker__day:not([aria-disabled="true"]):hover,
  .react-datepicker__month-text:not([aria-disabled="true"]):hover,
  .react-datepicker__quater-text:not([aria-disabled="true"]):hover,
  .react-datepicker__year-text:not([aria-disabled="true"]):hover {
    background-color: ${colors.colorC};
  }

  .react-datepicker__day--in-range:not(
      .react-datepicker__day--in-selecting-range,
      .react-datepicker__month-text__month-text--in-selecting-range,
      .react-datepicker__quarter-text--in-selecting-range,
      .react-datepicker____year-text--in-selecting-range
    ) {
    background-color: ${colors.colorC};
  }
  .react-datepicker__day--outside-month {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const SearchSelectMenuContainer = styled.div`
  width: 90%;
  gap: 15%;
  box-sizing: border-box;
  margin: 3% 3% 0;
  .menu-item {
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 10px;
    padding: 0 20px;
    white-space: nowrap;
    &:hover {
      background-color: ${colors.colorC};
    }
  }
  .selected-menu {
    background-color: ${colors.colorC};
  }
  .bar {
    margin: 0 20px;
  }
`;

export const SearchMemberContainer = styled.div`
  width: 100%;
  height: 100%;
  .searched-users-container {
    height: 88%;
    overflow-y: auto;
  }
`;

export const SearchInputContainer = styled.div`
  width: 95%;
  margin: 20px auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    border: 1px solid ${colors.colorA};
    border-radius: 20px;
    font-size: 13px;
    width: 80%;
    height: 25px;
    font-size: 14px;
    padding: 3px 3px 3px 10px;
  }

  .searchIcon {
    width: 50px;
    font-size: 25px;
    color: ${colors.colorA};
    cursor: pointer;
  }
`;

export const SearchBookmarkContainer = styled.div`
  width: 90%;
  height: 385px;
  margin: 0 auto;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
`;

export const DayToggleContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 85%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;

  button {
    background-color: #ececec;
    border: none;
    border-radius: 10px;
    padding: 3px 30px 3px 30px;
    margin-top: 5px;
    color: #474747;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
  }
  .plan-place-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    background-color: ${colors.colorD};

    .plan-place {
      display: flex;
      position: relative;
      flex-direction: column;

      .seq-num-container {
        display: flex;
        position: absolute;
        left: -5px;
        top: 17px;
        width: 20px;
        height: 20px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: white;
        border: none;
      }
      .delete-btn {
        background-color: red;
        cursor: pointer;
      }
      .seq-div {
        background-color: ${colors.colorB};
      }

      .place-name {
        margin: 5px 5px 5px 20px;
        font-size: 17px;
        font-weight: bold;
      }
      .place-category {
        margin: 0 5px 5px 20px;
        font-size: 13px;
        color: #5f5f5f;
      }
    }
  }
  .memo-container {
    display: flex;
    position: relative;
    .memo-icon {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    .memo-input {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translateX(-10%) translateY(95%);
      width: 230px;
      height: 15vh;
      /* max-height: 100vh; */
      background-color: white;
      overflow-y: auto;
      z-index: 2;

      textarea {
        width: 100%;
        resize: none;
        padding: 6px;
      }
    }
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  position: fixed;
  right: 10px;
  top: 130px;
  width: 300px;
  height: 60vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  z-index: 99;
  background-color: ${colors.colorD};
  padding: 10px;
  .chat-header {
    width: 100%;
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    .close-chat {
      color: #666;
      cursor: pointer;
      position: absolute;
      right: 0;
    }
  }
  .sendChat {
    width: 100%;
    display: flex;
    position: absolute;
    justify-content: space-between;
    bottom: 0;
    margin-bottom: 8px;
    margin-left: 5px;
    textarea {
      width: 16rem;
      font-size: 15px;
      padding: 4px;
      box-sizing: border-box;
      resize: none;
      border-radius: 10px;

      /* &::-webkit-scrollbar {
        width: 6px;
      } */
      /* &::-webkit-scrollbar-track {
        background: #f0f0f0;
      } */
      /* &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 10px;
        border: 2px solid #f0f0f0;
      } */
      /* &::-webkit-scrollbar-thumb:hover {
        background-color: #b3b3b3;
      } */
    }

    button {
      width: 2.6rem;
      margin-right: 20px;
      cursor: pointer;
      /* transition: all 0.2s ease; */
      background-color: transparent;
      border: none;
      color: #597bd8;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        color: #666;
        cursor: default;
      }
      svg {
        font-size: 2rem;
      }
    }
  }
`;

export const ChatMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  gap: 10px;
  position: absolute;
  top: 40px;
`;

export const Message = styled.div`
  max-width: 70%;
  font-size: 14px;
  background-color: ${(props) => (props.isSender ? "#cfebbb" : "#E0E0E0")};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
`;
