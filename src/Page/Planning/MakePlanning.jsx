import { useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import {
  MakePlanningContainer,
  DatePickerContainer,
  ModalOverlay,
  ModalContainer,
} from "../../Style/PlanningStyled";
import { areas, themes } from "../../Util/Common";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { ToggleSwitch } from "../../Component/ToggleSwitch";
import { ProfileImgContainer } from "../../Component/ProfileImg";
import ThumbnailBasic from "../../Img/planning_thumbnail.jpg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchKakaoMap } from "../../Component/KakaoMapComponent";

export const MakePlanning = () => {
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const handleInputChange = (e) => {
  //   setSearchKeyword(e.target.value);
  // };
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleThemeClick = (theme) => {
    setSelectedThemes((prev) => {
      if (prev.includes(theme)) {
        // 이미 선택된 테마를 클릭하면 취소
        return prev.filter((t) => t !== theme);
      } else {
        // 새로운 테마를 선택하고, 최대 3개까지 선택
        return [...prev, theme].slice(0, 3);
      }
    });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null); // 종료일을 초기화
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    console.log("제출이요");
  };

  return (
    <>
      <Header />
      <MakePlanningContainer>
        <h2 className="question-title">어디로 가시나요?</h2>
        <select
          value={selectedArea}
          onChange={handleAreaChange}
          className="location-select"
        >
          <option value="">지역을 선택하세요</option>
          {areas.map((area) => (
            <option key={area.name} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
        {selectedArea && (
          <>
            <h2 className="question-title">
              여행 테마 선택<span>(최대 3개)</span>
            </h2>
            <div className="theme-buttons">
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleThemeClick(theme)}
                  className={`theme-button ${
                    selectedThemes.includes(theme) ? "selected" : ""
                  }`}
                  disabled={
                    selectedThemes.length >= 3 &&
                    !selectedThemes.includes(theme)
                  }
                >
                  {theme}
                </button>
              ))}
            </div>
          </>
        )}
        {selectedArea && selectedThemes.length > 0 && (
          <>
            <h2 className="question-title">언제 가시나요?</h2>
            <DatePickerContainer>
              <DatePicker
                className="input-date-picker"
                locale={ko}
                dateFormat="yyyy-MM-dd"
                dateFormatCalendar="yyyy년 MM월"
                timeCaption="시간"
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholderText="시작일 선택"
              />
              <span>~</span>
              {startDate ? (
                <DatePicker
                  className="input-date-picker"
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  dateFormatCalendar="yyyy년 MM월"
                  timeCaption="시간"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="종료일 선택"
                />
              ) : (
                <input
                  className="input-date-picker"
                  placeholder="종료일 선택"
                  onClick={() => setOpenModal(true)}
                />
              )}
            </DatePickerContainer>
          </>
        )}
        {selectedArea && selectedThemes.length > 0 && endDate && (
          <>
            <h2 className="question-title">플래닝 제목 입력</h2>
            <input
              type="text"
              placeholder="플래닝 제목을 입력하세요"
              className="title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        )}

        {selectedArea && selectedThemes.length > 0 && endDate && title && (
          <>
            <h2 className="question-title">플래닝 사진</h2>
            <div className="profile-container">
              <ProfileImgContainer>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="미리보기"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <img
                    src={ThumbnailBasic}
                    alt="썸네일 기본"
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </ProfileImgContainer>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <h2 className="question-title">공개 여부</h2>
            <ToggleSwitch setIsOn={setIsPublic} isOn={isPublic} />
          </>
        )}
        {selectedArea && selectedThemes.length > 0 && endDate && title && (
          <button
            className="makePlanning-submit"
            onClick={() => handleSubmit()}
          >
            생성하기
          </button>
        )}
      </MakePlanningContainer>
      {openModal && (
        <ModalOverlay>
          <ModalContainer>
            <h3>시작일을 먼저 선택해주세요.</h3>
            <button onClick={() => setOpenModal(false)}>확인</button>
          </ModalContainer>
        </ModalOverlay>
      )}
      <Footer />
    </>
  );
};
