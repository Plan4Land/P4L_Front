import React, { useState, useEffect, useRef } from "react";
import { ModalStyle } from "./SignupComponents/SignupModalComponent";
import { CloseModal } from "../Util/Modal";
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
  const { currentPic, setCurrentPic, role, type, width, height } = props;
  const [isPicsModalOpen, setIsPicsModalOpen] = useState("");
  const imgRootPath = type === "profile" ? "/profile-pic" : "/img/planning-pic";

  const handlePicSelect = (picName) => {
    setCurrentPic(`${imgRootPath}/${picName}`);
  };

  const handlePicAdd = (picture) => {
    setCurrentPic(URL.createObjectURL(picture));
  };

  return (
    <>
      <PictureBox width={width} height={height}>
        <div className="current-pic" onClick={() => setIsPicsModalOpen(true)}>
          <img src={currentPic} alt="프로필 이미지" />
          <label htmlFor="profile-upload" className="upload-label">
            <FontAwesomeIcon icon={faCamera} />
          </label>
        </div>
      </PictureBox>

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
    { name: "planningth1.jpg", alt: "기본1" },
    { name: "planningth2.jpg", alt: "기본2" },
    { name: "planningth3.jpg", alt: "기본3" },
    { name: "planningth4.jpg", alt: "기본4" },
    { name: "planningth5.jpg", alt: "기본5" },
    { name: "planningth6.jpg", alt: "기본6" },
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
    <CloseModal
      isOpen={open}
      onClose={() => close(false)}
      contentWidth="450px"
      // contentHeight="400px"
    >
      <ModalContainer>
        <div className="modal-subcontainer">
          <h1 className="title">프로필 선택</h1>
          <div
            className={
              state === "new" ? "picture-container-new" : "picture-container"
            }
          >
            {type === "profile"
              ? profilePictures.map((picture, index) => (
                  <PictureModalBox key={index}>
                    <img
                      src={`/profile-pic/${picture.name}`}
                      alt={picture.alt}
                      onClick={() => selectPic(picture.name)}
                    />
                  </PictureModalBox>
                ))
              : planningPictures.map((picture, index) => (
                  <PictureModalBox key={index}>
                    <img
                      src={`/img/planning-pic/${picture.name}`}
                      alt={picture.alt}
                      onClick={() => selectPic(picture.name)}
                    />
                  </PictureModalBox>
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
                <PictureModalBox>
                  {selectedImage && (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      onClick={() => addNewPic(selectedImage)}
                    />
                  )}
                </PictureModalBox>
                <PictureModalBox />
                <PictureModalBox onClick={openFilePicker}>
                  <img
                    src="/profile-pic/plus.png"
                    alt="이미지 선택"
                    className="plusPic"
                  />
                </PictureModalBox>
              </>
            )}
          </div>
          {/* <div className="closeBtn" onClick={close}>
            <IoClose />
          </div> */}
        </div>
      </ModalContainer>
    </CloseModal>
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

const PictureBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 20px 0;

  .current-pic {
    display: flex;
    position: relative;
    border-radius: 50%;
    border: 1px solid #ddd;
    cursor: pointer;
    width: ${(props) => props.width || "100px"};
    height: ${(props) => props.height || "100px"};
    &:hover {
      border: 1px solid #bbb;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

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

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .picture-container-new {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    align-items: center;
  }

  .picture-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
  }

  .picture-box {
    width: 126px;
    height: 126px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 3px solid #ddd;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        border: 3px solid #bbb;
      }
    }
    .plusPic {
      width: 80px;
      height: 80px;
      padding: 20px;
    }
  }
`;

const PictureModalBox = styled.div`
  width: 126px;
  height: 126px;
  margin: 10px;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid #ddd;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      border: 3px solid #bbb;
    }
  }
  .plusPic {
    width: 80px;
    height: 80px;
    padding: 20px;
  }
`;
