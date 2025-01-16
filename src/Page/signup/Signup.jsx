import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AxiosApi from "../../Api/AxiosApi";
import emailjs from "emailjs-com";

import { Header, Footer } from "../../Component/GlobalComponent";
import {
  Center,
  SignupContainer,
  InputBox,
  Button,
} from "../../Component/SignupComponents/SignupComponent";
import { ProfilePicModal } from "../../Component/PictureModalComponent";
import { CheckModal } from "../../Util/Modal";
import { EditImg } from "../../Component/ProfileImg";

// icon
import { VscAccount } from "react-icons/vsc";
import { GoMail, GoPencil, GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export const Signup = () => {
  // input
  const [inputUserId, setInputUserId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputEmail2, setInputEmail2] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPw2, setInputPw2] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [currentPic, setCurrentPic] = useState("profile-pic/profile.png");

  

  // message
  const [idMsg, setIdMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [email2Msg, setEmail2Msg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pw2Msg, setPw2Msg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("");

  // input ref
  const userIdRef = useRef(null);
  const emailRef = useRef(null);
  const email2Ref = useRef(null);
  const pwRef = useRef(null);
  const pw2Ref = useRef(null);
  const nameRef = useRef(null);
  const nickNameRef = useRef(null);

  // check
  const [idCheck, setIdCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [email2Check, setEmail2Check] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);

  // show
  const [isEmail2Show, setIsEmail2Show] = useState(true);
  const [isPwShow, setIsPwShow] = useState(false);

  // modal
  const [isPicsModalOpen, setIsPicsModalOpen] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [checkModalMessage, setCheckModalMessage] = useState("");

  // result
  const [emailResult, setEmailResult] = useState("");
  const [allSuccess, setAllSuccess] = useState(false);

  const navigate = useNavigate();

  // kakao
  const location = useLocation();
  const { kakao_id, sso } = location.state || {};
  const [kakaoId, setKakaoId] = useState(kakao_id || null);
  const [ssoState, setSsoState] = useState(sso || null);

  useEffect(() => {
    setKakaoId(kakao_id || null);
    setSsoState(sso || null);
  }, [kakao_id, sso]);

  // 아이디 유효성 검사
  const handleIdInput = (e) => {
    const input = e.target.value;
    setInputUserId(input);
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
  };
  useEffect(() => {
    setIdCheck(false);
  }, [inputUserId]);
  // 아이디 체크
  const handleIdCheck = async () => {
    // 유효성 검사 먼저 수행
    if (!handleIdInput({ target: { value: inputUserId } })) return;

    // 유효성 통과하면 중복 검사 수행
    const response = await AxiosApi.memberIdExists(inputUserId);
    if (response.data) {
      setIdMsg("중복된 아이디입니다.");
      setIdCheck(false);
    } else {
      setIdMsg("사용가능한 아이디입니다.");
      setIdCheck(true);
    }
  };

  // 이메일 유효성 검사
  const handleEmailInput = (e) => {
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
  };
  useEffect(() => {
    setEmailCheck(false);
    setEmail2Check(false);
    setIsEmail2Show(false);
  }, [inputEmail]);
  // 이메일 체크
  const handleEmailCheck = async () => {
    // 유효성 검사 먼저 수행
    if (!handleEmailInput({ target: { value: inputEmail } })) return;

    // 유효성 통과하면 중복 검사 수행
    const response = await AxiosApi.memberEmailExists(inputEmail);
    if (response.data) {
      setEmailMsg("중복된 이메일입니다.");
      return;
    }

    // 중복 검사 통과하면 이메일 인증
    const newCode = generateRandomCode();
    setEmailResult(newCode);

    // 메일 전송
    setTimeout(() => {
      const templateParams = {
        to_email: inputEmail,
        from_name: "plan4land",
        message: newCode,
      };
      emailjs
        .send(
          "plan4land", // service id
          "template_9hjizwi", // template id
          templateParams,
          "26R74sBvTB5bxhbNn" // public-key
        )
        .then((response) => {
          setEmailMsg("아래의 이메일로 인증번호가 전송되었습니다.");
          setEmailCheck(true);
          setEmail2Msg("");
          setInputEmail2("");
          setIsEmail2Show(true);
        })
        .catch((error) => {
          setEmailMsg(
            "이메일 전송에 오류가 발생했습니다. 관리자에게 문의해주세요."
          );
          setEmailCheck(false);
        });
    }, 0);
  };
  const generateRandomCode = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };
  // 이메일 인증
  const handleEmail2Check = () => {
    if (inputEmail2 === emailResult) {
      setEmail2Msg("인증번호가 일치합니다.");
      setEmail2Check(true);
    } else {
      setEmail2Msg("인증번호가 일치하지 않습니다.");
    }
  };

  // 비밀번호 유효성 검사
  const handlePwInput = (e) => {
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
  // 비밀번호2 유효성 검사
  const handlePw2Input = (e) => {
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
  };

  // 이름 유효성 검사
  const handleNameInput = (e) => {
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
  };

  // 닉네임 유효성 검사
  const handleNicknameInput = (e) => {
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
  };
  useEffect(() => {
    setNicknameCheck(false);
  }, [inputNickName]);
  // 닉네임 체크
  const handleNicknameCheck = async () => {
    // 유효성 검사 먼저 수행
    if (!handleNicknameInput({ target: { value: inputNickName } })) return;

    // 유효성 통과하면 중복 검사 수행
    const response = await AxiosApi.memberNicknameExists(inputNickName);
    if (response.data) {
      setNickNameMsg("중복된 이메일입니다.");
      setNicknameCheck(false);
    } else {
      setNickNameMsg("사용가능한 이메일입니다.");
      setNicknameCheck(true);
    }
  };

  // 회원가입 기능
  const onClickSignup = async () => {
    // 유효성 검사 한 번씩 실행
    const isIdValid = handleIdInput({ target: { value: inputUserId } });
    const isEmailValid = handleEmailInput({ target: { value: inputEmail } });
    const isPwValid = handlePwInput({ target: { value: inputPw } });
    const isPw2Valid = handlePw2Input({ target: { value: inputPw2 } });
    const isNameValid = handleNameInput({ target: { value: inputName } });
    const isNicknameValid = handleNicknameInput({
      target: { value: inputNickName },
    });

    // 유효성 검사 중 하나라도 실패하면 종료
    if (
      !isIdValid ||
      !isEmailValid ||
      !isPwValid ||
      !isPw2Valid ||
      !isNameValid ||
      !isNicknameValid
    ) {
      return;
    }

    // 중복검사
    if (!idCheck || !emailCheck || !nicknameCheck) {
      setCheckModalMessage("중복검사를 모두 완료해주세요.");
      setIsCheckModalOpen(true);
      return;
    }

    try {
      const response = await AxiosApi.signup(
        inputUserId,
        inputPw,
        inputName,
        inputNickName,
        inputEmail,
        currentPic,
        kakao_id || null,
        ssoState || null,
      );
      if (response.status === 201 || response.status === 200) {
        setCheckModalMessage("회원가입이 완료되었습니다.");
        setIsCheckModalOpen(true);
        setAllSuccess(true);
      }
    } catch (error) {
      setCheckModalMessage(
        "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."
      );
      setIsCheckModalOpen(true);
    }
  };

  const handlePicSelect = (picName) => {
    setCurrentPic(`profile-pic/${picName}`);
  };

  const closeCheckModal = () => {
    setIsCheckModalOpen(false);
    if (allSuccess) navigate("/login");
  };

  return (
    <>
      <Header />
      <Center>
        <SignupContainer>
          <h1 className="title">회원가입</h1>

          <div className="input-container">
            <div className="textMessage">{idMsg}</div>
            <div className="inputWrapper">
              <InputBox style={{ width: "360px" }}>
                <div className="iconBox-left">
                  <VscAccount />
                </div>
                <div className="inputBox">
                  <input
                    ref={userIdRef}
                    type="text"
                    placeholder="아이디 입력"
                    value={inputUserId}
                    onChange={(e) => handleIdInput(e)}
                  />
                </div>
              </InputBox>
              <button
                className="duplicateButton"
                onClick={handleIdCheck}
                disabled={idCheck}
              >
                중복확인
              </button>
            </div>
          </div>

          <div className="input-container">
            <div className="textMessage">{emailMsg}</div>
            <div className="inputWrapper">
              <InputBox style={{ width: "360px" }}>
                <div className="iconBox-left">
                  <GoMail />
                </div>
                <div className="inputBox">
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="이메일 입력"
                    value={inputEmail}
                    onChange={(e) => handleEmailInput(e)}
                  />
                </div>
              </InputBox>
              <button
                className="duplicateButton"
                onClick={handleEmailCheck}
                disabled={emailCheck}
              >
                인증
              </button>
            </div>
          </div>

          {isEmail2Show && (
            <div className="input-container">
              <div className="textMessage">{email2Msg}</div>
              <div className="inputWrapper">
                <InputBox style={{ width: "360px" }}>
                  <div className="iconBox-left">
                    <GoMail />
                  </div>
                  <div className="inputBox">
                    <input
                      ref={email2Ref}
                      type="text"
                      placeholder="이메일 인증번호"
                      value={inputEmail2}
                      onChange={(e) => setInputEmail2(e.target.value)}
                    />
                  </div>
                </InputBox>
                <button
                  className="duplicateButton"
                  onClick={handleEmail2Check}
                  disabled={email2Check}
                >
                  인증
                </button>
              </div>
            </div>
          )}

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
                  onChange={(e) => handlePwInput(e)}
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
                  onChange={(e) => handlePw2Input(e)}
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
                  onChange={(e) => handleNameInput(e)}
                />
              </div>
            </InputBox>
          </div>

          <div className="input-container">
            <div className="textMessage">{nickNameMsg}</div>
            <div className="inputWrapper">
              <InputBox style={{ width: "360px" }}>
                <div className="iconBox-left">
                  <GoPencil />
                </div>
                <div className="inputBox">
                  <input
                    ref={nickNameRef}
                    type="text"
                    placeholder="닉네임 입력"
                    value={inputNickName}
                    onChange={(e) => handleNicknameInput(e)}
                  />
                </div>
              </InputBox>
              <button
                className="duplicateButton"
                onClick={handleNicknameCheck}
                disabled={nicknameCheck}
              >
                중복확인
              </button>
            </div>
          </div>

          <div className="picture-box">
            <div
              className="current-pic"
              onClick={() => setIsPicsModalOpen(true)}
            >
              <img src={currentPic} alt="프로필 이미지" />
              <label htmlFor="profile-upload" className="upload-label">
                <FontAwesomeIcon icon={faCamera} />
              </label>
            </div>
          </div>

          {kakao_id && <input type="hidden" name="kakao_id" value={kakaoId} />}
          {sso && <input type="hidden" name="sso" value={ssoState} />}

          <Button onClick={onClickSignup}>회원가입</Button>
          <Button onClick={() => navigate("/login")}>취소</Button>

          {/* 프로필 사진 모달 */}
          <ProfilePicModal
            open={isPicsModalOpen}
            close={() => setIsPicsModalOpen(false)}
            onSelect={handlePicSelect}
            state="new"
            type="profile"
          />

          {/* 완료 모달 */}
          <CheckModal isOpen={isCheckModalOpen} onClose={closeCheckModal}>
            {checkModalMessage}
          </CheckModal>
        </SignupContainer>
      </Center>
      <Footer />
    </>
  );
};
export default Signup;
