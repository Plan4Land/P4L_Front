import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../Api/AxiosApi";
// component
import { ProfilePicModal } from "./PictureModalComponent";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export const PictureComponent = (props) => {
  const { currentPic, setCurrentPic, role } = props;
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

      {/* 프로필 사진 모달 */}
      <ProfilePicModal
        open={isPicsModalOpen}
        close={() => setIsPicsModalOpen(false)}
        onSelect={handlePicSelect}
        state={role === "ROLE_MEMBERSHIP" ? "edit" : "new"}
        addPicture={handlePicAdd}
        type="profile"
      />
    </>
  );
};