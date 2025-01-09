import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import AxiosApi from "../../Api/AxiosApi";

import { Center, Container, InputBox, Button } from "../../Style/UserInfoEditStyle";

import UserInfoEdit from "./UserInfoEdit";
import UserUpdatePassword from "./UserUpdatePassword";
import UserDelete from "./UserDelete";

const UserInfoValidate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // URL에서 menu 값을 가져옴
  const menuFromUrl = queryParams.get("menu");
  const [passValidate, setPassValidate] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(menuFromUrl || "");

  const { user } = useAuth();
  const [userPw, setUserPw] = useState("");
  const [message, setMessage] = useState("");
  

  // 엔터키로 다음
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
  
    try {
      const response = await AxiosApi.memberValidate(user.id, userPw);
      if (response.data) {
        setPassValidate(true);
      }
    } catch (error) {
      console.error("Error during validate: ", error);
      setMessage("비밀번호가 같지 않습니다.")
    }
  };

  return (
    <>
      {/* 비밀번호 체크 */}
      {!passValidate && (
        <Center>
          <Container>
            <h2 className="title">내 정보 수정</h2>

            <div className="labelBox">
              <label htmlFor="userPw">비밀번호</label>
              <p className="message">{message}</p>
            </div>
            <InputBox>
              <div className="inputBox">
                <input
                  id="userPw"
                  type="password"
                  value={userPw}
                  onChange={(e) => {
                    setUserPw(e.target.value);
                    setMessage("");
                  }}
                  onKeyDown={handleEnterKey}
                />
              </div>
            </InputBox>

            <Button onClick={handleSubmit}>다음</Button>
          </Container>
        </Center>
      )}
      {/* 메뉴 선택 */}
      {passValidate && !selectedMenu && (
        <Center>
          <Container>
          <h2 className="title">내 정보 수정</h2>

          <Button 
            onClick={()=>setSelectedMenu("회원정보 수정")}
          >
            회원정보 수정
          </Button>

          <Button 
            onClick={()=>setSelectedMenu("비밀번호 변경")}
          >
            비밀번호 변경
          </Button>

          <Button 
            className="red"
            onClick={()=>setSelectedMenu("회원 탈퇴")}
          >
            회원 탈퇴
          </Button>

          
          </Container>
        </Center>
      )}
      {selectedMenu === "회원정보 수정" && <UserInfoEdit />}
      {selectedMenu === "비밀번호 변경" && <UserUpdatePassword />}
      {selectedMenu === "회원 탈퇴" && <UserDelete />}
    </>
  );
};

export default UserInfoValidate;