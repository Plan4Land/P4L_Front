import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../Api/AxiosApi";
// component
import { Center, Container, InputBox } from "../../Style/UserInfoEditStyle";
import { Button } from "../../Component/ButtonComponent";
import { useAuth } from "../../Context/AuthContext";
import { storage } from "../../Api/Firebase";
import { PictureComponent } from "../../Component/PictureCommponent";
import { Upload } from "../../Component/FirebaseUpload";
import { Loading } from "../../Component/LoadingComponent";
import { CheckModal } from "../../Util/Modal";
// icon
import { IoIosArrowBack } from "react-icons/io";

// image
import Profile from "../../Img/profile-pic/profile.png";

const UserInfoEdit = () => {
  const { user, updateUser } = useAuth();
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [nameCheck, setNameCheck] = useState(true);
  const [nickname, setNickname] = useState("");
  const [nicknameMsg, setNicknameMsg] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(true);
  const nicknameRef = useRef(null);
  const [email, setEmail] = useState("");
  const [currentPic, setCurrentPic] = useState(Profile);
  const [userRole, setUserRole] = useState("");

  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [checkModalMessage, setCheckModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 정보 가져오기
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await AxiosApi.memberInfo(user.id);
        setUserId(response.data.id);
        setName(response.data.name);
        setEmail(response.data.email);
        setNickname(response.data.nickname);
        setCurrentPic(response.data.imgPath);
        setUserRole(response.data.role);
        console.log(response.data.imgPath);
      } catch (error) {
        console.error("Error during getUserInfo: ", error);
      }
    };
    getUserInfo();
  }, []);

  // 이름 체크
  const handleName = (e) => {
    const input = e.target.value;
    setName(input);
    if (user.name !== name) {
      if (!input.trim()) {
        setNameMsg("이름을 입력해주세요");
        setNameCheck(false);
      } else if (input.length < 3) {
        setNameMsg("이름은 3글자 이상이어야 합니다.");
        setNameCheck(false);
      } else {
        setNameMsg("");
        setNameCheck(true);
      }
    }
  };

  // 닉네임 체크
  const handleNickname = (e) => {
    const input = e.target.value;
    setNickname(input);
    if (!input.trim()) {
      setNicknameMsg("닉네임을 입력해주세요.");
      setNicknameCheck(false);
    } else if (input.length < 3) {
      setNicknameMsg("닉네임은 3글자 이상 또는 10글자 이하여야 합니다.");
      setNicknameCheck(false);
    } else if (input.length >= 10) {
      setNicknameMsg("닉네임은 3글자 이상 또는 10글자 이하여야 합니다.");
      setNicknameCheck(false);
    } else {
      setNicknameMsg("");
      setNicknameCheck(true);
    }
  };
  // 닉네임 중복 체크
  const handleNicknameCheck = async () => {
    if (user.nickname !== nickname) {
      const response = await AxiosApi.memberNicknameExists(nickname);
      if (response.data) {
        setNicknameMsg("중복된 닉네임입니다.");
        setNicknameCheck(false);
        nicknameRef.current.focus();
        return;
      }
    }
  };

  // 회원정보 수정 기능
  const handleSave = async () => {
    console.log(user);
    if (user.nickname !== nickname) {
      handleNicknameCheck();
    }
    if (!nameCheck || !nicknameCheck) {
      return;
    }
    setIsLoading(true);
    try {
      const updatedPic = await Upload({
        currentPic,
        type: "profile",
        userId: user.id,
      });

      // 회원 정보 수정 진행
      const rsp = await AxiosApi.memberUpdate(
        userId,
        name,
        nickname,
        email,
        updatedPic
      );
      if (rsp.data) {
        setCheckModalMessage("회원정보가 수정되었습니다.");
        setIsCheckModalOpen(true);

        updateUser({
          nickname: nickname,
          email,
          imgPath: updatedPic,
        });
      }
    } catch (e) {
      console.error("Error during userUpdate: ", e);
      setCheckModalMessage(
        "회원정보 수정중 오류가 발생했습니다. 다시 시도해주세요."
      );
      setIsCheckModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(0);
  };

  const closeCheckModal = () => {
    setIsCheckModalOpen(false);
    navigate("/mypage");
  };

  return (
    <Center>
      <Container>
        <h2 className="title">회원정보 수정</h2>

        <label htmlFor="userId">아이디</label>
        <div className="input-container">
          <InputBox>
            <div className="inputBox">
              <input id="userId" type="text" value={userId} readOnly />
            </div>
          </InputBox>
        </div>

        <label htmlFor="name">이름</label>
        <div className="input-container">
          <div className="textMessage">{nameMsg}</div>
          <InputBox>
            <div className="inputBox">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => handleName(e)}
              />
            </div>
          </InputBox>
        </div>

        <label htmlFor="nickName">닉네임</label>
        <div className="input-container">
          <div className="textMessage">{nicknameMsg}</div>
          <InputBox>
            <div className="inputBox">
              <input
                ref={nicknameRef}
                id="nickName"
                type="text"
                value={nickname}
                onChange={(e) => handleNickname(e)}
              />
            </div>
          </InputBox>
        </div>

        <label htmlFor="email">이메일</label>
        <div className="input-container">
          <InputBox>
            <div className="inputBox">
              <input id="email" type="email" value={email} readOnly />
            </div>
          </InputBox>
        </div>

        {/* 프로필 사진 */}
        <PictureComponent
          currentPic={currentPic}
          setCurrentPic={setCurrentPic}
          role={userRole}
          type={"profile"}
          mediaHeight768={"350px"}
        />

        <Button onClick={handleSave}>저장하기</Button>

        <button className="back-button" onClick={handleBack}>
          <IoIosArrowBack />
        </button>

        {/* 완료 모달 */}
        <CheckModal isOpen={isCheckModalOpen} onClose={closeCheckModal}>
          <p>{checkModalMessage}</p>
        </CheckModal>

        {isLoading && (
          <Loading>
            <p>변경중입니다. 잠시만 기다려주세요...</p>
          </Loading>
        )}
      </Container>
    </Center>
  );
};

export default UserInfoEdit;
