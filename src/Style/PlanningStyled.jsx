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
    margin-bottom: 12px;
  }
  p {
    margin-bottom: 6px;
  }
`;

export const MakePlanningContainer = styled.div`
  height: 75vh;
  padding: 0 30vw;
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 6vh;
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
`;
