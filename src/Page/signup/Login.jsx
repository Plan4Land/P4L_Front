import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header, Footer } from "../../Component/GlobalComponent";
import { Center, SignupContainer, InputBox, Button, FindEmailModal, ResultEmailModal, FindPwModal, ResultPwModal } from "../../Component/SignupComponent";

// icon
import { GoMail, GoLock, GoEye, GoEyeClosed } from "react-icons/go";

export const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [isPwShow, setIsPwShow] = useState(false);

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailResultModalOpen, setEmailResultModalOpen] = useState(false);
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [pwResultModalOpen, setPwResultModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  }

  const onClickLogin = async () => {
    // 로그인 기능 구현해야함
  }

  const openEmailModal = (state) => {
    setEmailModalOpen(state);
  }
  const openPwModal = (state) => {
    setPwModalOpen(state);
  }

  return (
    <>
      <Header />
      <Center>
        <SignupContainer>
          <h1 className="title">로그인</h1>
          
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

          <InputBox>
            <div className="iconBox-left"><GoLock /></div>
            <div className="inputBox">
              <input
                type={isPwShow ? "text" : "password"} 
                placeholder="비밀번호 입력"
                value={inputPw}
                onChange={(e) => handleInputChange(e, setInputPw)}
              />
              <div className="iconBox-right">
                {isPwShow ? <GoEye /> : <GoEyeClosed />}
              </div>
            </div>
          </InputBox>

          <div className="linkBox">
            <div className="linkBox-left">
              <p onClick={()=>openEmailModal(true)}>아이디 찾기</p>
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <p onClick={()=>openPwModal(true)}>비밀번호 찾기</p>
            </div>
            <div className="linkBox-right">
              <p onClick={()=>navigate("/signup")}>회원가입</p>
            </div>
          </div>

          <Button onClick={()=>onClickLogin}>
            로그인
          </Button>

          <button className="kakaoBtn">카카오 로그인</button>

          {/* 아이디 찾기 모달 */}
          <FindEmailModal>

          </FindEmailModal>

          {/* 아이디 찾기 결과 모달 */}
          <ResultEmailModal>
            
          </ResultEmailModal>
          
          {/* 비밀번호 찾기 모달 */}
          <FindPwModal>

          </FindPwModal>

          {/* 비밀번호 찾기 결과 모달 */}
          <ResultPwModal>

          </ResultPwModal>

        </SignupContainer>
      </Center>
      <Footer />
    </>
  );
};
export default Login;