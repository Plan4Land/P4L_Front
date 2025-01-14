import { useState, useRef } from "react";
import { ModalStyle } from "./SignupComponents/SignupModalComponent";
import { IoClose } from "react-icons/io5";

// 프로필 사진 모달
export const ProfilePicModal = (props) => {
  const { open, close, onSelect, type, addPicture } = props;
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

  const pictures = [
    { name: "basic1.png", alt: "기본1" },
    { name: "basic3.png", alt: "기본3" },
    { name: "basic4.png", alt: "기본4" },
    { name: "basic5.png", alt: "기본5" },
    { name: "basic6.png", alt: "기본6" },
    { name: "basic7.png", alt: "기본7" },
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
                type === "new" ? "picture-container-new" : "picture-container"
              }
            >
              {pictures.map((picture, index) => (
                <div className="picture-box" key={index}>
                  <img
                    src={`profile-pic/${picture.name}`}
                    alt={picture.alt}
                    onClick={() => selectPic(picture.name)}
                  />
                </div>
              ))}
              {type === "edit" && (
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