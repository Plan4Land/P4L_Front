import { Header, Footer } from "../Component/GlobalComponent";
import {
  MainBox,
  QuickSearch,
  CateButton,
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
import "react-calendar/dist/Calendar.css"; // 캘린더
import { TopTourApi, TopPlanApi, HolidayApi } from "../Api/ItemApi";

export const Main = () => {
  const [selectedMenu, setSelectedMenu] = useState("지역"); // 미니검색창
  const [selectedArea, setSelectedArea] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [holidayDates, setHolidayDates] = useState([]);
  const [topTourList, setTopTourList] = useState([]);
  const [topPlans, setTopPlans] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜
  const [year, setYear] = useState(new Date().getFullYear()); // 현재 연도
  const [month, setMonth] = useState(new Date().getMonth()); // 현재 월
  const navigate = useNavigate();

  // 공휴일 데이터 fetch
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const holidaysData = await HolidayApi.getHolidaysByMonth(
          year,
          month + 1
        ); // API에 전달할 때 월을 1부터 시작하므로 +1
        setHolidays(holidaysData); // 공휴일 목록 상태 업데이트

        // 공휴일 날짜만 추출하여 holidayDates에 저장
        const holidayDatesArray = holidaysData.map((holiday) =>
          new Date(holiday.holidayDate).toDateString()
        );
        setHolidayDates(holidayDatesArray);
      } catch (error) {
        console.error("공휴일 조회 오류:", error);
      }
    };

    fetchHolidays();
  }, [year, month]);

  // 상위 플래닝 3개 데이터 fetch
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

  // 상위 관광지 5개 데이터 fetch
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

  // 플래닝 클릭 시 상세 페이지로 이동
  const planHandleClick = (id) => {
    navigate(`/planning/${id}`);
  };

  // 관광지 클릭 시 상세 페이지로 이동
  const tourHandleClick = (id) => {
    navigate(`/tourItemInfo/${id}`);
  };

  // 지역 선택
  const handleAreaClick = (areaCode) => {
    setSelectedArea(areaCode);
  };

  // 날짜 변경 시 처리
  const onChange = (date) => {
    setSelectedDate(date);
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  };

  // 월 변경 시 처리
  const handleMonthChange = ({ activeStartDate }) => {
    setYear(activeStartDate.getFullYear());
    setMonth(activeStartDate.getMonth());
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
              <div className="catebuttons">
                {types.map((type) => (
                  <Link key={type.code} to={`/tourlist?category=${type.code}`}>
                    <CateButton type={type.code} typeName={type.name}/>
                  </Link>
                ))}
              </div>
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
    {topTourList.map((tour, index) => {
      // 기본 이미지 결정 함수
      const getDefaultImage = (typeId) => {
        switch (typeId) {
          case "100":
            return "/img/cateimg/type_200.png";
          case "200":
            return "/img/cateimg/type_300.png";
          case "300":
            return "/img/cateimg/type_300.png";
          default:
            return "/profile-pic/basic1.png"; 
        }
      };

      return (
        <SwiperSlide key={index}>
          <div
            className="topTourItem"
            onClick={() => tourHandleClick(tour.id)}
          >
            <img
              src={tour.thumbnail || getDefaultImage(tour.typeId)}
              alt={tour.title}
            />
            <h3>{tour.title}</h3>
            <p>{tour.addr1}</p>
          </div>
        </SwiperSlide>
      );
    })}
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
                  <p>{`${areaName} - ${subAreaName}`}</p>
                </div>
              );
            })}
          </PlanBox>
        </RecommPlan>

        <Festive className="GridItem">
          <Calendar
            calendarType="hebrew"
            onChange={onChange}
            value={selectedDate} // 선택된 날짜
            onActiveStartDateChange={handleMonthChange}
            tileClassName={({ date, view }) => {
              const isSameMonth = date.getMonth() === month;
              const isSameYear = date.getFullYear() === year;
              if (!isSameMonth || !isSameYear) {
                return "react-calendar__tile--inactive";
              }
            }}
            tileContent={({ date }) =>
              holidayDates.some(
                (holidayDate) => holidayDate === date.toDateString()
              ) ? (
                <div className="red-dot"></div> // 공휴일 날짜에 빨간 점 표시
              ) : null
            }
            formatDay={(locale, date) => date.getDate()}
            tileDisabled={({ date, view }) => view === "month"}
          />

          <HolidayList>
            <ul>
              {holidays.length === 0 ? (
                <li>일정이 존재하지 않습니다.</li>
              ) : (
                holidays.map((holiday) => (
                  <li key={holiday.seq}>
                    {parseInt(holiday.holidayDate.toString().slice(5, 7))}월{" "}
                    {parseInt(holiday.holidayDate.toString().slice(8, 10))}일 -{" "}
                    {holiday.holidayName}
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
