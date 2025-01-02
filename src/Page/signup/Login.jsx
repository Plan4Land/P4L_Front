import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignupContainer, InputBox, Button, FindEmailModal, ResultEmailModal, FindPwModal, ResultPwModal } from "../../Component/SignupComponent";

const Login = () => {
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
    <SignupContainer>
      <h1 className="title">로그인</h1>
      
      <InputBox>
        <div>아이콘</div>
        <input
          type="email" 
          placeholder="이메일 입력"
          value={inputEmail}
          onChange={(e) => handleInputChange(e, setInputEmail)}
        />
      </InputBox>

      <InputBox>
        <div>아이콘</div>
        <input
          type={isPwShow ? "text" : "password"} 
          placeholder="비밀번호 입력"
          value={inputPw}
          onChange={(e) => handleInputChange(e, setInputPw)}
        />
        <div>{isPwShow ? "아이콘1" : "아이콘2"}</div>
      </InputBox>

      <div>
        <div>
          <p onClick={()=>openEmailModal(true)}>아이디 찾기</p>
          <p>|</p>
          <p onClick={()=>openPwModal(true)}>비밀번호 찾기</p>
        </div>
        <div>
          <p onClick={()=>navigate("/signup")}>회원가입</p>
        </div>
      </div>

      <Button onClick={()=>onClickLogin}>
        로그인
      </Button>

      <button>카카오 로그인</button>

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
  );
};
export default Login;