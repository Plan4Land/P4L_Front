import styled from "styled-components";
import { colors } from "./GlobalStyle";

export const MainContainer = styled.div`
  min-height: 700px; /////이거는 고민
  padding: 0 15vw;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
`;

export const Info = styled.div`
  height: 300px; // 이것도 고정으로 할지 고민
  display: flex;
  box-sizing: border-box;
  position: relative;

  div {
    margin: auto 0 auto 2%;
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

    @media (max-width: 1160px) {
      width: 150px;
      height: 150px;
    }
  }
  .planner-edit-title {
    width: 400px;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #ccc;
  }

  .menu-icons {
    display: flex;
    position: absolute;
    right: 0;
    top: 25px;

    .menu-icon {
      font-size: 2rem;
      color: #666666;
      cursor: pointer;
      margin-right: 4px;
      margin-left: 0.8vw;
    }
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

  .edit-button {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

export const UserProfile = styled.div`
  display: flex;
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: -35px;
  cursor: pointer;
  /* background-color: red; */
  &:first-of-type {
    margin-left: 0; /* 첫 번째 프로필은 이동하지 않도록 설정 */
  }
  &:hover {
    scale: 1.1;
  }
`;

export const ParticipantsContainer = styled.div`
  width: 70%;
  height: 100%;
  overflow-y: auto;
  margin: 15px auto 20px;
  padding: 5% 10%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .participants-profile {
    width: 70px;
    height: 70px;
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
  height: 30px;
  background-color: pink;
  margin-right: 70px;
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
  width: 60%;
  min-width: 400px; // 이거도 고민
  min-height: 100px; // 이거 고민
  max-height: 600px; // 이것도 고민
  /* display: flex;
  flex-direction: column; */
  overflow-y: auto;
  overflow-x: hidden;
  /* overflow-x: visible; */
  background-color: blanchedalmond;

  .planning-day {
    display: flex;
    position: relative;
    align-items: center;
    width: 92%;
    height: 40px;
    margin: 2px auto 0;
    cursor: pointer;
    background-color: #e2f3a2;

    .arrow {
      display: flex;
      position: absolute;
      right: 7px;
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
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .select-option {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.5s ease;
  }

  .select-option.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .question-title {
    margin-top: 6vh;
    span {
      margin-left: 5px;
      font-size: 17px;
      font-weight: normal;
    }
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
    max-width: 150px;
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
`;

export const DatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 420px;
  width: 70%;
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 20px;

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
    caret-color: transparent; // 키보드 커서 없애기
  }

  .input-date-picker:hover::placeholder {
    /* background-color: #ddd; */
    color: black;
    /* font-weight: bold; */
  }

  .input-date-picker:focus {
    outline: none; // 포커스 시 검은색 테두리 제거
  }

  .react-datepicker-popper[data-placement^="bottom"]
    .react-datepicker__triangle {
    fill: ${colors.colorC};
    color: ${colors.colorC};
  }

  .react-datepicker__header {
    background-color: ${colors.colorC};
  }

  .react-datepicker__navigation-icon::before {
    border-color: #90af5e;
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: "";
    display: block;
    height: 9px;
    position: absolute;
    top: 6px;
    width: 9px;
  }

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
`;

export const SearchSelectMenuContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15%;
  box-sizing: border-box;
  margin: 3% 5% 0;

  span {
    display: inline-block; /* 텍스트 길이에 맞게 크기 조정 */
    cursor: pointer; /* 클릭 가능 표시 */
    padding-bottom: 4px; /* 텍스트와 밑줄 간격 */
  }

  .menu-item {
    /* 일반 메뉴 스타일 */
    display: inline-block; /* 텍스트 길이에 맞게 크기 조정 */
    min-width: 30%;
    border-bottom: 1px solid transparent;
  }

  .selected-menu {
    border-bottom: 1px solid black; /* 선택된 메뉴 밑줄 */
  }

  .bar {
    width: auto; /* 구분자 크기 조정 */
    padding: 0 5px; /* 좌우 간격 추가 */
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
  justify-content: space-between;
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
  background-color: azure;

  .plan-place-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    background-color: #c7daf7;

    .plan-place {
      display: flex;
      flex-direction: column;

      .place-name {
        margin: 5px;
        font-size: 17px;
        font-weight: bold;
      }
      .place-category {
        margin: 0 5px 5px 5px;
        font-size: 13px;
        color: #333;
      }
    }
  }
  .memo-container {
    display: flex;
    position: relative;
    img {
      width: 30px;
      height: 30px;
    }
    .memo-icon {
      cursor: pointer;
    }

    .memo-input {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translateX(-5%) translateY(90%);
      width: 230px;
      height: 20vh;
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
  background-color: #fefff3;

  .sendChat {
    width: 100%;
    display: flex;
    position: absolute;
    justify-content: space-between;
    bottom: 0;
    margin-bottom: 8px;

    textarea {
      width: 16rem;
      min-height: 40px;
      /* max-height: 70px; */
      font-size: 14px;
      padding: 4px;
      box-sizing: border-box;
      resize: none;

      scrollbar-width: thin;
      scrollbar-color: #ccc #f0f0f0;

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
      margin-right: 6px;
      cursor: pointer;
      /* transition: all 0.2s ease; */
      background-color: transparent;
      border: none;
      color: #3762d8;
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
  margin-bottom: 10px;
`;

export const Message = styled.div`
  max-width: 70%;
  font-size: 14px;
  background-color: ${(props) => (props.isSender ? "#cfebbb" : "#E0E0E0")};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
`;
