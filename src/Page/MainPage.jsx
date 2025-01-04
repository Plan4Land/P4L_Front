import { Header, Footer } from "../Component/GlobalComponent";
import {
  MainBox,
  QuickSearch,
  RecommItem,
  RecommPlan,
  Festive,
  PlanBox,
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
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/holiday')
    .then(response => {
      setHolidays(response.data);
    })
    .catch(error => {
      console.error("공휴일 데이터를 불러오는 데 실패했습니다.", error);
      if (error.response) {
        // 서버가 응답을 반환했지만 4xx 또는 5xx 상태 코드가 포함된 경우
        console.error("응답 오류 상태 코드:", error.response.status);
        console.error("응답 데이터:", error.response.data);
      } else if (error.request) {
        // 요청이 이루어졌지만 응답이 없는 경우
        console.error("요청 오류:", error.request);
      } else {
        // 다른 오류
        console.error("에러 메시지:", error.message);
      }
    });
  },[]);
  
  // React Calendar에 표시할 공휴일 날짜들을 처리
  const holidayDates = holidays.map(holiday => {
    const date = holiday.locdate.toString();  // 날짜를 string 형식으로 변환
    return new Date(date.slice(0, 4), date.slice(4, 6) - 1, date.slice(6, 8));  // Date 객체로 변환
  });

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
            onChange={onChange} 
            value={value} 
            tileClassName={({ date }) => {
              return holidayDates.some(holidayDate => holidayDate.toDateString() === date.toDateString()) 
                ? 'highlight'  // 공휴일인 날짜에 클래스 추가
                : null;
            }} 
          />
        </Festive>
      </MainBox>
      <Footer />
    </>
  );
};
