import styled from "styled-components";
import { colors } from "../Style/GlobalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export const ProfileImgContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 100%;
  height: 100%;

  .upload-label {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: ${colors.colorA};
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
`;

export const EditImg = ({
  basic,
  setSelectedImage,
  imagePreview,
  setImagePreview,
  handleImageChange,
}) => {
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
