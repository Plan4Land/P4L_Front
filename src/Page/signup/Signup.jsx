import { useState } from "react";
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

export const Signup = () => {
  // input
  const [inputUserId, setInputUserId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPwCheck, setInputPwCheck] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  // message
  const [idMsg, setIdMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwCheckMsg, setPwCheckMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");

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

  const onClickSignup = () => {};

  const openPicsModal = (state) => {
    setIsPicsModalOpen(state);
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
                  type="text"
                  placeholder="닉네임 입력"
                  value={inputNickName}
                  onChange={(e) => handleInputChange(e, setInputNickName)}
                />
              </div>
            </InputBox>
          </div>

          <div className="picture-box">
            <div className="current-pic" onClick={() => openPicsModal(true)}>
              <img src={currentPic} alt="프로필 이미지" />
            </div>
            <button
              className="picture-button"
              onClick={() => openPicsModal(true)}
            >
              변경
            </button>
          </div>

          <Button onClick={() => onClickSignup}>회원가입</Button>
          <Button onClick={() => navigate("/login")}>취소</Button>

          {/* 프로필 사진 모달 */}
          <ProfilePicModal
            open={isPicsModalOpen}
            close={() => openPicsModal(false)}
            onSelect={handlePicSelect}
          />
        </SignupContainer>
      </Center>
      <Footer />
    </>
  );
};
export default Signup;
