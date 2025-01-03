import styled, { css } from "styled-components";

export const Center = styled.div`
  display: flex;
  justify-content: center;
`

// 회원가입, 로그인 스타일
export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  background-color: #eee;
  padding: 30px;
  box-sizing: border-box;

  .title {
    text-align: center;
    margin-bottom: 30px;
  }

  .input-container {
    position: relative;
    padding-top: 20px;
  }

  .textMessage {
    position: absolute;
    top: 0;
    color: red;
    font-size: 12px;
  }

  .linkBox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    p {
      margin: 0;
      font-size: 12px;
      cursor: pointer;
    }
    span {
      margin: 0;
      font-size: 12px;
    }
  }
  .linkBox-left {
    display: flex;
  }

  .kakaoBtn {
    height: 4em;
    margin: 10px 0;
    font-size: 14px;
    font-weight: 600;
    background-color: rgb(255, 255, 0);
    border: none;
    cursor: pointer;
    &:hover {
      background-color: rgb(240, 240, 0);
    }
  }
`

export const InputBox = styled.div`
  display: flex;
  height: 30px;
  width: calc(100% - 34px);
  border: 1px solid #ddd;
  padding: 1em;
  margin-bottom: 10px;
  &:focus-within {
    border: 1px solid #bbb;
  }

  .inputBox {
    display: flex;
    width: 100%;
    
    &:focus {
      outline: none;
      border: none;
    }

    input {
      width: 100%;
      background-color: transparent;
      outline: none;
      border: none;
      font-size: 1em;
    }
  }

  .iconBox-left {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .iconBox-right {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`

export const Button = styled.button`
  width: 100%;
  height: 4em;
  margin: 10px 0;
  font-size: 14px;
  font-weight: 600;
  background-color: rgb(0, 180, 0);
    border: none;
    cursor: pointer;
    &:hover {
      background-color: rgb(0, 160, 0);
    }
`

