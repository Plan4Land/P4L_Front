import { useState, useEffect } from "react";
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
import { Upload } from "../../Component/FirebaseUpload";
import { PictureComponent } from "../../Component/PictureCommponent";
import { CheckModal } from "../../Util/Modal";
import { Button } from "../../Component/ButtonComponent";
import PlanningApi from "../../Api/PlanningApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { Loading } from "../../Component/LoadingComponent";

import Planningth1 from "../../Img/planning-pic/planningth1.jpg";

export const MakePlanning = () => {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubArea, setSelectedSubArea] = useState("");
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [currentPic, setCurrentPic] = useState(Planningth1);
  // const [selectedImage, setSelectedImage] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isAreaVisible, setIsAreaVisible] = useState(false);
  const [isSubAreaVisible, setIsSubAreaVisible] = useState(false);
  const [isThemeVisible, setIsThemeVisible] = useState(false);
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  // const memberId = JSON.parse(localStorage.getItem("user")).id;
  const memberId = user?.id;
  const navigate = useNavigate();

  // 각 상태가 변경될 때마다 해당 컴포넌트를 보이게 함
  useEffect(() => {
    if (selectedArea) setIsAreaVisible(true);
  }, [selectedArea]);

  useEffect(() => {
    if (selectedSubArea) setIsSubAreaVisible(true);
  }, [selectedSubArea]);

  useEffect(() => {
    if (selectedThemes.length > 0) setIsThemeVisible(true);
  }, [selectedThemes]);

  useEffect(() => {
    if (startDate && endDate) setIsDateVisible(true);
  }, [startDate, endDate]);

  useEffect(() => {
    if (title.trim()) setIsTitleVisible(true);
  }, [title]);

  useEffect(() => {
    if (currentPic) setIsImageVisible(true);
  }, [currentPic]);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedSubArea("");
  };

  const selectedAreaData = areas.find((area) => area.name === selectedArea);

  const handleThemeClick = (theme) => {
    setSelectedThemes((prev) => {
      if (prev.includes(theme)) {
        return prev.filter((t) => t !== theme);
      } else {
        return [...prev, theme].slice(0, 3);
      }
    });
  };

  const handleStartDateChange = (date) => {
    console.log(date);
    console.log(new Date(date));
    setStartDate(date);
    if (endDate && date > endDate) {
      console.log("여기 오는건 아니지..?");
      setEndDate(null);
    }
  };

  const isStepComplete =
    selectedSubArea && selectedThemes.length > 0 && endDate && title.trim();

  const handleSubmit = async () => {
    setIsLoading(true);

    const areaCode = areas.find((area) => area.name === selectedArea)?.code;
    const subAreaCode = areas
      .find((area) => area.name === selectedArea)
      ?.subAreas.find((subArea) => subArea.name === selectedSubArea)?.code;

    const updatedPic = await Upload({
      currentPic,
      type: "planner",
      userId: user.id,
    });

    try {
      const response = await PlanningApi.makePlanning(
        title,
        selectedThemes.join(", "),
        memberId,
        startDate,
        endDate,
        areaCode,
        subAreaCode,
        updatedPic,
        isPublic
      );
      if (response.status === 200) {
        console.log("플래너 생성 성공");
        navigate(`/planning/${response.data}`);
      }
    } catch (e) {
      console.log("플래너 생성 중 에러", e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log("시작일 : ", startDate);
    console.log("종료일 : ", endDate);
  }, [startDate, endDate]);

  return (
    <>
      {/* <Header /> */}
      <MakePlanningContainer>
        {/* 지역 선택 */}
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

        {/* 세부 지역 선택 */}
        <div className={`select-option ${isAreaVisible ? "visible" : ""}`}>
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
        </div>

        {/* 테마 선택 */}
        <div className={`select-option ${isSubAreaVisible ? "visible" : ""}`}>
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
        </div>

        {/* 날짜 선택 */}
        <div className={`select-option ${isThemeVisible ? "visible" : ""}`}>
          {selectedSubArea && selectedThemes.length > 0 && (
            <>
              <h2 className="question-title">언제 가시나요?</h2>
              <DatePickerContainer>
                <DatePicker
                  className="input-date-picker"
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  dateFormatCalendar="yyyy년 MM월"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  // minDate={new Date()}
                  placeholderText="시작일 선택"
                />
                <span>~</span>
                {startDate ? (
                  <DatePicker
                    className="input-date-picker"
                    locale={ko}
                    dateFormat="yyyy-MM-dd"
                    dateFormatCalendar="yyyy년 MM월"
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
        </div>

        {/* 제목 입력 */}
        <div className={`select-option ${isDateVisible ? "visible" : ""}`}>
          {selectedSubArea && selectedThemes.length > 0 && endDate && (
            <div className="planningTitle">
              <h2 className="question-title">플래닝 제목 입력</h2>
              <input
                type="text"
                placeholder="플래닝 제목을 입력하세요"
                className="title-input"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value.replace(/^\s+/, "").substring(0, 20))
                }
              />
            </div>
          )}
        </div>

        {/* 이미지 선택 */}
        <div className={`select-option ${isTitleVisible ? "visible" : ""}`}>
          {isStepComplete && (
            <>
              <h2 className="question-title">플래닝 사진</h2>
              <div className="profile-container">
                <PictureComponent
                  currentPic={currentPic}
                  setCurrentPic={setCurrentPic}
                  role={"ROLE_MEMBERSHIP"}
                  type={"planner"}
                  width={"200px"}
                  height={"200px"}
                />
              </div>
              <h2 className="question-title">공개 여부</h2>
              <div className="public">
                <ToggleSwitch setIsOn={setIsPublic} isOn={isPublic} />
              </div>
            </>
          )}
        </div>

        {/* 생성하기 버튼 */}
        <div className={`select-option ${isStepComplete ? "visible" : ""}`}>
          {isStepComplete && (
            <Button
              onClick={() => handleSubmit()}
              $margin={"40px auto 0"}
              $width={"150px"}
            >
              생성하기
            </Button>
          )}
        </div>
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
      {isLoading && (
        <Loading>
          <p>플래너 생성중입니다. 잠시만 기다려주세요...</p>
        </Loading>
      )}
      {/* <Footer /> */}
    </>
  );
};
