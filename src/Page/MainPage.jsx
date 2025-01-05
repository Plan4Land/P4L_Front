import { Header, Footer } from "../Component/GlobalComponent";
import {
  MainBox,
  QuickSearch,
  RecommItem,
  RecommPlan,
  Festive,
  PlanBox,
  HolidayList,
} from "../Style/MainStyled"; // 스타일
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // 추천 관광지 스와이퍼
import "swiper/css"; // 추천 관광지 스와이퍼
import "swiper/css/navigation"; // 추천 관광지 스와이퍼
import "swiper/css/pagination"; // 추천 관광지 스와이퍼
import { Navigation, Pagination } from "swiper/modules"; // 추천 관광지 스와이퍼
import Calendar from "react-calendar"; // 축제 캘린더
import "react-calendar/dist/Calendar.css"; // 축제 캘린더
import axios from "axios";

export const Main = () => {
  const [selectedMenu, setSelectedMenu] = useState("지역"); // 미니검색창
  const [value, onChange] = useState(new Date()); // 축제 캘린더
  const [holidays, setHolidays] = useState([]); // 공휴일 목록
  const [currentYearMonth, setCurrentYearMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1, // 월은 0부터 시작하므로 1을 더함
  });

  // 연도와 월이 변경될 때마다 공휴일 데이터를 요청
  useEffect(() => {
    const { year, month } = currentYearMonth;

    // 공휴일 데이터를 요청
    axios
      .get("http://localhost:5000/api/holiday", {
        params: { solYear: year, solMonth: month },
      })
      .then((response) => {
        // 응답이 배열 형태로 변환되지 않으면 강제로 배열로 설정
        const holidaysData = Array.isArray(response.data) ? response.data : [];
        setHolidays(holidaysData); // 이전 데이터는 덮어쓰고 새 데이터를 사용
      })
      .catch((error) => {
        console.error("공휴일 데이터를 불러오는 데 실패했습니다.", error);
      });
  }, [currentYearMonth]); // currentYearMonth 상태가 변경될 때마다 호출

  // React Calendar에 표시할 공휴일 날짜들을 처리
  const holidayDates = holidays.map((holiday) => {
    const date = holiday.locdate.toString();
    return new Date(
      parseInt(date.slice(0, 4)), // 연도
      parseInt(date.slice(4, 6)) - 1, // 월
      parseInt(date.slice(6, 8)) // 일
    );
  });

  // 월/연도가 변경될 때 currentYearMonth 업데이트
  const handleMonthChange = (newDate) => {
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    setCurrentYearMonth({ year: newYear, month: newMonth });
    onChange(newDate); // 달력의 날짜 상태도 갱신
  };

  return (
    <>
      <Header />
      <MainBox>
        {/* 미니 검색창 */}
        <QuickSearch>
          <div className="QuickSelect">
            <button onClick={() => setSelectedMenu("지역")}>지역</button>|
            <button onClick={() => setSelectedMenu("테마")}>테마</button>
          </div>
          <div className="SearchBox">
            {selectedMenu === "지역" && (
              <div className="RegionSearch">
                <input type="text" placeholder="지역" />
                <button>검색</button>
              </div>
            )}
            {selectedMenu === "테마" && (
              <div className="SelectTheme">
                <div className="Theme">테마1</div>
                <div className="Theme">테마2</div>
                <div className="Theme">테마3</div>
              </div>
            )}
          </div>
        </QuickSearch>

        {/* 상위 관광지 n개 */}
        <RecommItem className="GridItem">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
          </Swiper>
        </RecommItem>

        {/* 상위 플래닝 3개 */}
        <RecommPlan className="GridItem">
          <PlanBox>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </PlanBox>
        </RecommPlan>

        {/* 축제 미니 캘린더 */}
        <Festive className="GridItem">
          <Calendar
            onChange={handleMonthChange} // 날짜 클릭 시 선택된 날짜 업데이트 (월/연도 변경 시 공휴일 목록 갱신)
            value={value} // 선택된 날짜
            onActiveStartDateChange={({ activeStartDate }) => {
              const newMonth = activeStartDate.getMonth() + 1; // 월
              const newYear = activeStartDate.getFullYear(); // 연도
              setCurrentYearMonth({ year: newYear, month: newMonth });
            }}
            tileContent={({ date }) =>
              holidayDates.some(
                (holidayDate) => holidayDate.toDateString() === date.toDateString()
              ) ? (
                <div className="red-dot"></div> // 날짜 아래 빨간 점 표시
              ) : null
            }
          />

          <HolidayList>
            <ul>
              {holidays.length === 0 ? (
                <li>이번 달에는 공휴일이 없습니다.</li>
              ) : (
                holidays.map((holiday) => (
                  <li key={holiday.seq}>
                    {parseInt(holiday.locdate.toString().slice(4, 6))}월{" "}
                    {parseInt(holiday.locdate.toString().slice(6, 8))}일 -{" "}
                    {holiday.dateName}
                  </li>
                ))
              )}
            </ul>
          </HolidayList>
        </Festive>
      </MainBox>
      <Footer />
    </>
  );
};
