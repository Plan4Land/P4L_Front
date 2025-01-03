import styled from "styled-components";

export const MyPageMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  margin: 20px 0 20px 0;
  .menu {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .MyPageMenu {
    width: 80%;
    border: 1px solid black;
  }
`;
export const UserInfo = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .ProfileImg {
    height: 300px;
    width: 300px;
    border: 1px solid black;
    border-radius: 50%;
  }
  .UserExplain {
    border: 1px solid black;
    width: 500px;
    height: 300px;
  }
`;
