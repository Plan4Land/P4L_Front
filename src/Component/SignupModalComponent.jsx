import styled, { css } from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// icon
import { GoMail, GoPencil } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

export const InputBox = styled.div`
  display: flex;
  height: 30px;
  width: calc(100% - 34px);
  border: 1px solid #ddd;
  padding: 1em;
  margin-bottom: 10px;

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

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    z-index: 1001;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .openModal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-container {
    width: 500px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 1rem;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }

  .readonly {
    background-color: #ddd;
  }

  .closeBtn {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    cursor: pointer;
    svg {
      width: 30px;
      height: 30px;
    }
  }

  .margin-top50 {
    margin-top: 50px;
  }
`

// 아이디 찾기 모달
export const FindUserIdModal = (props) => {
  const { open, close, openResult } = props;

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [textMessage, setTextMessage] = useState("");

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const onClickFindUserId = () => {
    // 아이디 찾기 기능 구현
    openResult();
    handleCloseModal();
  };

  const handleBackgroundClick = (e) => {
    e.stopPropagation();  // 내부 클릭 시 닫히지 않게 설정
    handleCloseModal();
  };

  const handleCloseModal = () => {
    close();
    setInputEmail("");
  }

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}
      >
        {open && (
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="title">
              아이디 찾기
            </h1>
            <div className="input-container">
              <div className="textMessage">{textMessage}</div>
              <InputBox>
                <div className="iconBox-left"><GoPencil /></div>
                <div className="inputBox">
                  <input
                    type="text" 
                    placeholder="이름 입력"
                    value={inputName}
                    onChange={(e) => handleInputChange(e, setInputName)}
                  />
                </div>
              </InputBox>
              <InputBox>
                <div className="iconBox-left"><GoMail /></div>
                <div className="inputBox">
                  <input
                    type="email" 
                    placeholder="이메일 입력"
                    value={inputEmail}
                    onChange={(e) => handleInputChange(e, setInputEmail)}
                  />
                </div>
              </InputBox>
            </div>
            <div className="margin-top50" />
            <Button onClick={onClickFindUserId}>
              아이디 찾기
            </Button>

            <div className="closeBtn" onClick={handleCloseModal}>
              <IoClose />
            </div>
          </div>
        )}
      </div>
    </ModalStyle>
  );
};

// 아이디 찾기 결과 모달
export const ResultUserIdModal = (props) => {
  const { open, close, userId, openFindPw } = props;

  const handleBackgroundClick = (e) => {
    e.stopPropagation();  // 내부 클릭 시 닫히지 않게 설정
    close();
  };

  const onClickFindPw = () => {
    close();
    openFindPw();
  }

  // 아이디 형태 변환
  const changeUserId = (userId) => {
    if (userId.length <= 5) {
      return userId + "***";
    }
    return userId.slice(0, 5) + "***";
  }

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}
      >
        {open && (
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="title">
              아이디 찾기
            </h1>
            <div className="input-container">
              <div className="textMessage">
                해당하는 아이디는 다음과 같습니다.
              </div>
              <InputBox className="readonly">
                <div className="inputBox">
                  <input
                    type="text" 
                    value={changeUserId(userId)}
                    readOnly
                  />
                </div>
              </InputBox>
            </div>
            <div className="margin-top50" />
            <Button onClick={onClickFindPw}>
              비밀번호 찾기
            </Button>

            <div className="closeBtn" onClick={close}>
              <IoClose />
            </div>
          </div>
        )}
      </div>
    </ModalStyle>
  );
};

// 비밀번호 찾기 모달
export const FindPwModal = (props) => {
  const { open, close, openResult, openFindUserId } = props;
  const [ inputUserId, setInputUserId ] = useState("");
  const [ inputEmail, setInputEmail ] = useState("");
  const [ textMessage, setTextMessage ] = useState("");

  const handleBackgroundClick = (e) => {
    e.stopPropagation();  // 내부 클릭 시 닫히지 않게 설정
    handleCloseModal();
  };

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const onClickFindPw = () => {
    // 비밀번호 찾기 기능 구현
    openResult();
    handleCloseModal();
  }

  const onClickFindUserId = () => {
    openFindUserId();
    handleCloseModal();
  }

  const handleCloseModal = () => {
    close();
    setInputUserId("");
    setInputEmail("");
  }

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}
      >
        {open && (
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="title">
              비밀번호 찾기
            </h1>
            <div className="input-container">
              <div className="textMessage">{textMessage}</div>
              <InputBox>
                <div className="iconBox-left"><VscAccount /></div>
                <div className="inputBox">
                  <input
                    type="text" 
                    placeholder="아이디 입력"
                    value={inputUserId}
                    onChange={(e) => handleInputChange(e, setInputUserId)}
                  />
                </div>
              </InputBox>
              <InputBox>
                <div className="iconBox-left"><GoMail /></div>
                <div className="inputBox">
                  <input
                    type="email" 
                    placeholder="이메일 입력"
                    value={inputEmail}
                    onChange={(e) => handleInputChange(e, setInputEmail)}
                  />
                </div>
              </InputBox>
            </div>
            <div className="margin-top50" />
            <Button onClick={onClickFindPw}>
              비밀번호 찾기
            </Button>
            <div style={{position: "relative", paddingTop: "10px"}}>
              <p style={{fontSize: "12px", color: "red", margin: 0, position: "absolute", top: 0}}>아이디를 잊어버리셨나요?</p>
              <Button onClick={onClickFindUserId}>
                아이디 찾기
              </Button>
            </div>
            <div className="closeBtn" onClick={handleCloseModal}>
              <IoClose />
            </div>
          </div>
        )}
      </div>
    </ModalStyle>
  );
};

// 비밀번호 찾기 결과 모달
export const ResultPwModal = (props) => {
  const { open, close, email } = props;

  const handleBackgroundClick = (e) => {
    e.stopPropagation();  // 내부 클릭 시 닫히지 않게 설정
    close();
  };

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}
      >
        {open && (
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="title">
              비밀번호 찾기
            </h1>
            <div className="input-container">
              <div className="textMessage">
                아래의 이메일로 임시 비밀번호가 발급되었습니다.
              </div>
              <InputBox className="readonly">
                <div className="inputBox">
                  <input
                    type="email" 
                    value={email}
                    readOnly
                  />
                </div>
              </InputBox>
            </div>
            <div className="margin-top50" />
            <Button onClick={close}>
              로그인
            </Button>

            <div className="closeBtn" onClick={close}>
              <IoClose />
            </div>
          </div>
        )}
      </div>
    </ModalStyle>
  );
};