import styled, { css } from "styled-components";
import { colors } from "../../Style/GlobalStyle";
import { ScrollBar } from "../ButtonComponent";

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

// 회원가입, 로그인 스타일
export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 700px;
  padding: 30px;
  box-sizing: border-box;
  min-height: 700px;
  .title {
    margin-bottom: 20px;
    text-align: center;
    padding-bottom: 20px;
  }

  .input-container {
    position: relative;
    padding-top: 15px;
  }

  .textMessage {
    position: absolute;
    top: -2px;
    color: red;
    font-size: 12px;
    margin-left: 5px;
  }
  .textMessage-true {
    position: absolute;
    top: -2px;
    color: green;
    font-size: 12px;
    margin-left: 5px;
  }

  .inputWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .linkBox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    p,
    span {
      margin: 0;
      font-size: 12px;
      cursor: pointer;
      color: gray;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .linkBox-left {
    display: flex;
  }

  .picture-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin: 20px 0;

    .current-pic {
      display: flex;
      position: relative;
      border-radius: 50%;
      border: 1px solid #ddd;
      cursor: pointer;
      width: 100px;
      height: 100px;
      &:hover {
        border: 1px solid #bbb;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .upload-label {
      position: absolute;
      bottom: 0.2rem;
      right: 0.2rem;
      background-color: ${colors.colorA};
      color: white;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }
  }

  .duplicateButton {
    width: 60px;
    height: 30px;
    font-size: 12px;
    padding: 3px 5px;
    margin-bottom: 10px;
    background-color: ${colors.colorC};
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
    &:disabled {
      background-color: #bbb;
      cursor: default;
    }
  }

  .login-social-box {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 30px;
    .login-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      padding: 0;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      svg {
        width: 50%;
        height: 50%;
      }
    }
    .kakao {
      background-color: rgb(255, 255, 0);
      &:hover {
        background-color: rgb(240, 240, 0);
      }
    }
    .google {
      background-color: rgb(240, 240, 240);
      &:hover {
        background-color: rgb(220, 220, 220);
      }
      svg {
        width: 60%;
        height: 60%;
      }
    }
    .naver {
      background-color: rgb(3, 199, 90);
      &:hover {
        background-color: rgb(3, 184, 75);
      }
    }
  }
  .signup-button {
    margin: 5px auto;
  }
  .banModal {
    width: 500px;
    height: 300px;

    .info {
      font-size: 18px;
      font-weight: bold;
      color: red;
    }
    .banInfo {
      margin: 20px;
      display: flex;
      flex-direction: column;
      .explain {
        strong {
          margin-right: 5px;
        }
        margin: 20px;
        display: flex;
        justify-content: flex-start;
      }
    }
  }
  @media (max-width: 768px) {
    .title {
      margin: 0;
      font-size: 20px;
    }
    .login-social-box {
      scale: 0.7;
    }
    .linkBox {
      p,
      span {
        font-size: 10px;
      }
    }
    .nextButton {
      width: 80%;
      font-size: 13px;
      margin: auto;
    }
    .duplicateButton {
      font-size: 10px;
    }
    .textMessage,
    .textMessage-true {
      font-size: 10px;
    }
  }
  .signup-button {
    width: 80%;
    font-size: 14px;
  }
`;

export const InputBox = styled.div`
  display: flex;
  height: 30px;
  width: calc(100% - 34px);
  border: 1px solid #ddd;
  padding: 1em;
  margin-bottom: 10px;
  border-radius: 15px;
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
  @media (max-width: 768px) {
    font-size: 0.8em;
    padding: 5px 10px;
  }
`;

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
  &:disabled {
    background-color: #aaa;
    cursor: default;
  }
`;

export const Terms = styled.div`
  margin-bottom: 30px;
  .terms-label {
    display: flex;
    flex-direction: row;
    gap: 5px;
    cursor: pointer;
  }

  .iconBox-left {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    svg {
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }
  }
  .checked {
    svg {
      background-color: green;
      path:nth-child(1) {
        color: white;
      }
      path:nth-child(2) {
        color: green;
      }
    }
  }

  .inputBox-big {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  .inputBox {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }

  .terms-content {
    height: 200px;
    overflow: auto;
    padding: 15px;
    margin: 9px 0 0 35px;
    border: 1px solid #ddd;
    ${ScrollBar}
    p {
      line-height: 1.5;
    }
  }
  @media (max-width: 768px) {
    .inputBox-big,
    .inputBox {
      font-size: 15px;
    }
    .circle {
      scale: 0.7;
    }
    .terms-content {
      h3 {
        font-size: 15px;
      }
      h4 {
        font-size: 13px;
      }
      p,
      li {
        font-size: 10px;
      }
    }
  }
`;
