import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import AxiosApi from "../../Api/AxiosApi";
// component
import { Center, Container, InputBox } from "../../Style/UserInfoEditStyle";
import { Button } from "../../Component/ButtonComponent";
import { CheckModal } from "../../Util/Modal";
// icon
import { IoIosArrowBack } from "react-icons/io";
import { GoEye, GoEyeClosed } from "react-icons/go";

const UserUpdatePassword = () => {
  const { user } = useAuth();
  const userPwRef = useRef();
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState(true);
  const userPw2Ref = useRef();
  const [userPw2, setUserPw2] = useState("");
  const [userPwCheck2, setUserPwCheck2] = useState(true);

  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");

  const [isPwShow, setIsPwShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // 비밀번호 보이기
  const onClickPwEye = () => {
    setIsPwShow((prev) => !prev);
  };

  // 비밀번호 유효성 체크
  const handlePassword = (e) => {
    const input = e.target.value;
    setUserPw(input);
    if (!input.trim()) {
      setMessage("비밀번호를 입력하세요.");
      setUserPwCheck(false);
    } else if (input.length < 8) {
      setMessage("비밀번호는 8자 이상이어야 합니다.");
      setUserPwCheck(false);
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(input)) {
      setMessage("비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.");
      setUserPwCheck(false);
    } else {
      setMessage("");
      setUserPwCheck(true);
    }
  };

  // 비밀번호 확인 유효성 체크
  const handlePassword2 = (e) => {
    const input = e.target.value;
    setUserPw2(input);
    if (userPw !== input) {
      setMessage2("비밀번호가 일치하지 않습니다.");
      setUserPwCheck2(false);
    } else {
      setMessage2("");
      setUserPwCheck2(true);
    }
  };

  // 비밀번호 변경 기능 구현
  const handleSubmit = async () => {
    if (!userPwCheck || !userPwCheck2) {
      return;
    }

    // 기능 구현
    try {
      const response = await AxiosApi.memberUpdatePassword(user.id, userPw);
      if (response.data) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error during update password: ", error);
      setMessage("비밀번호 변경 도중 오류가 발생했습니다.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/mypage");
  };

  const handleBack = () => {
    window.location.reload();
  };

  return (
    <Center>
      <Container>
        <h2 className="title">비밀번호 변경</h2>

        <div className="labelBox">
          <label htmlFor="userPw">비밀번호</label>
          <p className="message">{message}</p>
        </div>
        <InputBox>
          <div className="inputBox">
            <input
              ref={userPwRef}
              id="userPw"
              type={isPwShow ? "text" : "password"}
              value={userPw}
              onChange={(e) => handlePassword(e)}
            />
            <div className="iconBox-right" onClick={onClickPwEye}>
              {isPwShow ? <GoEye /> : <GoEyeClosed />}
            </div>
          </div>
        </InputBox>

        <div className="labelBox">
          <label htmlFor="userPwCheck">비밀번호 확인</label>
          <p className="message">{message2}</p>
        </div>
        <InputBox>
          <div className="inputBox">
            <input
              ref={userPw2Ref}
              id="userPwCheck"
              type="password"
              value={userPw2}
              onChange={(e) => handlePassword2(e)}
            />
          </div>
        </InputBox>

        <Button onClick={handleSubmit}>변경</Button>

        <CheckModal isOpen={isModalOpen} onClose={closeModal}>
          <p>비밀번호가 변경되었습니다.</p>
        </CheckModal>

        <button className="back-button" onClick={handleBack}>
          <IoIosArrowBack />
        </button>
      </Container>
    </Center>
  );
};
export default UserUpdatePassword;
