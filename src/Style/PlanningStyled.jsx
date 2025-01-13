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
  /* background-color: azure; */
  div {
    margin: auto 0 auto 2%;
  }
  h1,
  h3 {
    margin: 3px;
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
`;

export const UserProfile = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: -35px;
  cursor: pointer;
  background-color: red;
  &:first-of-type {
    margin-left: 0; /* 첫 번째 프로필은 이동하지 않도록 설정 */
  }
  &:hover {
    scale: 1.1;
  }
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

export const MakePlanningContainer = styled.div`
  min-height: 75vh;
  padding: 0 30vw;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;

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
    width: 300px;
    background-color: #f9f9f9;
    cursor: pointer;
  }
  .location-select:first-of-type {
    margin-bottom: 10px;
  }

  .location-select option {
    padding: 10px;
  }

  .theme-button {
    padding: 10px 20px;
    width: 100px;
    margin: 5px 16px;
    border-radius: 10px;
    background-color: #fffffa;
    border: 1px solid ${colors.colorB};
    cursor: pointer;
    transition: background-color 0.08s ease;
  }

  .theme-button.selected {
    background-color: ${colors.colorD};
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
    fill: #e1ffb0;
    color: #e1ffb0;
  }

  .react-datepicker__header {
    background-color: #e1ffb0;
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
    background-color: #d5f0a9;
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
    background-color: #d5f0a9;
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
    background-color: #d5f0a9;
    /* color: #fff; */
    color: black;
  }
  .react-datepicker__day:not([aria-disabled="true"]):hover,
  .react-datepicker__month-text:not([aria-disabled="true"]):hover,
  .react-datepicker__quater-text:not([aria-disabled="true"]):hover,
  .react-datepicker__year-text:not([aria-disabled="true"]):hover {
    background-color: #d5f0a9;
  }

  .react-datepicker__day--in-range:not(
      .react-datepicker__day--in-selecting-range,
      .react-datepicker__month-text__month-text--in-selecting-range,
      .react-datepicker__quarter-text--in-selecting-range,
      .react-datepicker____year-text--in-selecting-range
    ) {
    background-color: #d5f0a9;
  }
`;

export const SearchInputContainer = styled.div`
  width: 95%;
  margin: 25px auto 10px;
  display: flex;
  justify-content: space-between;
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
