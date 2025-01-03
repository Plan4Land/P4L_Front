import { Header, Footer } from "../Component/GlobalComponent";
import {
  MainBox,
  QuickSearch,
  RecommItem,
  RecommPlan,
  Festive,
  PlanBox,
} from "../Style/MainStyled"; // 스타일
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // 추천 관광지 스와이퍼
import "swiper/css"; // 추천 관광지 스와이퍼
import "swiper/css/navigation"; // 추천 관광지 스와이퍼
import "swiper/css/pagination"; // 추천 관광지 스와이퍼
import { Navigation, Pagination } from "swiper/modules"; // 추천 관광지 스와이퍼
import Calendar from "react-calendar"; // 축제 캘린더
import "react-calendar/dist/Calendar.css"; // 축제 캘린더

export const Main = () => {
  const [selectedMenu, setSelectedMenu] = useState("지역"); // 미니검색창
  const [value, onChange] = useState(new Date()); // 축제 캘린더

  return (
    <>
      <Header />
      <MainBox>
        {/* 미니 검색창!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
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
        {/* 상위 관광지 n개 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
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
        {/* 상위 플래닝 3개!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <RecommPlan className="GridItem">
          <PlanBox>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </PlanBox>
        </RecommPlan>
        {/* 축제 미니 캘린더!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <Festive className="GridItem">
          <Calendar onChange={onChange} value={value} />
        </Festive>
      </MainBox>
      <Footer />
    </>
  );
};
