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
import { Button } from "../Component/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { areas, types } from "../Util/Common";
import { Swiper, SwiperSlide } from "swiper/react"; // 추천 관광지 스와이퍼
import "swiper/css"; // 추천 관광지 스와이퍼
import "swiper/css/navigation"; // 추천 관광지 스와이퍼
import "swiper/css/pagination"; // 추천 관광지 스와이퍼
import { Navigation, Pagination } from "swiper/modules"; // 추천 관광지 스와이퍼
import Calendar from "react-calendar"; // 축제 캘린더
import "react-calendar/dist/Calendar.css"; // 축제 캘린더
import axios from "axios";
import { TopTourApi, TopPlanApi } from "../Api/ItemApi";

export const Main = () => {
  const [selectedMenu, setSelectedMenu] = useState("지역"); // 미니검색창
  const [selectedArea, setSelectedArea] = useState("");
  const [value, onChange] = useState(new Date()); // 축제 캘린더
  const [holidays, setHolidays] = useState([]); // 공휴일 목록
  const [currentMonth, setCurrentMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const today = new Date();
  const selectedMonth = value.getMonth();
  const selectedYear = value.getFullYear();
  const [topTourList, setTopTourList] = useState([]);
  const [topPlans, setTopPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopPlans = async () => {
      try {
        const response = await TopPlanApi.getTop3Plans();

        setTopPlans(response);
      } catch (error) {
        console.error("상위 3개 플래닝 데이터를 가져오는 데 실패:", error);
      }
    };
    fetchTopPlans();
  }, []);

  const planHandleClick = (id) => {
    navigate(`/planning/${id}`);
  };

  useEffect(() => {
    const fetchTopTourList = async () => {
      try {
        const response = await TopTourApi.getTop5Travelspots();
        setTopTourList(response);
      } catch (error) {
        console.error("상위 관광지 데이터를 가져오는 데 실패:", error);
      }
    };
    fetchTopTourList();
  }, []);

  const tourHandleClick = (id) => {
    navigate(`/tourItemInfo/${id}`);
  };

  const handleAreaClick = (areaCode) => {
    setSelectedArea(areaCode);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/holiday")
      .then((response) => {
        const holidaysData = Array.isArray(response.data) ? response.data : [];
        setHolidays(holidaysData);
      })
      .catch((error) => {
        // console.error("공휴일 데이터를 불러오는 데 실패했습니다.", error);
      });
  }, []);

  const holidayDates = holidays.map((holiday) => {
    const date = holiday.locdate.toString();
    return new Date(
      parseInt(date.slice(0, 4)), // 연도
      parseInt(date.slice(4, 6)) - 1, // 월
      parseInt(date.slice(6, 8)) // 일
    );
  });

  const filterHolidaysForMonth = (year, month) => {
    return holidays.filter((holiday) => {
      const holidayDate = new Date(
        parseInt(holiday.locdate.toString().slice(0, 4)), // 연도
        parseInt(holiday.locdate.toString().slice(4, 6)) - 1, // 월
        parseInt(holiday.locdate.toString().slice(6, 8)) // 일
      );
      return (
        holidayDate.getFullYear() === year && holidayDate.getMonth() === month
      );
    });
  };

  const handleMonthChange = ({ activeStartDate }) => {
    const newYear = activeStartDate.getFullYear();
    const newMonth = activeStartDate.getMonth();
    setCurrentMonth({ year: newYear, month: newMonth });
  };

  return (
    <>
      <Header />
      <MainBox>
        {/* 미니 검색창 */}
        <QuickSearch>
          <div className="QuickSelect">
            <button
              onClick={() => setSelectedMenu("지역")}
              className={selectedMenu === "지역" ? "active" : ""}
            >
              지역
            </button>
            |
            <button
              onClick={() => setSelectedMenu("카테고리")}
              className={selectedMenu === "카테고리" ? "active" : ""}
            >
              카테고리
            </button>
          </div>
          <div className="SearchBox">
            {selectedMenu === "지역" && (
              <div className="RegionSearch">
                <div className="area-list">
                  {areas.map((area) => (
                    <Link
                      key={area.code}
                      to={`/tourlist?areaCode=${area.code}`}
                    >
                      <Button
                        key={area.code}
                        onClick={() => handleAreaClick(area.name)}
                        className={selectedArea === area.name ? "selected" : ""}
                      >
                        {area.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {selectedMenu === "카테고리" && (
              <div className="SelectCategory">
                {types.map((type) => (
                  <Link key={type.code} to={`/tourlist?category=${type.code}`}>
                    <Button className="Category">{type.name}</Button>
                  </Link>
                ))}
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
            {topTourList.map((tour, index) => (
              <SwiperSlide key={index}>
                <div
                  className="topTourItem"
                  onClick={() => tourHandleClick(tour.id)}
                >
                  <img
                    src={tour.thumbnail || `/profile-pic/basic1.png`}
                    alt={tour.title}
                  />
                  <h3>{tour.title}</h3>
                  <p>{tour.addr1}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </RecommItem>

        {/* 상위 플래닝 3개 */}
        <RecommPlan className="GridItem">
          <PlanBox>
            {topPlans.map((plan, index) => {
              const areaName =
                areas.find((area) => area.code === plan.area)?.name ||
                "알 수 없는 지역";
              const subAreaName =
                areas
                  .find((area) => area.code === plan.area)
                  ?.subAreas.find((subArea) => subArea.code === plan.subArea)
                  ?.name || "알 수 없는 하위 지역";

              return (
                <div
                  key={index}
                  className="planitem"
                  onClick={() => planHandleClick(plan.id)}
                >
                  <img
                    src={plan.thumbnail || `/planning-pic/planningth1.jpg`}
                    alt={plan.title}
                  />
                  <h3>{plan.title}</h3>
                  <p>{`${areaName} - ${subAreaName}`}</p>{" "}
                  {/* 지역과 하위 지역 이름 출력 */}
                </div>
              );
            })}
          </PlanBox>
        </RecommPlan>

        {/* 축제 미니 캘린더 */}
        <Festive className="GridItem">
          <Calendar
            calendarType="hebrew"
            onChange={onChange}
            value={value} // 선택된 날짜
            onActiveStartDateChange={handleMonthChange} // 월 변경 시 공휴일 목록 필터링
            tileClassName={({ date, view }) => {
              const today = new Date();
              if (date.toDateString() === today.toDateString()) {
                return "react-calendar__tile--now";
              }

              // 현재 월을 벗어난 날짜는 반투명 처리
              if (view === "month") {
                const isSameMonth = date.getMonth() === selectedMonth; // 선택된 월과 비교
                const isSameYear = date.getFullYear() === selectedYear; // 선택된 연도와 비교
                if (!isSameMonth || !isSameYear) {
                  return "react-calendar__tile--inactive"; // 흐릿한 날짜
                }

                // 토요일/일요일 스타일 추가
                if (date.getDay() === 0) return "react-calendar-sunday";
                if (date.getDay() === 6) return "react-calendar-saturday";
              }
            }}
            tileContent={({ date }) =>
              holidayDates.some(
                (holidayDate) =>
                  holidayDate.toDateString() === date.toDateString()
              ) ? (
                <div className="red-dot"></div> // 날짜 아래 빨간 점 표시
              ) : null
            }
            formatDay={(locale, date) => date.getDate()}
            tileDisabled={({ date, view }) => view === "month"} // 'month' 뷰일 때 날짜만 선택 불가능
          />

          <HolidayList>
            <ul>
              {holidays.length === 0 ? (
                <li>일정이 존재하지 않습니다..</li>
              ) : (
                filterHolidaysForMonth(
                  currentMonth.year,
                  currentMonth.month
                ).map((holiday) => (
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
