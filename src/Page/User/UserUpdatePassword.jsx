import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import AxiosApi from "../../Api/AxiosApi";
// component
import {
  Center,
  Container,
  InputBox,
} from "../../Style/UserInfoEditStyle";
import { Button } from "../../Component/ButtonComponent";
import { CheckModal } from "../../Util/Modal";
// icon
import { IoIosArrowBack } from "react-icons/io";

const UserUpdatePassword = () => {
  const { user } = useAuth();
  const [userPw, setUserPw] = useState("");
  const userPwRef = useRef();
  const [userPwCheck, setUserPwCheck] = useState("");
  const userPwCheckRef = useRef();
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // 비밀번호 변경 기능 구현
  const handleSubmit = async () => {
    if (!userPw.trim()) {
      setMessage("비밀번호를 입력하세요.");
      userPwRef.current.focus();
      return;
    }
    if (userPw.length < 8) {
      setMessage("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(userPw)) {
      setMessage("비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }
    if (userPw !== userPwCheck) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 기능 구현
    try {
      const response = await AxiosApi.memberUpdatePassword(user.id, userPw);
      if(response.data) {
        setIsModalOpen(true);
        // navigate("/mypage");
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
  }

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
              type="password"
              value={userPw}
              onChange={(e) => {
                setUserPw(e.target.value);
                setMessage("");
              }}
            />
          </div>
        </InputBox>

        <div className="labelBox">
          <label htmlFor="userPwCheck">비밀번호 확인</label>
        </div>
        <InputBox>
          <div className="inputBox">
            <input
              ref={userPwCheckRef}
              id="userPwCheck"
              type="password"
              value={userPwCheck}
              onChange={(e) => {
                setUserPwCheck(e.target.value);
                setMessage("");
              }}
            />
          </div>
        </InputBox>

        <Button onClick={handleSubmit}>변경</Button>

        <CheckModal 
          isOpen={isModalOpen} 
          onClose={closeModal}
        >
          <p>비밀번호가 변경되었습니다.</p>
        </CheckModal>
        
        <button 
          className="back-button"
          onClick={handleBack}
        >
          <IoIosArrowBack />
        </button>
      </Container>
    </Center>
  );
};
export default UserUpdatePassword;
