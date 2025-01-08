import { useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import {
  MakePlanningContainer,
  DatePickerContainer,
} from "../../Style/PlanningStyled";
import { areas, themes } from "../../Util/Common";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { ToggleSwitch } from "../../Component/ToggleSwitch";
import { EditImg } from "../../Component/ProfileImg";
import { CheckModal } from "../../Util/Modal";
import ThumbnailBasic from "../../Img/planning_thumbnail.jpg";
import { Button } from "../../Component/ButtonComponent";
import PlanningApi from "../../Api/PlanningApi";
import { useNavigate } from "react-router-dom";

export const MakePlanning = () => {
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const handleInputChange = (e) => {
  //   setSearchKeyword(e.target.value);
  // };
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("planning_thumbnail.jpg");
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const memberId = JSON.parse(localStorage.getItem("user")).id;
  const navigate = useNavigate();
  const isStepComplete =
    selectedSubArea && selectedThemes.length > 0 && endDate && title.trim();

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedSubArea("");
  };

  const selectedAreaData = areas.find((area) => area.name === selectedArea);

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
    const areaCode = areas.find((area) => area.name === selectedArea)?.code;
    const subAreaCode = areas
      .find((area) => area.name === selectedArea)
      ?.subAreas.find((subArea) => subArea.name === selectedSubArea)?.code;

    try {
      const response = await PlanningApi.makePlanning(
        title,
        selectedThemes.join(","),
        memberId,
        startDate,
        endDate,
        areaCode,
        subAreaCode,
        selectedImage,
        isPublic
      );
      if (response.status === 200) {
        console.log("플래너 생성 성공");
        navigate(`/planning/${response.data}`);
      }
    } catch (e) {
      console.log("플래너 생성 중 에러", e);
    }
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
        {selectedAreaData && (
          <select
            value={selectedSubArea}
            onChange={(e) => setSelectedSubArea(e.target.value)}
            className="location-select"
          >
            <option value="">세부 지역을 선택하세요</option>
            {selectedArea &&
              selectedAreaData.subAreas.map((subArea) => (
                <option key={subArea.code} value={subArea.name}>
                  {subArea.name}
                </option>
              ))}
          </select>
        )}
        {selectedSubArea && (
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
        {selectedSubArea && selectedThemes.length > 0 && (
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
        {selectedSubArea && selectedThemes.length > 0 && endDate && (
          <>
            <h2 className="question-title">플래닝 제목 입력</h2>
            <input
              type="text"
              placeholder="플래닝 제목을 입력하세요"
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value.replace(/^\s+/, ""))}
            />
          </>
        )}

        {isStepComplete && (
          <>
            <h2 className="question-title">플래닝 사진</h2>
            <div className="profile-container">
              <EditImg
                basic={ThumbnailBasic}
                setSelectedImage={setSelectedImage}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                handleImageChange={handleImageChange}
              />
            </div>
            <h2 className="question-title">공개 여부</h2>
            <ToggleSwitch setIsOn={setIsPublic} isOn={isPublic} />
          </>
        )}
        {isStepComplete && (
          <Button
            onClick={() => handleSubmit()}
            $margin={"40px auto 0"}
            $width={"150px"}
          >
            생성하기
          </Button>
        )}
      </MakePlanningContainer>
      {openModal && (
        <CheckModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          buttonProps={{ $margin: "5% 0 0" }}
        >
          <h3>시작일을 먼저 선택해주세요.</h3>
        </CheckModal>
      )}
      <Footer />
    </>
  );
};
