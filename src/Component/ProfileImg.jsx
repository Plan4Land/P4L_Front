import styled from "styled-components";
import { colors } from "../Style/GlobalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const ProfileImgContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: ${(props) => props.width || "100%"}; // 기본값 100px
  height: ${(props) => props.height || "100%"}; // 기본값 100px
  background-color: ${colors.colorB};

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

export const EditImg = ({ basic, setSelectedImage }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <ProfileImgContainer>
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="미리보기"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          <img
            src={basic}
            alt="썸네일 기본"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        )}
        <label htmlFor="profile-upload" className="upload-label">
          <FontAwesomeIcon icon={faCamera} />
        </label>
      </ProfileImgContainer>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export const ImgDownloader = ({ imgPath, width, height }) => {};
