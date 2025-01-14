import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarWrapper, TimeWrapper, ApplyButton, SelectedTimeMessage } from "../Style/TrafficStyle";

const DateComponent = ({ toggleModal, setSelectedDate }) => {
  const currentDate = new Date(); // 오늘 날짜
  const currentYear = currentDate.getFullYear(); // 현재 연도
  const currentMonth = currentDate.getMonth(); // 현재 월
  const currentDay = currentDate.getDate(); // 오늘 날짜의 일

  const [selectedDate, setLocalSelectedDate] = useState(null); // 선택된 날짜 상태
  const [selectedTime, setSelectedTime] = useState(null); // 선택된 시간 상태
  const [timeRange, setTimeRange] = useState([0, 7]); // 표시할 시간 범위 (0시부터 7시까지)

  // 오늘 날짜인지 확인하는 함수
  const isToday = (date) => {
    return (
      date.getDate() === currentDay &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  };

  // 타일 클래스 이름 지정
  const tileClassName = ({ date, view }) => {
    if (view === "month" && isToday(date)) {
      return "react-calendar__tile--active"; // 오늘 날짜만 스타일 적용
    }
    return null;
  };

  // 오늘 날짜부터 한 달 후 날짜까지 선택할 수 있도록 설정
  const nextMonth = new Date();
  nextMonth.setMonth(currentMonth + 1); // 한 달 후

  const handleDateClick = (date) => {
    const formattedDate = date.toLocaleDateString("ko-KR");
    setLocalSelectedDate(formattedDate); // 내부 상태 업데이트
    setSelectedDate(formattedDate); // 상위 컴포넌트로 전달
  };

  // 시간을 좌우로 스크롤 할 수 있게 설정
  const scrollTime = (direction) => {
    if (direction === "left" && timeRange[0] > 0) {
      setTimeRange([timeRange[0] - 8, timeRange[1] - 8]); // 8개씩 왼쪽으로 이동
    }
    if (direction === "right" && timeRange[1] < 23) {
      setTimeRange([timeRange[0] + 8, timeRange[1] + 8]); // 8개씩 오른쪽으로 이동
    }
  };

  // 시간을 클릭할 때 선택 상태 변경
  const handleTimeClick = (time) => {
    setSelectedTime(time); // 선택된 시간 상태 업데이트
  };

  // 날짜와 시간 결합하여 적용하는 함수 수정
  const handleApply = () => {
    if (selectedDate && selectedTime) {
      const selectedDateTime = `${selectedDate} ${selectedTime}`; // 선택된 날짜와 시간 결합
      setSelectedDate(selectedDateTime); // 날짜와 시간 결합된 값 상위 컴포넌트로 전달
      console.log("선택된 시간과 날짜:", selectedDateTime); // 날짜와 시간 콘솔 출력
      toggleModal(); // 모달 닫기
    } else {
      alert("날짜와 시간을 모두 선택해주세요."); // 선택되지 않은 경우 경고
    }
  };
  
  return (
    <div>
      <CalendarWrapper>
        {/* 첫 번째 달 */}
        <div className="calendar-container">
          <h3>{`${currentMonth + 1}월`}</h3>
          <Calendar
            onClickDay={handleDateClick} // 날짜 클릭 이벤트
            value={currentDate} // 현재 날짜로 초기화
            tileClassName={tileClassName} // 타일 스타일 적용
            showNavigation={false} // 화살표 제거
            minDetail="month" // 최소 단위는 월
            minDate={currentDate} // 오늘 날짜 이후만 선택 가능
            maxDate={nextMonth} // 한 달 후 날짜까지 선택 가능
          />
        </div>
        {/* 두 번째 달 */}
        <div className="calendar-container">
          <h3>{`${currentMonth + 2 > 12 ? 1 : currentMonth + 2}월`}</h3>
          <Calendar
            onClickDay={handleDateClick} // 날짜 클릭 이벤트
            value={new Date(currentYear, currentMonth + 1, 1)} // 다음 달로 초기화
            tileClassName={tileClassName} // 타일 스타일 적용
            showNavigation={false} // 화살표 제거
            minDetail="month" // 최소 단위는 월
            minDate={currentDate} // 오늘 날짜 이후만 선택 가능
            maxDate={nextMonth} // 한 달 후 날짜까지 선택 가능
          />
        </div>
      </CalendarWrapper>

      {/* 시간 선택 영역 */}
      <TimeWrapper>
        {/* 시간 상단 중앙에 선택 메시지 */}
        <SelectedTimeMessage style={{ textAlign: "center", marginBottom: "20px" }}>
          <p>{selectedTime ? `${selectedTime} 이후 출발` : "시간을 선택하세요"}</p>
        </SelectedTimeMessage>

        <div className="time-selector">
          {/* 좌측 화살표 */}
          <button
            className="arrow left"
            onClick={() => scrollTime("left")}
            disabled={timeRange[0] === 0} // 0시 이전으로 이동 불가
          >
            &lt;
          </button>

          {/* 시간 표시 (8개씩) */}
          {Array.from({ length: 8 }).map((_, index) => {
            const hour = timeRange[0] + index;
            if (hour <= 23) { // 23시까지만 표시
              return (
                <div
                  className={`time-slot ${selectedTime === `${hour}:00` ? "selected" : ""}`}
                  key={hour}
                  onClick={() => handleTimeClick(`${hour}:00`)}
                >
                  {`${hour}:00`}
                </div>
              );
            }
            return null;
          })}

          {/* 우측 화살표 */}
          <button
            className="arrow right"
            onClick={() => scrollTime("right")}
            disabled={timeRange[1] === 23} // 23시로 제한
          >
            &gt;
          </button>
        </div>
        
        {/* Apply 버튼을 시간 목록 아래로 이동 */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <ApplyButton onClick={handleApply}>적용</ApplyButton>
        </div>
      </TimeWrapper>
    </div>
  );
};

export default DateComponent;
