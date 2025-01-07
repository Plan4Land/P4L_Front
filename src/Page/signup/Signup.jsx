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

// icon
import { VscAccount } from "react-icons/vsc";
import { GoMail, GoPencil, GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import AxiosApi from "../../Api/AxiosApi";
import AxiosInstance from "../../Api/AxiosInstance";

export const Signup = () => {
  // input
  const [inputUserId, setInputUserId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPwCheck, setInputPwCheck] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");

  // message
  const [idMsg, setIdMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwCheckMsg, setPwCheckMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("");

  // input ref
  const userIdRef = useRef(null);
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const pwCheckRef = useRef(null);
  const nameRef = useRef(null);
  const nickNameRef = useRef(null);

  const [isPwShow, setIsPwShow] = useState(false);
  const [currentPic, setCurrentPic] = useState("profile-pic/profile.png");
  const [isPicsModalOpen, setIsPicsModalOpen] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  // 비밀번호 보이기
  const onClickPwEye = () => {
    setIsPwShow((prev) => !prev);
  };

  // 회원가입 기능
  const onClickSignup = async () => {
    setIdMsg("");
    setEmailMsg("");
    setPwMsg("");
    setPwCheckMsg("");
    setNameMsg("");
    setNickNameMsg("");

    if (!inputUserId.trim()) {
      setIdMsg("아이디를 입력해주세요.");
      userIdRef.current.focus();
      return;
    } else if (inputUserId < 5) {
      setIdMsg("아이디는 5자리 이상이어야 합니다.");
      userIdRef.current.focus();
      return;
    }
    if (!inputEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail)) {
      setEmailMsg("올바른 이메일 형식을 입력해주세요.");
      emailRef.current.focus();
      return;
    }
    if (inputPw.length < 8) {
      setPwMsg("비밀번호는 8자리 이상이어야 합니다.");
      pwRef.current.focus();
      return;
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(inputPw)) {
      setPwMsg("비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.");
      pwRef.current.focus();
      return;
    }
    if (inputPw !== inputPwCheck) {
      setPwCheckMsg("비밀번호가 일치하지 않습니다.");
      pwCheckRef.current.focus();
      return;
    }
    if (!inputName.trim()) {
      setNameMsg("이름을 입력해주세요.");
      nameRef.current.focus();
      return;
    }
    if (!inputNickName.trim()) {
      setNickNameMsg("닉네임을 입력해주세요.");
      nickNameRef.current.focus();
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
                  onChange={(e) => handleInputChange(e, setInputUserId)}
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
                  onChange={(e) => handleInputChange(e, setInputEmail)}
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
                  onChange={(e) => handleInputChange(e, setInputPw)}
                />
                <div className="iconBox-right" onClick={onClickPwEye}>
                  {isPwShow ? <GoEye /> : <GoEyeClosed />}
                </div>
              </div>
            </InputBox>
          </div>

          <div className="input-container">
            <div className="textMessage">{pwCheckMsg}</div>
            <InputBox>
              <div className="iconBox-left">
                <GoLock />
              </div>
              <div className="inputBox">
                <input
                  ref={pwCheckRef}
                  type="password"
                  placeholder="비밀번호 확인"
                  value={inputPwCheck}
                  onChange={(e) => handleInputChange(e, setInputPwCheck)}
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
                  onChange={(e) => handleInputChange(e, setInputName)}
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
                  onChange={(e) => handleInputChange(e, setInputNickName)}
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
