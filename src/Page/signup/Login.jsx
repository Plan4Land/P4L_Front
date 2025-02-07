import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../Api/AxiosApi";

// context
import { useAuth } from "../../Context/AuthContext";

// component
import Common from "../../Util/Common";
import { Header, Footer } from "../../Component/GlobalComponent";
import {
  Center,
  SignupContainer,
  InputBox,
} from "../../Component/SignupComponents/SignupComponent";
import { Button } from "../../Component/ButtonComponent";
import {
  FindUserIdModal,
  ResultUserIdModal,
  FindPwModal,
  ResultPwModal,
  BanModal,
} from "../../Component/SignupComponents/SignupModalComponent";
import { CloseModal } from "../../Util/Modal";

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
  const [banModalOpen, setBanModalOpen] = useState(false);

  const [findIdResult, setFindIdResult] = useState("");
  const [findPwResult, setFindPwResult] = useState("");
  const [banData, setBanData] = useState({});
  const [banUserId, setBanUserId] = useState();

  const navigate = useNavigate(); 

  const { login } = useAuth();

  const location = useLocation();
  const { userState } = location.state || {};
  useEffect(() => {
    setBanUserId(userState || null);
    if(banUserId) {
      openBanModal(banUserId);
    };
    }, [userState]);

    const openBanModal = async (banUserId) => {
      const data = await AxiosApi.banData(banUserId);
      console.log(data);
      setBanData(data);
      setBanModalOpen(true);
    };

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  // 일반 로그인
  const onClickLogin = async () => {
    setTextMessage("");
    if (!inputUserId.trim()) {
      setTextMessage("아이디를 입력해주세요.");
      userIdRef.current.focus();
      return;
    }
    if (!inputPw.trim()) {
      setTextMessage("비밀번호를 입력해주세요.");
      pwRef.current.focus();
      return;
    }

    try {
      const response = await AxiosApi.login(inputUserId, inputPw);
      if (
        response.data.grantType === "Bearer" &&
        (response.status === 201 || response.status === 200)
      ) {
        Common.setAccessToken(response.data.accessToken);
        Common.setAccessTokenExpiresIn(response.data.accessTokenExpiresIn);
        Common.setRefreshToken(response.data.refreshToken);
        Common.setRefreshTokenExpiresIn(response.data.refreshTokenExpiresIn);

        const userData = await AxiosApi.memberInfo(inputUserId);
        login(userData);
        navigate("/");
      } else {
        setTextMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      if (error.response) {
        console.log("로그 : ", error.response.data);
        if (error.response.data === "탈퇴한 회원입니다.") {
          setTextMessage("탈퇴한 회원입니다.");
        } else if (error.response.data === "정지된 회원입니다.") {
          const data = await AxiosApi.banData(inputUserId);
          console.log(data);
          setBanData(data);
          setBanModalOpen(true);
        } else {
          setTextMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      } else {
        setTextMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  // 카카오 로그인
  const kakaoLogin = () => {
    const kakao_api_key = process.env.REACT_APP_KAKAO_API_KEY;
    const kakao_redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    // oauth 요청 url
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_api_key}&redirect_uri=${kakao_redirect_uri}&response_type=code`;
    window.location.href = kakaoURL;
  };

  // 구글 로그인
  const googleLogin = () => {
    const google_api_key = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const google_redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_api_key}&redirect_uri=${google_redirect_uri}&response_type=code&scope=email+profile`;
    window.location.href = googleURL;
  };

  // 네이버 로그인
  const naverLogin = () => {
    const naver_api_key = process.env.REACT_APP_NAVER_CLIENT_ID;
    const naver_redirect_uri = process.env.REACT_APP_NAVER_REDIRECT_URI;
    const state = Math.random().toString(36).substr(2, 15);
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_api_key}&redirect_uri=${naver_redirect_uri}&state=${state}`;
    window.location.href = naverURL;
  };

  // 비밀번호 보이기
  const onClickPwEye = () => {
    setIsPwShow((prev) => !prev);
  };

  // 엔터키로 로그인
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  // 모달 열고 닫기
  const openModal = (modal, state) => {
    modal(state);
  };

  // 아이디 찾기 결과 모달
  const handleFindIdResultModal = (data) => {
    setFindIdResult(data);
    setFindIdResultModalOpen(true);
  };

  // 비밀번호 찾기 결과 모달
  const handleFindPwResultModal = (data) => {
    setFindPwResult(data);
    setPwResultModalOpen(true);
  };

  return (
    <>
      {/* <Header /> */}
      <Center>
        <SignupContainer>
          <h1 className="title">로그인</h1>
          <div className="input-container">
            <div className="textMessage">{textMessage}</div>
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
                  onKeyDown={handleEnterKey}
                />
                <div className="iconBox-right" onClick={onClickPwEye}>
                  {isPwShow ? <GoEye /> : <GoEyeClosed />}
                </div>
              </div>
            </InputBox>
          </div>
          <div className="linkBox">
            <div className="linkBox-left">
              <p onClick={() => openModal(setFindIdModalOpen, true)}>
                아이디 찾기
              </p>
              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <p onClick={() => openModal(setPwModalOpen, true)}>
                비밀번호 찾기
              </p>
            </div>
            <div className="linkBox-right">
              <p onClick={() => navigate("/signup/terms")}>회원가입</p>
            </div>
          </div>

          <div className="login-social-box">
            <button className="login-icon kakao" onClick={kakaoLogin}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="0 0 512 512"
                version="1.1"
              >
                <path
                  fill="#000000"
                  d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"
                />
              </svg>
            </button>
            <button className="login-icon google" onClick={googleLogin}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>
            <button className="login-icon naver" onClick={naverLogin}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="0 0 512 512"
                version="1.1"
              >
                <path
                  fill="#fff"
                  d="M9 32V480H181.366V255.862L331.358 480H504V32H331.358V255.862L181.366 32H9Z"
                />
              </svg>
            </button>
          </div>

          <Button onClick={onClickLogin}>로그인</Button>
          <div style={{ margin: "30px" }} />

          {/* 아이디 찾기 모달 */}
          <FindUserIdModal
            open={findIdModalOpen}
            close={() => openModal(setFindIdModalOpen, false)}
            openResult={handleFindIdResultModal}
          />

          {/* 아이디 찾기 결과 모달 */}
          <ResultUserIdModal
            open={findIdResultModalOpen}
            close={() => openModal(setFindIdResultModalOpen, false)}
            userId={findIdResult}
            openFindPw={() => openModal(setPwModalOpen, true)}
          />

          {/* 비밀번호 찾기 모달 */}
          <FindPwModal
            open={pwModalOpen}
            close={() => openModal(setPwModalOpen, false)}
            openResult={handleFindPwResultModal}
            openFindUserId={() => openModal(setFindIdModalOpen, true)}
          />

          {/* 비밀번호 찾기 결과 모달 */}
          <ResultPwModal
            open={pwResultModalOpen}
            close={() => openModal(setPwResultModalOpen, false)}
            email={findPwResult}
          />

          <CloseModal
            isOpen={banModalOpen}
            onClose={() => openModal(setBanModalOpen, false)}
          >
            <div className="banModal">
              <p className="info">
                해당 계정은 관리자로 인해 정지된 계정입니다.
              </p>
              <div className="banInfo">
                <p className="explain">
                  <strong>아이디:</strong> {banData?.userId}
                </p>
                <p className="explain">
                  <strong>정지 해제 일자:</strong> {banData?.endDate}
                </p>
                <p className="explain">
                  <strong>정지 사유:</strong> {banData?.reason}
                </p>
              </div>
            </div>
          </CloseModal>
        </SignupContainer>
      </Center>
      {/* <Footer /> */}
    </>
  );
};
export default Login;
