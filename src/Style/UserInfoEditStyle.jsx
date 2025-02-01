import styled, { css } from "styled-components";
import { colors } from "../Style/GlobalStyle";

export const Center = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  width: 60vw;
  @media (max-width: 768px) {
    width: 90vw;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  box-sizing: border-box;
  width: 100%;
  .title {
    display: flex;
    justify-content: center;
  }

  .labelBox {
    display: flex;
    justify-content: space-between;
    margin: 0 5px;
  }
  label {
    margin-bottom: 5px;
    margin-left: 5px;
  }

  .input-container {
    position: relative;
  }

  .textMessage {
    position: absolute;
    top: -20px;
    right: 18px;
    color: red;
    font-size: 12px;
  }
  .textMessage-true {
    position: absolute;
    top: -20px;
    right: 18px;
    color: green;
    font-size: 12px;
  }

  .message {
    display: flex;
    align-items: end;
    margin: 0;
    font-size: 12px;
    color: red;
    padding-bottom: 5px;
  }

  .picture-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    .current-pic {
      display: flex;
      position: relative;
      border-radius: 50%;
      border: 1px solid #ddd;
      cursor: pointer;
      width: 120px;
      height: 120px;
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

  .back-button {
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    color: white;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.2);
    border-top: 5px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .delete-header {
    font-size: small;
    h2 {
      margin: 0;
    }
    p {
      margin: 0;
      padding-top: 10px;
    }
  }
  .delete-content {
    font-size: small;
    margin-bottom: 30px;
    .span1 {
      font-weight: 500;
      color: ${colors.colorC};
    }
    .span2 {
      color: ${colors.colorE};
    }
    .dropout {
      margin: 0;
      margin-top: 20px;
    }
    .dropout-dsc {
      margin: 0;
      padding-top: 15px;
    }
    hr {
      margin: 40px 0 30px 0;
    }
    .agreeBox {
      font-weight: 700;
      color: ${colors.colorE};
      margin-bottom: 30px;
    }

    .agreeBtn {
      display: flex;
      flex-direction: row;
      gap: 5px;
      cursor: pointer;
      align-items: center;
    }

    .iconBox-left {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px;
      svg {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
    .checked {
      svg {
        background-color: ${colors.colorC};
        path:nth-child(1) {
          color: white;
        }
        path:nth-child(2) {
          color: ${colors.colorC};
        }
      }
    }
  }
  .center2 {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    .deleteBox {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      padding-right: 20px;
    }
    .userDeleteBtn {
      color: gray;
      font-size: 12px;
      margin-top: 4px;
      cursor: pointer;
    }
  }
  @media (max-width: 768px) {
    .labelBox {
      font-size: 13px;
    }
    .message {
      font-size: 10px;
    }
    .nextButton {
      scale: 0.7;
    }
    .deleteBox {
      margin-top: -35px;
    }
    label {
      font-size: 13px;
    }
    .textMessage,
    .textMessage-true {
      font-size: 9px;
    }
    .title {
      font-size: 20px;
    }
    .delete-header {
      h2 {
        font-size: 15px;
      }
      p {
        font-size: 12px;
      }
    }
    .delete-content {
      p {
        font-size: 10px;
      }
    }
    .agreeBox {
      font-size: 10px;
    }
    strong {
      font-size: 12px;
    }
    .back-button {
      width: 20px;
      height: 20px;
    }
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
  &.red {
    background-color: rgb(220, 0, 0);
    &:hover {
      background-color: rgb(200, 0, 0);
    }
  }
`;

export const EditBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .iconBox1 {
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border-right: 1px solid #ddd;
  }
  .iconBox2 {
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  .iconBox1,
  .iconBox2 {
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.7;
    }
  }
  .name {
    margin: 0;
    text-align: center;
  }
  .icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.colorA};
    svg {
      width: 150px;
      height: 180px;
    }
  }
  @media (max-width: 768px) {
    scale: 0.7;
  }
`;
