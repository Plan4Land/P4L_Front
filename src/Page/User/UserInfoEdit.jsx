import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../Api/AxiosApi";
// component
import { Center, Container, InputBox, Button } from "../../Style/UserInfoEditStyle";
import { useAuth } from "../../Context/AuthContext";
import { storage } from "../../Api/Firebase";
import { ProfilePicModal } from "../../Component/PictureModalComponent";
import { CheckModal } from "../../Util/Modal";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { IoIosArrowBack } from "react-icons/io";

const UserInfoEdit = () => {
  const { user, updateUser } = useAuth();
  const [userId, setUserId] = useState("test1");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [isPwCheck, setIsPwCheck] = useState(false);
  const [name, setName] = useState("홍길동");
  const [nickName, setNickName] = useState("길동이");
  const [email, setEmail] = useState("hong@example.com");
  const [currentPic, setCurrentPic] = useState("profile-pic/profile.png");
  const [isPicsModalOpen, setIsPicsModalOpen] = useState("");
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [checkModalMessage, setCheckModalMessage] = useState("");

  const navigate = useNavigate();

  const handlePicSelect = (picName) => {
    setCurrentPic(`profile-pic/${picName}`);
  };
  const handlePicAdd = (picture) => {
    // 사진 추가하는 기능 구현하기.
    setCurrentPic(URL.createObjectURL(picture));
  };

  // 정보 가져오기
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await AxiosApi.memberInfo(user.id);
        setUserId(response.data.id);
        setName(response.data.name);
        setEmail(response.data.email);
        setNickName(response.data.nickname);
        setCurrentPic(response.data.imgPath);
        console.log(response.data.imgPath);
      } catch (error) {
        console.error("Error during getUserInfo: ", error);
      }
    };
    getUserInfo();
  }, []);
  
  // 회원정보 수정 기능
  const handleSave = async () => {
    try {
      const rsp = await AxiosApi.memberUpdate(userId, name, nickName, email, currentPic);
      console.log(rsp);
      if (rsp.data) {
        // 프로필 사진이 새로 추가된 경우 Firebase에 업로드
        let updatedPic  = currentPic;
        if (currentPic && currentPic.startsWith("blob:")) {
          // Firebase Storage 참조
          const storageRef = storage.ref(`/UserProfilePic/${user.id}/`);
          const fileRef = storageRef.child("profile");
          // 새로운 파일 업로드
          await fileRef.put(currentPic);
          // 업로드된 파일 URL 가져오기
          updatedPic = await fileRef.getDownloadURL();
          console.log("새 파일 업로드 성공:", updatedPic);
        }

        setCheckModalMessage("회원정보가 수정되었습니다.");
        setIsCheckModalOpen(true);

        updateUser({
          nickName: nickName,
          email,
          imgPath: currentPic,
        });
      }
    } catch (e) {
      console.error("Error during userUpdate: ", e);
      setCheckModalMessage("회원정보 수정중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsCheckModalOpen(true);
    }
  };

  const handleBack = () => {
    window.location.reload();
  }

  const closeCheckModal = () => {
    setIsCheckModalOpen(false);
    navigate("/mypage");
  };

  return (
    <Center>
      <Container>
        <h2 className="title">회원정보 수정</h2>

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
        
        <Button onClick={handleSave}>저장하기</Button>

        {/* 프로필 사진 모달 */}
        <ProfilePicModal
          open={isPicsModalOpen}
          close={() => setIsPicsModalOpen(false)}
          onSelect={handlePicSelect}
          state="edit"
          addPicture={handlePicAdd}
          type="profile"
        />

        <button 
          className="back-button"
          onClick={handleBack}
        >
          <IoIosArrowBack />
        </button>

        {/* 완료 모달 */}
        <CheckModal isOpen={isCheckModalOpen} onClose={closeCheckModal}>
          {checkModalMessage}
        </CheckModal>
      </Container>
    </Center>
  );
};

export default UserInfoEdit;
