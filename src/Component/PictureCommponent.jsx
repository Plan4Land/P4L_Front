import React, { useState, useEffect, useRef } from "react";
import { ModalStyle } from "./SignupComponents/SignupModalComponent";
import styled from "styled-components";
import { colors } from "../Style/GlobalStyle";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../Api/AxiosApi";
// component
// import { ProfilePicModal } from "./PictureModalComponent";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export const ProfileImg = ({ file, width, height }) => {
  return (
    <ProfileImgContainer width={width} height={height}>
      <img
        src={file}
        alt="프로필 이미지"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    </ProfileImgContainer>
  );
};

export const PictureComponent = (props) => {
  const { currentPic, setCurrentPic, role, type } = props;
  const [isPicsModalOpen, setIsPicsModalOpen] = useState("");

  const handlePicSelect = (picName) => {
    setCurrentPic(`profile-pic/${picName}`);
  };

  const handlePicAdd = (picture) => {
    setCurrentPic(URL.createObjectURL(picture));
  };

  return (
    <>
      <div className="picture-box">
        <div className="current-pic" onClick={() => setIsPicsModalOpen(true)}>
          <img src={currentPic} alt="프로필 이미지" />
          <label htmlFor="profile-upload" className="upload-label">
            <FontAwesomeIcon icon={faCamera} />
          </label>
        </div>
      </div>

      {/* 프로필 사진 모달 */}
      <ProfilePicModal
        open={isPicsModalOpen}
        close={() => setIsPicsModalOpen(false)}
        onSelect={handlePicSelect}
        state={role === "ROLE_MEMBERSHIP" ? "edit" : "new"}
        addPicture={handlePicAdd}
        type={type}
      />
    </>
  );
};

// 프로필 사진 모달
export const ProfilePicModal = (props) => {
  const { open, close, onSelect, state, addPicture, type } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleBackgroundClick = (e) => {
    e.stopPropagation(); // 내부 클릭 시 닫히지 않게 설정
    close();
  };

  const selectPic = (picName) => {
    onSelect(picName);
    close();
  };

  const addNewPic = (picture) => {
    addPicture(picture);
    close();
  };

  const profilePictures = [
    { name: "basic7.png", alt: "기본7" },
    { name: "basic8.png", alt: "기본8" },
    { name: "basic9.png", alt: "기본9" },
    { name: "basic10.png", alt: "기본10" },
    { name: "basic11.png", alt: "기본11" },
    { name: "basic12.png", alt: "기본12" },
  ];

  const planningPictures = [
    { name: "planningth1.png", alt: "기본1" },
    { name: "planningth2.png", alt: "기본2" },
    { name: "planningth3.png", alt: "기본3" },
    { name: "planningth4.png", alt: "기본4" },
    { name: "planningth5.png", alt: "기본5" },
    { name: "planningth6.png", alt: "기본6" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <ModalStyle>
      <div
        className={open ? "openModal modal" : "modal"}
        onClick={handleBackgroundClick}
      >
        {open && (
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h1 className="title">프로필 선택</h1>
            <div
              className={
                state === "new" ? "picture-container-new" : "picture-container"
              }
            >
              {type === "profile"
                ? profilePictures.map((picture, index) => (
                    <div className="picture-box" key={index}>
                      <img
                        src={`profile-pic/${picture.name}`}
                        alt={picture.alt}
                        onClick={() => selectPic(picture.name)}
                      />
                    </div>
                  ))
                : planningPictures.map((picture, index) => (
                    <div className="picture-box" key={index}>
                      <img
                        src={`planning-pic/${picture.name}`}
                        alt={picture.alt}
                        onClick={() => selectPic(picture.name)}
                      />
                    </div>
                  ))}
              {state === "edit" && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <div className="picture-box">
                    {selectedImage && (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        onClick={() => addNewPic(selectedImage)}
                      />
                    )}
                  </div>
                  <div className="picture-box" />
                  <div className="picture-box" onClick={openFilePicker}>
                    <img
                      src="profile-pic/plus.png"
                      alt="이미지 선택"
                      className="plusPic"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="closeBtn" onClick={close}>
              <IoClose />
            </div>
          </div>
        )}
      </div>
    </ModalStyle>
  );
};

export const ProfileImgContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: ${(props) => props.width || "100%"}; // 기본값 100px
  height: ${(props) => props.height || "100%"}; // 기본값 100px
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.13);

  .upload-label {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    background-color: ${colors.colorA};
    color: white;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
`;
