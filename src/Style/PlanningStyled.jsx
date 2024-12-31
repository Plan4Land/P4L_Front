import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  min-height: 700px; /////이거는 고민
  display: flex;
  flex-direction: column;
`;

export const Info = styled.div`
  width: 100%;
  height: 150px; // 이것도 고정으로 할지 고민
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: azure;

  h1,
  h3 {
    margin: 3px;
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
  height: 450px; // 이것도 고정으로 할지 고민
  display: flex;
  justify-content: center;
  padding: 2%;
  box-sizing: border-box;
  background-color: skyblue;
`;

export const MainPlanning = styled.div`
  width: 50%;
  min-width: 700px; // 이거도 고민
  min-height: 100px; // 이거 고민
  max-height: 400px; // 이것도 고민
  display: flex;
  background-color: blanchedalmond;
`;

export const KakaoMapContainer = styled.div`
  width: 400px;
  height: 400px;
  margin-left: 20px;
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
