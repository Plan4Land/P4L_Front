import { useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import {
  MakePlanningContainer,
  DatePickerContainer,
} from "../../Style/PlanningStyled";
import { areas } from "../../Util/Common";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { SearchKakaoMap } from "../../Component/KakaoMapComponent";

export const MakePlanning = () => {
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const handleInputChange = (e) => {
  //   setSearchKeyword(e.target.value);
  // };
  const [selectedArea, setSelectedArea] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null); // 종료일을 초기화
    }
  };
  return (
    <>
      <Header />
      <MakePlanningContainer>
        <h2>어디로 가시나요?</h2>
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
            <h2>언제 가시나요?</h2>
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
                  onClick={() => alert("시작일 먼저 선택")}
                />
              )}
            </DatePickerContainer>
          </>
        )}
        {endDate && (
          <>
            <h2>플래닝 제목 입력</h2>
          </>
        )}
      </MakePlanningContainer>
      {/* <div style={{ padding: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={handleInputChange}
          style={{
            width: "300px",
            height: "40px",
            fontSize: "16px",
            marginBottom: "20px",
            padding: "5px",
          }}
        />
      </div>
      <div style={{ height: "1000px" }}>
        <SearchKakaoMap searchKeyword={searchKeyword} />{" "}
      </div> */}
      <Footer />
    </>
  );
};
