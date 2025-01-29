import { useEffect, useState } from "react";
import { KTXServiceCode } from "../../Util/Service_KTX_code";
import { Vehiclekind } from "../../Util/Service_VehicleKind_code";
import {
  Container,
  SelectStationContainer,
  VehicleKindContainer,
} from "../../Style/TrainStyle";
import { SelectStationComponent } from "../../Component/TrafficComponents/SelectStation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { DatePickerContainer } from "../../Style/PlanningStyled";
import { Button } from "../../Component/ButtonComponent";
import { KTXApi } from "../../Api/TrafficApi";

const Train = () => {
  const [departureArea, setDepartureArea] = useState(null);
  const [departureStation, setDepartureStation] = useState(null);
  const [departureStationCode, setDepartureStationCode] = useState(null);
  const [departureModal, setDepartureModal] = useState(false);
  const [arrivalArea, setArrivalArea] = useState(null);
  const [arrivalStation, setArrivalStation] = useState(null);
  const [arrivalStationCode, setArrivalStationCode] = useState(null);
  const [arrivalModal, setArrivalModal] = useState(false);

  const [date, setDate] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const toggleDepartureModal = () => {
    setDepartureModal(!departureModal);
    if (arrivalModal) setArrivalModal(false);
  };

  const toggleArrivalModal = () => {
    setArrivalModal(!arrivalModal);
    if (departureModal) setDepartureModal(false);
  };

  const handleVehicleClick = (vehicle) => {
    let updatedVehicles = [...selectedVehicles];

    // 서브 항목이 있는 경우 해당 서브 항목만 추가/삭제
    if (vehicle.subKinds) {
      vehicle.subKinds.forEach((sub) => {
        // 서브 항목이 선택되지 않은 상태라면 추가
        if (!updatedVehicles.includes(sub.VehicleKindCode)) {
          updatedVehicles.push(sub.VehicleKindCode);
        } else {
          // 서브 항목이 이미 선택되어 있다면 제거
          updatedVehicles = updatedVehicles.filter(
            (code) => code !== sub.VehicleKindCode
          );
        }
      });
    } else {
      // 서브 항목이 없으면 해당 코드만 추가/삭제
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

  const isSearchButtonEnabled =
    departureStationCode &&
    arrivalStationCode &&
    date &&
    selectedVehicles.length > 0;

  const getTrainSchedules = async () => {
    try {
      const formattedDate = format(date, "yyyyMMdd");
      const response = await KTXApi.getSchedule(
        departureStationCode,
        arrivalStationCode,
        formattedDate,
        selectedVehicles
      );
      console.log(response); // API 응답 처리
    } catch (error) {
      console.error("Error fetching train schedules:", error);
    }
  };

  return (
    // 가희님.. 저도 알아요. 개구린거.. 그냥 "타고"홈페이지처럼 내일 바꿀게요..
    // 그리고 api 호출해서 로그정도 찍어놓긴 했는데 근데.. 음.. 조회 다 안되는거같은데..
    <Container>
      <SelectStationContainer>
        <SelectStationComponent
          modal={departureModal}
          setModal={toggleDepartureModal}
          area={departureArea}
          setArea={setDepartureArea}
          station={departureStation}
          setStation={setDepartureStation}
          setStationCode={setDepartureStationCode}
          code={KTXServiceCode}
          placeHolder={"출발역 선택"}
        />
        <SelectStationComponent
          modal={arrivalModal}
          setModal={toggleArrivalModal}
          area={arrivalArea}
          setArea={setArrivalArea}
          station={arrivalStation}
          setStation={setArrivalStation}
          setStationCode={setArrivalStationCode}
          code={KTXServiceCode}
          placeHolder={"도착역 선택"}
        />
      </SelectStationContainer>
      <DatePickerContainer className="datepicker">
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
          placeholderText="시작일 선택"
        />
      </DatePickerContainer>
      <VehicleKindContainer>
        {Vehiclekind.map((vehicle) => (
          <div key={vehicle.VehicleKindCode}>
            {/* 메인 차량 종류 버튼 */}
            <Button
              onClick={() => handleVehicleClick(vehicle)}
              bgcolor={
                selectedVehicles.includes(vehicle.VehicleKindCode)
                  ? "lightblue"
                  : "white"
              }
              color={"black"}
            >
              {vehicle.VehicleKindName}
            </Button>
          </div>
        ))}
      </VehicleKindContainer>
      <Button
        className="search-button"
        disabled={!isSearchButtonEnabled}
        onClick={() => getTrainSchedules()}
      >
        조회하기
      </Button>
    </Container>
  );
};

export default Train;
