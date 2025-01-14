import React, { useState } from "react";
import StationComponent from "../../Component/KtxStationComponent";
import DateComponent from "../../Component/KtxDateComponent";
import PassengerComponent from "../../Component/PassengerComponent"; // 인원 선택 컴포넌트 import
import { 
  KtxInquiryWrapper, 
  KtxInquiryBox, 
  StationBox, 
  DateBox, 
  ModalContainer, 
  SwapButton,
  DateModal, 
  SelectBoxWrapper, 
  CheckBoxLabel, 
  PassBox
} from "../../Style/TrafficStyle"

const KtxInquiry = () => {
  const [departureModal, setDepartureModal] = useState(false);
  const [arrivalModal, setArrivalModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDeparture, setSelectedDeparture] = useState("");
  const [selectedArrival, setSelectedArrival] = useState("");
  const [isRoundTrip, setIsRoundTrip] = useState(false); // 왕복 체크 상태 추가
  const [passengerModal, setPassengerModal] = useState(false); // 인원 선택 모달 상태

  const toggleModal = (type) => {
    if (type === "departure") setDepartureModal(!departureModal);
    if (type === "arrival") setArrivalModal(!arrivalModal);
    if (type === "date") setDateModal(!dateModal);
    if (type === "passenger") setPassengerModal(!passengerModal); // 인원 선택 모달 토글
  };

  const handleSwap = () => {
    setSelectedDeparture(selectedArrival); // 출발역에 도착역 값을 설정
    setSelectedArrival(selectedDeparture); // 도착역에 출발역 값을 설정
  };

  const handleRoundTripChange = () => {
    setIsRoundTrip(!isRoundTrip); // 왕복 체크 상태 변경
  };

  return (
    <KtxInquiryWrapper>
      <KtxInquiryBox>
        {/* 출발역 */}
        <StationBox align="flex-start">
          <label>출발역</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="출발역 선택"
              value={selectedDeparture}
              onClick={() => toggleModal("departure")}
              readOnly
            />
            <button className="search-btn" onClick={() => toggleModal("departure")}>
              🔍
            </button>
          </div>
          {departureModal && (
            <ModalContainer>
              <StationComponent
                toggleModal={() => toggleModal("departure")}
                type="departure"
                setSelectedStation={setSelectedDeparture}
              />
            </ModalContainer>
          )}
        </StationBox>

        {/* 스왑 버튼 */}
        <SwapButton onClick={handleSwap}>↔️</SwapButton>

        {/* 도착역 */}
        <StationBox align="flex-end">
          <label>도착역</label>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="도착역 선택"
              value={selectedArrival}
              onClick={() => toggleModal("arrival")}
              readOnly
            />
            <button className="search-btn" onClick={() => toggleModal("arrival")}>
              🔍
            </button>
          </div>
          {arrivalModal && (
            <ModalContainer>
              <StationComponent
                toggleModal={() => toggleModal("arrival")}
                type="arrival"
                setSelectedStation={setSelectedArrival}
              />
            </ModalContainer>
          )}
        </StationBox>
      </KtxInquiryBox>

      {/* 일정 · 인원 선택 | 왕복 (체크버튼) */}
      <SelectBoxWrapper>
        <span>일정 · 인원 선택 | </span>
        <CheckBoxLabel>
          <input
            type="checkbox"
            checked={isRoundTrip}
            onChange={handleRoundTripChange}
          />
          왕복
        </CheckBoxLabel>
      </SelectBoxWrapper>

      {/* 날짜 선택 */}
      <DateBox>
        <label>가는날</label>
        <input
          type="text"
          placeholder="날짜 선택"
          value={selectedDate || ""}
          onClick={() => toggleModal("date")}
          readOnly
        />
        {dateModal && (
          <DateModal>
            <DateComponent toggleModal={() => toggleModal("date")} setSelectedDate={setSelectedDate} />
          </DateModal>
        )}
      </DateBox>

      <PassBox align="flex-start">
        <label>인원 선택</label>
        <div className="input-with-icon">
          <input
            type="text"
            placeholder="인원 선택"
            onClick={() => toggleModal("passenger")}
            readOnly
          />
          <button className="search-btn" onClick={() => toggleModal("passenger")}>
            🔍
          </button>
        </div>
        {passengerModal && (
          <ModalContainer>
            <PassengerComponent toggleModal={() => toggleModal("passenger")} />
          </ModalContainer>
        )}
      </PassBox>
    </KtxInquiryWrapper>
  );
};

export default KtxInquiry;
