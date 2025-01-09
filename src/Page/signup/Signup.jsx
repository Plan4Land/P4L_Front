import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header, Footer } from "../../Component/GlobalComponent";
import {
  Center,
  SignupContainer,
  InputBox,
  Button,
  Pic,
} from "../../Component/SignupComponent";
import { ProfilePicModal } from "../../Component/SignupModalComponent";
import AxiosApi from "../../Api/AxiosApi";

// icon
import { VscAccount } from "react-icons/vsc";
import { GoMail, GoPencil, GoLock, GoEye, GoEyeClosed } from "react-icons/go";


export const Signup = () => {
  // input
  const [inputUserId, setInputUserId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPw2, setInputPw2] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");

  // message
  const [idMsg, setIdMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pw2Msg, setPw2Msg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("");

  // input ref
  const userIdRef = useRef(null);
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const pw2Ref = useRef(null);
  const nameRef = useRef(null);
  const nickNameRef = useRef(null);

  const [isPwShow, setIsPwShow] = useState(false);
  const [currentPic, setCurrentPic] = useState("profile-pic/profile.png");
  const [isPicsModalOpen, setIsPicsModalOpen] = useState("");

  const navigate = useNavigate();

  // 아이디 체크
  const handleIdCheck = (e) => {
    const input = e.target.value;
    setInputUserId(e.target.value);
    if (!input.trim()) {
      setIdMsg("아이디를 입력해주세요.");
      userIdRef.current.focus();
      return false;
    } else if (input.length < 5) {
      setIdMsg("아이디는 5자리 이상이어야 합니다.");
      userIdRef.current.focus();
      return false;
    } else {
      setIdMsg("");
      return true;
    }
  }
  
  // 이메일 체크
  const handleEmailCheck = (e) => {
    const input = e.target.value;
    setInputEmail(input);
    if (!input.trim()) {
      setEmailMsg("이메일을 입력해주세요.");
      emailRef.current.focus();
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
      setEmailMsg("올바른 이메일 형식을 입력해주세요.");
      emailRef.current.focus();
      return false;
    } else {
      setEmailMsg("");
      return true;
    }
  }

  // 비밀번호 체크
  const handlePwCheck = (e) => {
    const input = e.target.value;
    setInputPw(input);
    if (input.length < 8) {
      setPwMsg("비밀번호는 8자리 이상이어야 합니다.");
      pwRef.current.focus();
      return false;
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(input)) {
      setPwMsg("비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.");
      pwRef.current.focus();
      return false;
    } else {
      setPwMsg("");
      return true;
    }
  };
  // 비밀번호 보이기
  const onClickPwEye = () => {
    setIsPwShow((prev) => !prev);
  };
  // 비밀번호 확인 체크
  const handlePw2Check = (e) => {
    const input = e.target.value;
    setInputPw2(input);
    if (inputPw !== input) {
      setPw2Msg("비밀번호가 일치하지 않습니다.");
      pw2Ref.current.focus();
      return false;
    } else {
      setPw2Msg("");
      return true;
    }
  }
  
  // 이름 체크
  const handleNameCheck = (e) => {
    const input = e.target.value;
    setInputName(input);
    if (!input.trim()) {
      setNameMsg("이름을 입력해주세요.");
      nameRef.current.focus();
      return false;
    } else {
      setNameMsg("");
      return true;
    }
  }

  // 닉네임 체크
  const handleNicknameCheck = (e) => {
    const input = e.target.value;
    setInputNickName(input);
    if (!input.trim()) {
      setNickNameMsg("닉네임을 입력해주세요.");
      nickNameRef.current.focus();
      return false;
    } else {
      setNickNameMsg("");
      return true;
    }
  }


  // 회원가입 기능
  const onClickSignup = async () => {
    // 체크 함수 한 번씩 실행
    const isIdValid = handleIdCheck({ target: { value: inputUserId } });
    const isEmailValid = handleEmailCheck({ target: { value: inputEmail } });
    const isPwValid = handlePwCheck({ target: { value: inputPw } });
    const isPw2Valid = handlePw2Check({ target: { value: inputPw2 } });
    const isNameValid = handleNameCheck({ target: { value: inputName } });
    const isNicknameValid = handleNicknameCheck({ target: { value: inputNickName } });
    // 하나라도 유효하지 않으면 메시지 표시 후 종료
    if(!isIdValid || !isEmailValid || !isPwValid || !isPw2Valid || !isNameValid || !isNicknameValid){
      return;
    }

    try {
      const response = await AxiosApi.signup(inputUserId, inputPw, inputName, inputNickName, inputEmail, currentPic);
      if (response.status === 201 
          || response.status === 200) {
        alert("회원가입이 성공적으로 완료되었습니다.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup: ", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handlePicSelect = (picName) => {
    setCurrentPic(`profile-pic/${picName}`);
  };

  return (
    <>
      <Header />
      <Center>
        <SignupContainer>
          <h1 className="title">회원가입</h1>

          <div className="input-container">
            <div className="textMessage">{idMsg}</div>
            <InputBox>
              <div className="iconBox-left">
                <VscAccount />
              </div>
              <div className="inputBox">
                <input
                  ref={userIdRef}
                  type="text"
                  placeholder="아이디 입력"
                  value={inputUserId}
                  onChange={(e) => handleIdCheck(e)}
                />
              </div>
            </InputBox>
          </div>

          <div className="input-container">
            <div className="textMessage">{emailMsg}</div>
            <InputBox>
              <div className="iconBox-left">
                <GoMail />
              </div>
              <div className="inputBox">
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="이메일 입력"
                  value={inputEmail}
                  onChange={(e) => handleEmailCheck(e)}
                />
              </div>
            </InputBox>
          </div>

          <div className="input-container">
            <div className="textMessage">{pwMsg}</div>
            <InputBox>
              <div className="iconBox-left">
                <GoLock />
              </div>
              <div className="inputBox">
                <input
                  ref={pwRef}
                  type={isPwShow ? "text" : "password"}
                  placeholder="비밀번호 입력"
                  value={inputPw}
                  onChange={(e) => handlePwCheck(e)}
                />
                <div className="iconBox-right" onClick={onClickPwEye}>
                  {isPwShow ? <GoEye /> : <GoEyeClosed />}
                </div>
              </div>
            </InputBox>
          </div>

          <div className="input-container">
            <div className="textMessage">{pw2Msg}</div>
            <InputBox>
              <div className="iconBox-left">
                <GoLock />
              </div>
              <div className="inputBox">
                <input
                  ref={pw2Ref}
                  type="password"
                  placeholder="비밀번호 확인"
                  value={inputPw2}
                  onChange={(e) => handlePw2Check(e)}
                />
              </div>
            </InputBox>
          </div>

          <div className="input-container">
            <div className="textMessage">{nameMsg}</div>
            <InputBox>
              <div className="iconBox-left">
                <GoPencil />
              </div>
              <div className="inputBox">
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="이름 입력"
                  value={inputName}
                  onChange={(e) => handleNameCheck(e)}
                />
              </div>
            </InputBox>
          </div>

          <div className="input-container">
            <div className="textMessage">{nickNameMsg}</div>
            <InputBox>
              <div className="iconBox-left">
                <GoPencil />
              </div>
              <div className="inputBox">
                <input
                  ref={nickNameRef}
                  type="text"
                  placeholder="닉네임 입력"
                  value={inputNickName}
                  onChange={(e) => handleNicknameCheck(e)}
                />
              </div>
            </InputBox>
          </div>

          <div className="picture-box">
            <div className="current-pic" onClick={() => setIsPicsModalOpen(true)}>
              <img src={currentPic} alt="프로필 이미지" />
            </div>
            <button
              className="picture-button"
              onClick={() => setIsPicsModalOpen(true)}
            >
              변경
            </button>
          </div>

          <Button onClick={onClickSignup}>회원가입</Button>
          <Button onClick={() => navigate("/login")}>취소</Button>

          {/* 프로필 사진 모달 */}
          <ProfilePicModal
            open={isPicsModalOpen}
            close={() => setIsPicsModalOpen(false)}
            onSelect={handlePicSelect}
            type="new"
          />
        </SignupContainer>
      </Center>
      <Footer />
    </>
  );
};
export default Signup;
