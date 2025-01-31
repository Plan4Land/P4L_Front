import styled, {css} from "styled-components";
import {useState, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import emailjs from "emailjs-com";
import {InputBox} from "../../Style/UserInfoEditStyle";
import {Button} from "../ButtonComponent";

// icon
import {GoMail, GoPencil} from "react-icons/go";
import {IoClose} from "react-icons/io5";
import {VscAccount} from "react-icons/vsc";
import AxiosApi from "../../Api/AxiosApi";


export const ModalStyle = styled.div`
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
        display: flex;
        flex-direction: column;
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
        top: 10px;
        right: 10px;
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

    .picture-container-new {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        align-items: center;
    }

    .picture-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        justify-content: center;
        align-items: center;
    }

    .picture-box {
        width: 126px;
        height: 126px;

        img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 3px solid #ddd;
            overflow: hidden;
            cursor: pointer;

            &:hover {
                border: 3px solid #bbb;
            }
        }

        .plusPic {
            width: 80px;
            height: 80px;
            padding: 20px;
        }
    }
`;

// 아이디 찾기 모달
export const FindUserIdModal = (props) => {
  const {open, close, openResult} = props;

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [textMessage, setTextMessage] = useState("");

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const onClickFindUserId = async () => {
    try {
      // 탈퇴 확인
      const isActivate = await AxiosApi.isActivateByEmail(inputEmail);
      if (isActivate.data === "탈퇴한 회원입니다.") {
        setTextMessage("탈퇴한 회원입니다.");
        return;
      }
      // 찾기 기능
      const response = await AxiosApi.memberFindId(inputName, inputEmail);
      if (response.data) {
        openResult(response.data);
        handleCloseModal();
      }
    } catch (erorr) {
      setTextMessage("해당 회원이 존재하지 않습니다.");
    }
  };

  const handleBackgroundClick = (e) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않게 설정
    handleCloseModal();
  };

  const handleCloseModal = () => {
    close();
    setInputName("");
    setInputEmail("");
  };

  // 엔터로 버튼 클릭
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClickFindUserId();
    }
  };

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}
      >
        {open && (
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h1 className="title">아이디 찾기</h1>
            <div className="input-container">
              <div className="textMessage">{textMessage}</div>
              <InputBox>
                <div className="iconBox-left">
                  <GoPencil/>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    placeholder="이름 입력"
                    value={inputName}
                    onChange={(e) => handleInputChange(e, setInputName)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </InputBox>
              <InputBox>
                <div className="iconBox-left">
                  <GoMail/>
                </div>
                <div className="inputBox">
                  <input
                    type="email"
                    placeholder="이메일 입력"
                    value={inputEmail}
                    onChange={(e) => handleInputChange(e, setInputEmail)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </InputBox>
            </div>
            <div className="margin-top50"/>
            <Button
              onClick={onClickFindUserId}
            >
              아이디 찾기
            </Button>


            <div className="closeBtn" onClick={handleCloseModal}>
              <IoClose/>
            </div>
          </div>
        )}
      </div>
    </ModalStyle>
  );
};

// 아이디 찾기 결과 모달
export const ResultUserIdModal = (props) => {
  const {open, close, userId, openFindPw} = props;

  const handleBackgroundClick = (e) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않게 설정
    close();
  };

  const onClickFindPw = () => {
    close();
    openFindPw();
  };

  // 아이디 형태 변환
  const changeUserId = (userId) => {
    if (userId.length <= 5) {
      return userId + "***";
    }
    return userId.slice(0, 5) + "***";
  };

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}
      >
        {open && (
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h1 className="title">아이디 찾기</h1>
            <div className="input-container">
              <div className="textMessage">
                해당하는 아이디는 다음과 같습니다.
              </div>
              <InputBox className="readonly">
                <div className="inputBox">
                  <input type="text" value={changeUserId(userId)} readOnly/>
                </div>
              </InputBox>
            </div>
            <div className="margin-top50"/>
            <Button onClick={onClickFindPw}>비밀번호 찾기</Button>

            <div className="closeBtn" onClick={close}>
              <IoClose/>
            </div>
          </div>
        )}
      </div>
    </ModalStyle>
  );
};

// 비밀번호 찾기 모달
export const FindPwModal = (props) => {
  const {open, close, openResult, openFindUserId} = props;
  const [inputUserId, setInputUserId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [textMessage, setTextMessage] = useState("");

  const handleBackgroundClick = (e) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않게 설정
    handleCloseModal();
  };

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  // 비밀번호 찾기 기능
  const onClickFindPw = async () => {
    try {
      const response = await AxiosApi.memerFindPassword(
        inputUserId,
        inputEmail
      );
      if (response.data) {
        passwordChange(response.data);
      }
    } catch (error) {
      setTextMessage("해당 회원이 존재하지 않습니다.");
    }
  };

  // 유저 비밀번호 변경 -> 이메일 보내기
  const passwordChange = async (newPassword) => {
    // 탈퇴 확인
    const isActivate = await AxiosApi.isActivateByIdAndEmail(inputUserId, inputEmail);
    if (isActivate.data === "탈퇴한 회원입니다.") {
      setTextMessage("탈퇴한 회원입니다.");
      return;
    }
    // 찾기 기능
    const response = await AxiosApi.memberUpdatePassword(
      inputUserId,
      newPassword
    );
    if (response.data) {
      sendEmail(newPassword);
    } else {
      setTextMessage(
        "예기치 못한 오류가 발생했습니다. 관리자에게 문의해주세요."
      );
    }
  };

  // 이메일 보내기
  const sendEmail = (password) => {
    const templateParams = {
      to_email: inputEmail,
      from_name: "plan4land",
      message: `${password}`,
    };

    emailjs
      .send(
        "plan4land", // service id
        "template_59cggwi", // template id
        templateParams,
        "26R74sBvTB5bxhbNn" // public-key
      )
      .then((response) => {
        openResult(inputEmail);
        handleCloseModal();
      })
      .catch((error) => {
        setTextMessage("이메일 발송에 실패했습니다. 관리자에게 문의해주세요.");
      });
  };

  // 아이디 찾기로 이동
  const onClickFindUserId = () => {
    openFindUserId();
    handleCloseModal();
  };

  // 모달 닫기
  const handleCloseModal = () => {
    close();
    setInputUserId("");
    setInputEmail("");
  };

  // 엔터로 버튼 클릭
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClickFindPw();
    }
  };

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}
      >
        {open && (
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h1 className="title">비밀번호 찾기</h1>
            <div className="input-container">
              <div className="textMessage">{textMessage}</div>
              <InputBox>
                <div className="iconBox-left">
                  <VscAccount/>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    placeholder="아이디 입력"
                    value={inputUserId}
                    onChange={(e) => handleInputChange(e, setInputUserId)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </InputBox>
              <InputBox>
                <div className="iconBox-left">
                  <GoMail/>
                </div>
                <div className="inputBox">
                  <input
                    type="email"
                    placeholder="이메일 입력"
                    value={inputEmail}
                    onChange={(e) => handleInputChange(e, setInputEmail)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </InputBox>
            </div>
            <div className="margin-top50"/>
            <Button onClick={onClickFindPw}>비밀번호 찾기</Button>
            <p
              style={{
                fontSize: "12px",
                color: "red",
                margin: "20px 0 0 0",
              }}
            >
              아이디를 잊어버리셨나요?
            </p>
            <Button onClick={onClickFindUserId}>아이디 찾기</Button>
            <div className="closeBtn" onClick={handleCloseModal}>
              <IoClose/>
            </div>
          </div>
        )}
      </div>
    </ModalStyle>
  );
};

// 비밀번호 찾기 결과 모달
export const ResultPwModal = (props) => {
  const {open, close, email} = props;

  const handleBackgroundClick = (e) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않게 설정
    close();
  };

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}
      >
        {open && (
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h1 className="title">비밀번호 찾기</h1>
            <div className="input-container">
              <div className="textMessage">
                아래의 이메일로 임시 비밀번호가 발급되었습니다.
              </div>
              <InputBox className="readonly">
                <div className="inputBox">
                  <input type="email" value={email} readOnly/>
                </div>
              </InputBox>
            </div>
            <div className="margin-top50"/>
            <Button onClick={close}>로그인</Button>

            <div className="closeBtn" onClick={close}>
              <IoClose/>
            </div>
          </div>
        )}
      </div>
    </ModalStyle>
  );
};

export const BanModal = (props) => {
  const {open, close, id, banDays, banReason} = props;

  const handleBackgroundClick = (e) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않게 설정
    close();
  };

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}>

        {open && (
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <p> 정지된 계정입니다.</p>
            <p> 아이디 : {id}</p>
            <p> 정지 해제 일자 : {banDays}</p>
            <p> 정지 사유 : {banReason}</p>
          </div>
        )}

      </div>
    </ModalStyle>
  )

}