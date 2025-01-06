import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 700px; /////이거는 고민
  padding: 0 15vw;
  display: flex;
  flex-direction: column;
`;

export const Info = styled.div`
  height: 300px; // 이것도 고정으로 할지 고민
  display: flex;
  box-sizing: border-box;
  position: relative;
  background-color: azure;
  div {
    margin: auto 0 auto 2%;
  }
  h1,
  h3 {
    margin: 3px;
  }

  img {
    display: flex;
    right: 0;
    width: 250px;
    height: 250px;
    margin: auto 0;
    background-color: #eafcd5;
    border-radius: 50%;
    text-align: center;
  }
`;

export const Users = styled.div`
  width: 100%;
  height: 100px; // 이것도 고정으로 할지 고민
  display: flex;
  align-items: center;
  position: relative;
  background-color: bisque;
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
  background-color: skyblue;
`;

export const MainPlanning = styled.div`
  width: 60%;
  min-width: 400px; // 이거도 고민
  min-height: 100px; // 이거 고민
  max-height: 600px; // 이것도 고민
  display: flex;
  background-color: blanchedalmond;
`;

export const KakaoMapContainer = styled.div`
  min-width: 400px;
  width: 40%;
  height: 400px;
  margin-left: 1%;
  background-color: antiquewhite;
`;

export const MemoContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: auto;
  background-color: palegoldenrod;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000; /* 다른 요소보다 위에 배치 */

  display: flex;
  justify-content: center;
  align-items: center;

  /* 배경 페이드인 효과만 적용 */
  animation: fadeBackground 0.3s ease;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  text-align: center;

  h3 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 6px;
  }
  button {
    width: 70px;
    height: 30px;
    margin-top: 20px;
    background-color: #e1ffb0;
    border: 1px solid #bce877;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #bce877;
    }
  }
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
  }
  /* 
  .location-select:focus {
    border-color: #f9ffe9;
    box-shadow: 0 0 5px #bce877;
  } */

  .location-select option {
    padding: 10px;
  }

  .theme-button {
    padding: 10px 20px;
    width: 100px;
    margin: 5px 16px;
    border-radius: 10px;
    background-color: #fbfdf9;
    border: 1px solid #bce877;
    cursor: pointer;
    transition: background-color 0.08s ease;
  }

  .theme-button.selected {
    background-color: #e1ffb0;
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
