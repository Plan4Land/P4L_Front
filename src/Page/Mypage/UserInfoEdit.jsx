import React, { useState } from "react";
import { Center, Container, InputBox, Button } from "../../Style/UserInfoEditStyle";
import { ProfilePicModal } from "../../Component/SignupModalComponent";

const UserInfoEdit = () => {
  const [userId, setUserId] = useState("test1");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [name, setName] = useState("홍길동");
  const [nickName, setNickName] = useState("길동이");
  const [email, setEmail] = useState("hong@example.com");

  const [currentPic, setCurrentPic] = useState("profile-pic/profile.png");
  const [isPicsModalOpen, setIsPicsModalOpen] = useState("");

  const handleSave = () => {
    alert(`저장되었습니다: \n이름: ${name}\n이메일: ${email}`);
  };



  const handlePwCheck = (e) => {
    setUserPwCheck(e.target.value);
    userPw === userPwCheck ? setIsPwCheck(true) : setIsPwCheck(false);
  }

  const handlePicSelect = (picName) => {
    setCurrentPic(`profile-pic/${picName}`);
  };
  const handlePicAdd = (picture) => {
    // 사진 추가하는 기능 구현하기.
    setCurrentPic(URL.createObjectURL(picture));
    console.log(picture);
  }

  return (
    <Center>
      <Container>
        <h2 className="title">내 정보 수정</h2>

        <label htmlFor="userId">아이디</label>
        <InputBox>
          <div className="inputBox">
            <input
              id="userId"
              type="text"
              value={userId}
              readOnly
            />
          </div>
        </InputBox>

        <label htmlFor="userPw">비밀번호</label>
        <InputBox>
          <div className="inputBox">
            <input
              id="userPw"
              type="password"
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
            />
          </div>
        </InputBox>

        <label htmlFor="userPwCheck">비밀번호 확인</label>
        <InputBox>
          <div className="inputBox">
            <input
              id="userPwCheck"
              type="password"
              value={userPwCheck}
              onChange={handlePwCheck}
            />
          </div>
        </InputBox>

        <label htmlFor="name">이름</label>
        <InputBox>
          <div className="inputBox">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </InputBox>

        <label htmlFor="nickName">닉네임</label>
        <InputBox>
          <div className="inputBox">
            <input
              id="nickName"
              type="text"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </div>
        </InputBox>
        
        <label htmlFor="email">이메일</label>
        <InputBox>
          <div className="inputBox">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </InputBox>

        <div className="picture-box">
          <div className="current-pic" onClick={() => setIsPicsModalOpen(true)}>
            <img src={currentPic} alt="프로필 이미지" />
          </div>
          <button
            className="picture-button"
            onClick={() => setIsPicsModalOpen(true)}
          >
            변경
          </button>
        </div>
        
        <Button onClick={handleSave}>저장하기</Button>

        {/* 프로필 사진 모달 */}
        <ProfilePicModal
          open={isPicsModalOpen}
          close={() => setIsPicsModalOpen(false)}
          onSelect={handlePicSelect}
          type="edit"
          addPicture={handlePicAdd}
        />
      </Container>
    </Center>
  );
};

export default UserInfoEdit;
