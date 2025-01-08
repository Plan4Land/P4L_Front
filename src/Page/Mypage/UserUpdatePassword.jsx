import React, { useState, useEffect } from "react";
import { useRef } from "react";
import {
  Center,
  Container,
  InputBox,
  Button,
} from "../../Style/UserInfoEditStyle";
import AxiosApi from "../../Api/AxiosApi";

const UserUpdatePassword = () => {
  const [userPw, setUserPw] = useState("");
  const userPwRef = useRef();
  const [userPwCheck, setUserPwCheck] = useState("");
  const userPwCheckRef = useRef();
  const [message, setMessage] = useState("");

  const [isPwSame, setIsPwSame] = useState("");

  // 비밀번호 같은지 확인
  const handlePwCheck = (e) => {
    setUserPwCheck(e.target.value);
    userPw === userPwCheck ? setIsPwSame(true) : setIsPwSame(false);
  };

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
    } catch (error) {
      console.error("Error during update password: ", error);
      setMessage("비밀번호 변경 도중 오류가 발생했습니다.");
    }
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
              onChange={handlePwCheck}
            />
          </div>
        </InputBox>

        <Button onClick={handleSubmit}>변경</Button>
      </Container>
    </Center>
  );
};
export default UserUpdatePassword;
