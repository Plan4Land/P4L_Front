import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../Api/AxiosApi";

// context
import { useAuth } from "../../Context/AuthContext";

// component
import Common from "../../Util/Common";
import { Header, Footer } from "../../Component/GlobalComponent";
import { Center, SignupContainer, InputBox } from "../../Component/SignupComponents/SignupComponent";
import { Button } from "../../Component/ButtonComponent";
import { FindUserIdModal, ResultUserIdModal, FindPwModal, ResultPwModal } from "../../Component/SignupComponents/SignupModalComponent";

// icon
import { GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";

export const Login = () => {
  const [inputUserId, setInputUserId] = useState("");
  const userIdRef = useRef(null);
  const [inputPw, setInputPw] = useState("");
  const pwRef = useRef(null);
  const [textMessage, setTextMessage] = useState("");
  const [isPwShow, setIsPwShow] = useState(false);

  const [findIdModalOpen, setFindIdModalOpen] = useState(false);
  const [findIdResultModalOpen, setFindIdResultModalOpen] = useState(false);
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [pwResultModalOpen, setPwResultModalOpen] = useState(false);

  const [findIdResult, setFindIdResult] = useState("");
  const [findPwResult, setFindPwResult] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  // 로그인 기능
  const onClickLogin = async () => {
    setTextMessage("");
    if(!inputUserId.trim()) {
      setTextMessage("아이디를 입력해주세요.");
      userIdRef.current.focus();
      return;
    }
    if(!inputPw.trim()) {
      setTextMessage("비밀번호를 입력해주세요.");
      pwRef.current.focus();
      return;
    }
    
    try {
      const response = await AxiosApi.login(inputUserId, inputPw);
      if (response.data.grantType === "Bearer"
         && (response.status === 201 
          || response.status === 200)
      ) {
        Common.setAccessToken(response.data.accessToken);
        Common.setRefreshToken(response.data.refreshToken);

        const userData = await AxiosApi.memberInfo(inputUserId);
        login(userData);
        navigate("/");
      } else {
        setTextMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      if(error.response && error.response.data.message === "탈퇴한 회원입니다.") {
        setTextMessage("탈퇴한 회원입니다.");
      } else {
        setTextMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  // 카카오 로그인
  const Rest_api_key = process.env.REACT_APP_KAKAO_API_KEY;
  const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  // oauth 요청 url
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const kakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  // 비밀번호 보이기
  const onClickPwEye = () => {
    setIsPwShow((prev) => !prev);
  };

  // 엔터키로 로그인
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      onClickLogin();
    }
  }

  // 모달 열고 닫기
  const openModal = (modal, state) => {
    modal(state);
  }

  // 아이디 찾기 결과 모달
  const handleFindIdResultModal = (data) => {
    setFindIdResult(data);
    setFindIdResultModalOpen(true);
  }

  // 비밀번호 찾기 결과 모달
  const handleFindPwResultModal = (data) => {
    setFindPwResult(data);
    setPwResultModalOpen(true);
  }

  return (
    <>
      <Header />
      <Center>
        <SignupContainer>
          <h1 className="title">로그인</h1>
          <div className="input-container">
            <div className="textMessage">{textMessage}</div>
            <InputBox>
            <div className="iconBox-left"><VscAccount /></div>
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

            <InputBox>
              <div className="iconBox-left"><GoLock /></div>
              <div className="inputBox">
                <input
                  ref={pwRef}
                  type={isPwShow ? "text" : "password"} 
                  placeholder="비밀번호 입력"
                  value={inputPw}
                  onChange={(e) => handleInputChange(e, setInputPw)}
                  onKeyDown={handleEnterKey}
                />
                <div
                  className="iconBox-right"
                  onClick={onClickPwEye}
                >
                  {isPwShow ? <GoEye /> : <GoEyeClosed />}
                </div>
              </div>
            </InputBox>
          </div>

          <div className="linkBox">
            <div className="linkBox-left">
              <p onClick={()=>openModal(setFindIdModalOpen, true)}>아이디 찾기</p>
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <p onClick={()=>openModal(setPwModalOpen, true)}>비밀번호 찾기</p>
            </div>
            <div className="linkBox-right">
              <p onClick={()=>navigate("/signup/terms")}>회원가입</p>
            </div>
          </div>

          <Button onClick={onClickLogin}>
            로그인
          </Button>
          <div style={{margin: "15px"}} />
          <Button 
            onClick={kakaoLogin}
            bgcolor={"rgb(255, 255, 0)"}
            hoverBgColor={"rgb(240, 240, 0)"}
            border={"1px solid rgb(240, 240, 0)"}
          >
            <span style={{color: "rgb(0,0,0)"}}>카카오 로그인</span>
          </Button>

          {/* 아이디 찾기 모달 */}
          <FindUserIdModal
            open={findIdModalOpen}
            close={()=>openModal(setFindIdModalOpen, false)}
            openResult={handleFindIdResultModal}
          />

          {/* 아이디 찾기 결과 모달 */}
          <ResultUserIdModal
            open={findIdResultModalOpen}
            close={()=>openModal(setFindIdResultModalOpen, false)}
            userId={findIdResult}
            openFindPw={()=>openModal(setPwModalOpen, true)}
          />
          
          {/* 비밀번호 찾기 모달 */}
          <FindPwModal
            open={pwModalOpen}
            close={()=>openModal(setPwModalOpen, false)}
            openResult={handleFindPwResultModal}
            openFindUserId={()=>openModal(setFindIdModalOpen, true)}
          />

          {/* 비밀번호 찾기 결과 모달 */}
          <ResultPwModal
            open={pwResultModalOpen}
            close={()=>openModal(setPwResultModalOpen, false)}
            email={findPwResult}
          />

        </SignupContainer>
      </Center>
      <Footer />
    </>
  );
};
export default Login;