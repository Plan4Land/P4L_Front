import { useState } from "react";
import { KTXServiceCode } from "../../Util/Service_KTX_code";
import { Vehiclekind } from "../../Util/Service_VehicleKind_code";
import {
  Container,
  SelectStationContainer,
  VehicleKindContainer,
  ScheduleResult,
} from "../../Style/TrainStyle";
import { SelectStationComponent } from "../../Component/TrafficComponents/SelectStation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { DatePickerContainer } from "../../Style/PlanningStyled";
import { Button } from "../../Component/ButtonComponent";
import { KTXApi } from "../../Api/TrafficApi";
import { Pagination } from "../../Component/Pagination";
import { FaSearch } from "react-icons/fa";

const Train = () => {
  const [departureArea, setDepartureArea] = useState(null);
  const [departureStation, setDepartureStation] = useState(null);
  const [departureStationCode, setDepartureStationCode] = useState(null);
  const [arrivalArea, setArrivalArea] = useState(null);
  const [arrivalStation, setArrivalStation] = useState(null);
  const [arrivalStationCode, setArrivalStationCode] = useState(null);

  const [date, setDate] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [trainSchedule, setTrainSchedule] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const allVehicleCodes = Vehiclekind.flatMap((vehicle) =>
    vehicle.subKinds
      ? [...vehicle.subKinds.map((sub) => sub.VehicleKindCode)]
      : [vehicle.VehicleKindCode]
  );

  const allSelected = selectedVehicles.length === allVehicleCodes.length;

  const handleVehicleClick = (vehicle) => {
    let updatedVehicles = [...selectedVehicles];

    if (vehicle.subKinds) {
      vehicle.subKinds.forEach((sub) => {
        if (!updatedVehicles.includes(sub.VehicleKindCode)) {
          updatedVehicles.push(sub.VehicleKindCode);
        } else {
          updatedVehicles = updatedVehicles.filter(
            (code) => code !== sub.VehicleKindCode
          );
        }
      });
    } else {
      if (updatedVehicles.includes(vehicle.VehicleKindCode)) {
        updatedVehicles = updatedVehicles.filter(
          (code) => code !== vehicle.VehicleKindCode
        );
      } else {
        updatedVehicles.push(vehicle.VehicleKindCode);
      }
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
      const response = await KTXApi.getSchedule(
        departureStationCode,
        arrivalStationCode,
        formattedDate,
        selectedVehicles
      );
      console.log(response); // API 응답 처리
      const combinedSchedules = response.flat();
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
    // 가희님.. 저도 알아요. 개구린거.. 그냥 "타고"홈페이지처럼 내일 바꿀게요..
    // 그리고 api 호출해서 로그정도 찍어놓긴 했는데 근데.. 음.. 조회 다 안되는거같은데..
    <>
      <Container>
        <div className="menu-box">
          <div className="datepicker">
            <div className="menu-title">출발일</div>
            <div className="select-content">
              <DatePickerContainer className="datepicker-component">
                <DatePicker
                  className="input-date-picker"
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  dateFormatCalendar="yyyy년 MM월"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  // selectsStart
                  startDate={date}
                  // endDate={endDate}
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

                {Vehiclekind.map((vehicle) => (
                  <label key={vehicle.VehicleKindCode}>
                    <input
                      type="checkbox"
                      checked={selectedVehicles.includes(
                        vehicle.VehicleKindCode
                      )}
                      onChange={() => handleVehicleClick(vehicle)}
                    />
                    <button
                      className="checkbox-name"
                      onClick={() => handleVehicleClick(vehicle)}
                    >
                      {vehicle.VehicleKindName}
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
              <SelectStationComponent
                area={departureArea}
                setArea={setDepartureArea}
                station={departureStation}
                setStation={setDepartureStation}
                setStationCode={setDepartureStationCode}
                code={KTXServiceCode}
                placeHolder={"출발역 선택"}
              />
            </div>
          </SelectStationContainer>
        </div>
        <div className="menu-box">
          <SelectStationContainer>
            <div className="menu-title">도착지</div>
            <div className="select-content">
              <SelectStationComponent
                area={arrivalArea}
                setArea={setArrivalArea}
                station={arrivalStation}
                setStation={setArrivalStation}
                setStationCode={setArrivalStationCode}
                code={KTXServiceCode}
                placeHolder={"도착역 선택"}
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
                  <td>{schedule.traingradename}</td>
                  <td>{schedule.depplacename}</td>
                  <td>{schedule.arrplacename}</td>
                  <td>{`${String(schedule.depplandtime).slice(8, 10)}:${String(
                    schedule.depplandtime
                  ).slice(10, 12)}`}</td>
                  <td>{`${String(schedule.arrplandtime).slice(8, 10)}:${String(
                    schedule.arrplandtime
                  ).slice(10, 12)}`}</td>
                  <td>{Number(schedule.adultcharge).toLocaleString()} 원</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {trainSchedule && trainSchedule.length > 0 && (
          <Pagination
            currentPage={currentPage - 1}
            totalPages={trainSchedule.length}
            handlePageChange={(page) => handlePageChange(page + 1)}
          />
        )}
      </ScheduleResult>
    </>
  );
};

export default Train;
