import { useEffect, useState } from "react";
import { ExpressServiceCode } from "../../Util/Service_Express_code";
import { ExpressGradeService } from "../../Util/Service_ExpressGrade_code";
import {
  Container,
  ScheduleResult,
  SelectStationContainer,
  VehicleKindContainer,
  TrafficBox,
} from "../../Style/TrainStyle";
import { Pagination } from "../../Component/Pagination";
import { SelectExpressStation } from "../../Component/TrafficComponents/SelectStation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { DatePickerContainer } from "../../Style/PlanningStyled";
import { Button } from "../../Component/ButtonComponent";
import { ExpressApi } from "../../Api/TrafficApi";
import { FaSearch } from "react-icons/fa";

const Express = () => {
  const [departureArea, setDepartureArea] = useState(null);
  const [departureCity, setDepartureCity] = useState(null);
  const [departureStation, setDepartureStation] = useState(null);
  const [departureStationCode, setDepartureStationCode] = useState(null);
  const [arrivalArea, setArrivalArea] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);
  const [arrivalStation, setArrivalStation] = useState(null);
  const [arrivalStationCode, setArrivalStationCode] = useState(null);

  const [date, setDate] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [trainSchedule, setTrainSchedule] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const allVehicleCodes = ExpressGradeService.map((vehicle) => vehicle.GradeId);

  const allSelected = selectedVehicles.length === allVehicleCodes.length;

  const handleVehicleClick = (vehicle) => {
    let updatedVehicles = [...selectedVehicles];

    const vehicleId = vehicle.GradeId;

    if (updatedVehicles.includes(vehicleId)) {
      updatedVehicles = updatedVehicles.filter((id) => id !== vehicleId);
    } else {
      updatedVehicles.push(vehicleId);
    }

    setSelectedVehicles(updatedVehicles);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedVehicles([]);
    } else {
      setSelectedVehicles(allVehicleCodes);
    }
  };

  const isSearchButtonEnabled =
    departureStationCode &&
    arrivalStationCode &&
    date &&
    selectedVehicles.length > 0;

  const getTrainSchedules = async () => {
    try {
      setLoading(true);
      const formattedDate = format(date, "yyyyMMdd");
      const response = await ExpressApi.getSchedule(
        departureStationCode,
        arrivalStationCode,
        formattedDate,
        selectedVehicles
      );
      console.log(response); // API 응답 처리
      const combinedSchedules = response.flat();
      console.log("combinedSchedules : ", combinedSchedules);
      const sortedSchedules = combinedSchedules.sort(
        (a, b) => a.arrplandtime - b.arrplandtime
      );
      // 20개씩 묶기
      const chunkedSchedules = [];
      for (let i = 0; i < sortedSchedules.length; i += 20) {
        chunkedSchedules.push(sortedSchedules.slice(i, i + 20));
      }

      // chunkedSchedules 배열에 key 추가
      const schedulesWithKey = chunkedSchedules.map((chunk, index) => ({
        key: index + 1,
        schedules: chunk,
      }));

      // 결과를 상태에 저장
      console.log(">>>", schedulesWithKey);
      setCurrentPage(1);
      setTrainSchedule(schedulesWithKey);
    } catch (error) {
      console.error("Error fetching train schedules:", error);
    } finally {
      setLoading(false);
    }
  };
  const currentSchedule = trainSchedule[currentPage - 1]?.schedules || [];
  const handlePageChange = (page) => {
    if (page >= 1 && page <= trainSchedule.length) {
      setCurrentPage(page);
    }
  };

  return (
    <TrafficBox>
      <Container>
        <div className="menu-box">
          <div className="menu-title">출발일</div>
          <div className="datepicker">
            <div className="select-content">
              <DatePickerContainer className="datepicker-component">
                <DatePicker
                  className="input-date-picker"
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  dateFormatCalendar="yyyy년 MM월"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  startDate={date}
                  minDate={new Date()}
                  maxDate={new Date().setDate(new Date().getDate() + 6)}
                  placeholderText="시작일 선택"
                />
              </DatePickerContainer>
            </div>
          </div>
        </div>
        <div className="menu-box">
          <VehicleKindContainer>
            <div className="menu-title">차량 종류</div>
            <div className="select-content">
              <div className="checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                  <span className="checkbox-name">전체 선택</span>
                </label>

                {ExpressGradeService.map((vehicle) => (
                  <label key={vehicle.GradeId}>
                    <input
                      type="checkbox"
                      checked={selectedVehicles.includes(vehicle.GradeId)}
                      onChange={() => handleVehicleClick(vehicle)}
                    />
                    <button
                      className="checkbox-name"
                      onClick={() => handleVehicleClick(vehicle)}
                    >
                      {vehicle.GradeNm}
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </VehicleKindContainer>
        </div>
        <div className="menu-box">
          <SelectStationContainer>
            <div className="menu-title">출발지</div>
            <div className="select-content">
              <SelectExpressStation
                area={departureArea}
                setArea={setDepartureArea}
                city={departureCity}
                setCity={setDepartureCity}
                station={departureStation}
                setStation={setDepartureStation}
                setStationCode={setDepartureStationCode}
                code={ExpressServiceCode}
                placeHolder={"출발지 선택"}
              />
            </div>
          </SelectStationContainer>
        </div>
        <div className="menu-box">
          <SelectStationContainer>
            <div className="menu-title">도착지</div>
            <div className="select-content">
              <SelectExpressStation
                area={arrivalArea}
                setArea={setArrivalArea}
                city={arrivalCity}
                setCity={setArrivalCity}
                station={arrivalStation}
                setStation={setArrivalStation}
                setStationCode={setArrivalStationCode}
                code={ExpressServiceCode}
                placeHolder={"도착지 선택"}
              />
            </div>
          </SelectStationContainer>
        </div>
        <Button
          className="search-button"
          disabled={!isSearchButtonEnabled || loading}
          onClick={() => getTrainSchedules()}
        >
          {loading ? (
            <>
              <span>조회중...</span>
            </>
          ) : (
            <>
              <span>조회하기</span>
              <FaSearch style={{ marginLeft: "8px" }} />
            </>
          )}
        </Button>
      </Container>
      <ScheduleResult>
        <table className="result-table">
          <thead>
            <tr>
              <th>차량 종류</th>
              <th>출발지</th>
              <th>도착지</th>
              <th>출발 시간</th>
              <th>도착 시간</th>
              <th>요금</th>
            </tr>
          </thead>
          {trainSchedule && trainSchedule.length === 0 ? (
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">조회중...</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="6">조회된 시간표가 없습니다.</td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              {currentSchedule.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.gradeNm}</td>
                  <td>{schedule.depPlaceNm}</td>
                  <td>{schedule.arrPlaceNm}</td>
                  <td>{`${String(schedule.depPlandTime).slice(
                    8,
                    10
                  )} : ${String(schedule.depPlandTime).slice(10, 12)}`}</td>
                  <td>{`${String(schedule.arrPlandTime).slice(
                    8,
                    10
                  )} : ${String(schedule.arrPlandTime).slice(10, 12)}`}</td>
                  <td>{Number(schedule.charge).toLocaleString()} 원</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {trainSchedule && trainSchedule.length > 0 && (
          <>
            <Pagination
              currentPage={currentPage - 1}
              totalPages={trainSchedule.length}
              handlePageChange={(page) => handlePageChange(page + 1)}
            />
            <div className="inform">
              <span>
                ※본 정보는 한국철도공사의 사정에 따라 변경될 수 있습니다.
                최신정보 확인은{" "}
                <a
                  href="https://www.letskorail.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  한국철도공사 홈페이지
                </a>
                에서 확인하시기 바랍니다.
              </span>
            </div>
          </>
        )}
      </ScheduleResult>
    </TrafficBox>
  );
};

export default Express;
