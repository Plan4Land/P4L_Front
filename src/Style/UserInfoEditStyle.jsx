import styled, { css } from "styled-components";
import { colors } from "../Style/GlobalStyle";

export const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 30px;
  box-sizing: border-box;

  .title {
    display: flex;
    justify-content: center;
  }

  .labelBox {
    display: flex;
    justify-content: space-between;
  }

  label {
    margin-bottom: 5px;
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
    margin: 20px 0;

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

  .userDeleteBtn {
    font-size: 12px;
    margin-top: 4px;
    cursor: pointer;
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
`;

export const InputBox = styled.div`
  display: flex;
  height: 30px;
  width: calc(100% - 34px);
  border: 1px solid #ddd;
  padding: 1em;
  margin-bottom: 20px;
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
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  .iconBox {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 200px;
    cursor: pointer;
  }
  .iconBox:nth-child(1) {
    border-right: 1px solid #ddd;
    padding-right: 30px;
  }
  .iconBox:nth-child(2) {
    padding-left: 30px;
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
    
    svg {
      width: 100%;
      height: 100%;
    }
  }
`