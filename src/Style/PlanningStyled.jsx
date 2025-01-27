import styled from "styled-components";
import { colors } from "./GlobalStyle";
import { ScrollBar } from "../Component/ButtonComponent";

export const MainContainer = styled.div`
  min-height: 700px;
  padding: 0 15vw;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 990px) {
    padding: 0 8vw;
  }
  @media (max-width: 768px) {
    padding: 0;
  }
  .menu-icons {
    display: flex;
    position: absolute;
    right: 15vw;
    top: 130px;
    @media (max-width: 990px) {
      right: 8vw;
      top: 120px;
    }
    @media (max-width: 768px) {
      right: 2vw;
      top: 90px;
    }
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
      @media (max-width: 1250px) {
        font-size: 1.7rem;
        margin-left: 0.6vw;
      }
      @media (max-width: 990px) {
        font-size: 1.5rem;
        margin-left: 0.5vw;
      }
      @media (max-width: 768px) {
        font-size: 1.3rem;
        margin-left: 0.4vw;
      }
    }
  }
`;

export const Info = styled.div`
  height: 370px; // 이것도 고정으로 할지 고민
  display: flex;
  box-sizing: border-box;
  position: relative;
  margin: 80px 0 20px;
  @media (max-width: 1250px) {
    height: 300px;
    margin: 75px 0 20px;
  }
  @media (max-width: 990px) {
    height: 270px;
    margin: 60px 0 20px;
  }
  @media (max-width: 768px) {
    height: 220px;
    margin: 50px 0 20px;
  }

  .planner-info-content {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    z-index: 3;
    color: #fff;
  }

  .edit-box {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 60%;
    @media (max-width: 768px) {
      width: 80%;
      padding-bottom: 30px;
    }
    @media (max-width: 400px) {
      width: 90%;
    }
  }
  div {
    margin: auto 0 auto 0;
  }
  h1 {
    margin: 7% 3px;
    @media (max-width: 1250px) {
      font-size: 24px;
      margin: 6% 3px;
    }
    @media (max-width: 768px) {
      font-size: 20px;
      margin: 5% 3px;
    }
    @media (max-width: 400px) {
      font-size: 16px;
      margin: 4% 3px;
    }
  }
  h3 {
    margin: 2% 0 2% 3px;
    font-weight: normal;
    font-size: 16px;
    @media (max-width: 1250px) {
      font-size: 14px;
    }
    @media (max-width: 768px) {
      font-size: 13px;
    }
    @media (max-width: 400px) {
      font-size: 12px;
    }
  }

  .planner-thumbnail {
    margin: 0 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15vw;
    height: 15vw;
    flex-shrink: 0;
  }
  .editTitle {
    display: flex;
    align-items: center;
    margin-bottom: 12.5px;
    @media (max-width: 768px) {
      margin-bottom: 7px;
    }
  }
  .planner-edit-title:disabled {
    background-color: #f0f0f0;
    color: #555;
  }
  .planner-edit-title {
    width: 80%;
    padding: 10px;
    margin-left: 5px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    border-bottom: 1px solid #ccc;
    @media (max-width: 1250px) {
      font-size: 17px;
      padding: 8px;
    }
    @media (max-width: 990px) {
      font-size: 16px;
      padding: 6px;
    }
    @media (max-width: 768px) {
      font-size: 16px;
      padding: 5px;
      width: 65%;
    }
    @media (max-width: 400px) {
      font-size: 14px;
      padding: 4px;
    }
  }

  .editInfo-button {
    font-size: 12px;
    width: 80px;
    height: 25px;
    margin: auto 0 auto 2%;
    padding: 2px 8px;
    border-radius: 10px;
    border: 1px solid ${colors.colorB};
    background-color: ${colors.colorB};
    color: white;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.7;
    }

    @media (max-width: 990px) {
      width: 70px;
      height: 23px;
    }
    @media (max-width: 768px) {
      font-size: 11px;
      width: 65px;
      height: 22px;
      padding: 1px 4px;
    }
    @media (max-width: 400px) {
      font-size: 10px;
      width: 58px;
      height: 18px;
    }
  }

  .edit-button,
  .edit-button-complete {
    position: absolute;
    right: 20px;
    top: 20px;
    border: none;
    color: black;
    width: 80px;
    height: 25px;
    font-size: 13px;
    white-space: nowrap;
    z-index: 2;
    @media (max-width: 990px) {
      width: 65px;
      top: 10px;
    }
    @media (max-width: 768px) {
      width: 65px;
      left: 60px;
      top: -32px;
    }
  }
  .edit-button {
    background-color: #ddd;
  }
  .edit-button-complete {
    background-color: #89bafa;
  }

  .editing-info {
    position: absolute;
    right: 20px;
    top: 20px;
    color: white;
    z-index: 2;
    span {
      font-weight: bold;
    }
    @media (max-width: 990px) {
      top: 10px;
    }
    @media (max-width: 768px) {
      color: black;
      left: 60px;
      top: -47px;
    }
  }

  .plans-toggle-icon {
    display: none; /* 기본적으로 숨김 (768px 이상에서도 숨기기) */

    @media (max-width: 768px) {
      display: flex; /* 768px 이하에서는 보이도록 설정 */
      position: absolute;
      left: 10px;
      top: -40px;
      font-size: 1.3rem;
      color: #555;
      cursor: pointer;
      padding: 10px;
      background-color: transparent;
      border-radius: 10px;
      z-index: 10;
      transition: all 0.3s ease;

      &:hover {
        opacity: 0.7;
      }

      /* .open 클래스를 가진 경우 */
      &.open {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
      }
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
    @media (max-width: 1250px) {
      font-size: 13px;
    }
    @media (max-width: 990px) {
      padding: 4px;
    }
    @media (max-width: 768px) {
      font-size: 12px;
      padding: 3.5px;
    }
    @media (max-width: 400px) {
      font-size: 11px;
      padding: 3px;
    }
  }
  .location-select:first-of-type {
    margin-bottom: 10px;
  }
  .location-select:disabled {
    background-color: #ffffff; /* 연한 회색 배경 */
    color: #333; /* 연한 회색 텍스트 */
  }

  .location-select option {
    padding: 10px;
    @media (max-width: 768px) {
      padding: 7px;
    }
  }

  .theme-buttons {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-bottom: 10px;
    place-items: center;
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 5px;
      max-width: 80%;
    }
  }

  .theme-button {
    padding: 5px;
    width: 90%;
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
    @media (max-width: 768px) {
      padding: 3px;
      margin: 4px;
      font-size: 12px;
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
  .planner-datepicker-container {
    /* display: flex !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    width: 70% !important;
    margin: 0 0 0 10px !important;
    border: 1px solid #aaa !important;
    border-radius: 20px !important;
    position: relative !important;
    z-index: 2 !important; */

    @media (max-width: 768px) {
      display: flex;
      position: absolute;
      left: -8vw;
      bottom: 0;
      font-size: 17px;
      span {
        margin: 0;
      }
    }
    @media (max-width: 540px) {
      left: -15vw;
      scale: 0.9;
    }
    @media (max-width: 470px) {
      left: -18vw;
      scale: 0.9;
    }
    @media (max-width: 400px) {
      left: -23vw;
      scale: 0.9;
    }
  }
`;

export const Users = styled.div`
  width: 90%;
  max-height: 100px; // 이것도 고정으로 할지 고민
  display: flex;
  align-items: center;
  position: relative;
  /* background-color: bisque; */
  margin: auto;
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
`;

export const PlannerOwner = styled.div`
  z-index: 2;
  display: flex;
  position: absolute;
  right: 0;
  bottom: 20px;
  color: #fff;
  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
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
    margin-right: 10px;
    @media (max-width: 1250px) {
      margin-right: 3px;
    }
  }
  &:hover {
    scale: 1.05;
  }
  @media (max-width: 1250px) {
    width: 50px;
    height: 50px;
    margin-left: -25px;
  }
  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    margin-left: -18px;
  }
  @media (max-width: 400px) {
    width: 30px;
    height: 30px;
    margin-left: -15px;
  }
`;

export const ParticipantsContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin: 15px 0 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  ${ScrollBar}
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
  /* width: 120px; */
  height: 40px;
  padding-right: 20px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 13px;
    padding-right: 10px;
    padding-left: 5px;
  }
  @media (max-width: 400px) {
    display: none;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2%;
  box-sizing: border-box;
`;

export const MainPlanning = styled.div`
  width: 50%;
  min-width: 300px; // 이거도 고민
  min-height: 100px; // 이거 고민
  max-height: 60vh; // 이것도 고민
  padding-bottom: 20px;
  overflow-y: auto;
  /* overflow-x: hidden; */
  border-radius: 10px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.5);
  ${ScrollBar};

  @media (max-width: 768px) {
    visibility: hidden;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 0.3s ease;
    scale: 0.8;

    &.open {
      visibility: visible;
      opacity: 1;
      transform: translateX(0);
    }

    position: absolute;
    z-index: 10;
    background-color: white;
    top: 95px;
    left: 5px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 400px) {
    left: 8px;
  }

  .planning-day {
    display: flex;
    position: relative;
    align-items: center;
    width: 90%;
    height: 30px;
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
  display: flex;
  position: relative;
  min-width: 350px;
  width: 40%;
  height: 400px;
  margin-left: 1%;
  z-index: 1;
  @media (max-width: 990px) {
    min-width: 300px;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
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
    margin: auto;
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
  .planner-date-picker {
    color: #f0f0f0;
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
  ${ScrollBar}
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
    ${ScrollBar}
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
  ${ScrollBar}
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
  .place-name,
  .place-category {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .seq-change {
    margin-right: 15px;
    display: flex;
    flex-direction: column;

    .seq-button {
      margin: -3px;
      color: ${colors.colorA};
      font-size: 25px;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
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
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 5px 0 5px 0;
    .plan-place {
      display: flex;
      position: relative;
      flex-direction: column;

      .seq-num-container {
        display: flex;
        position: absolute;
        left: -5px;
        top: 35%;
        width: 18px;
        height: 18px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: white;
        border: none;
        font-size: 10px;
      }
      .delete-btn {
        background-color: #db5454;
        cursor: pointer;
      }
      .seq-div {
        background-color: ${colors.colorB};
      }

      .place-name {
        margin: 5px 5px 5px 20px;
        font-size: 18px;
        font-weight: bold;
        @media (max-width: 768px) {
          font-size: 16px;
        }
        @media (max-width: 400px) {
          font-size: 14px;
        }
      }
      .place-category {
        margin: 0 5px 5px 20px;
        font-size: 13px;
        color: #5f5f5f;
        @media (max-width: 768px) {
          font-size: 12px;
        }
        @media (max-width: 400px) {
          font-size: 10.5px;
        }
      }
    }
  }
  .memo-container {
    display: flex;
    position: relative;
    align-items: center;
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
      ${ScrollBar}

      textarea {
        width: 100%;
        resize: none;
        padding: 6px;
        line-height: 1.5;
        ${ScrollBar}
      }
      textarea.textarea-disabled {
        background-color: #fcfcfc;
        cursor: default;
      }
    }
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 10px;
  top: 150px;
  width: 350px;
  height: 60vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  z-index: 99;
  background-color: #fffbf5;
  padding: 10px 10px 0.5vh;
  @media (max-width: 990px) {
    width: 280px;
    top: 140px;
  }
  @media (max-width: 768px) {
    top: 80px;
    right: -10px;
    scale: 0.9;
  }
  @media (max-width: 400px) {
    width: 240px;
    scale: 0.8;
    top: 70px;
  }
  .chat-header {
    width: 93%;
    display: flex;
    position: absolute;
    top: 10px;
    height: 18px;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 1px solid #ddd;
    .close-chat {
      color: #666;
      cursor: pointer;
    }
  }
  .sendChat {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    bottom: 0;
    margin-bottom: 8px;
    margin-left: 5px;
    border: 1px solid black;
    textarea {
      width: 16rem;
      font-size: 15px;
      padding: 4px;
      box-sizing: border-box;
      resize: none;
      border-radius: 15px;
      border: 1px solid ${colors.colorA};
      ${ScrollBar};
    }
    button {
      width: 2rem;
      margin-right: 20px;
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: #597bd8;
      scale: 0.9;

      &:hover {
        opacity: 0.8;
      }

      &:disabled {
        color: #666;
        cursor: default;
      }
      svg {
        font-size: 1.8rem;
      }
    }
  }
`;

export const ChatMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  padding-bottom: 20px;
  /* height: 83%; */
  max-height: calc(100% - 100px);
  overflow-y: scroll;
  gap: 10px;
  position: absolute;
  // top: 40px;
  bottom: 50px;
  // border-top: 1px solid #ddd;
  ${ScrollBar};
`;

export const Message = styled.div`
  max-width: 70%;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  display: flex;
  flex-direction: column;
  color: black;
  .talk {
    font-size: 14px;
    background-color: ${(props) => (props.isSender ? "#cfebbb" : "#E0E0E0")};
    border: ${(props) =>
      props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
    border-radius: 15px;
    border-radius: ${(props) =>
      props.isSender ? " 15px 0 0 15px  " : "0 15px 15px 0"};
    padding: 5px 15px;
    position: relative;
    margin: 0;
  }
  .id {
    margin: 0 3px 2px 3px;
    font-size: 12px;
    align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  }
`;
