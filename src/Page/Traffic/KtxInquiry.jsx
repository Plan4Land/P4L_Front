import React, { useState, useEffect } from "react";
import StationComponent from "../../Component/StationComponent.jsx";
import DateComponent from "../../Component/DateComponent.jsx";
import { KtxContainer,
  StationGroup,
  StationField, 
  DateField, 
  StationButton, 
  DateModal, 
  DateButton, 
  PassengerSelectorBox, 
  PassengerModal, 
  ModalContent,
  CloseButton } from "../../Style/TrafficStyle.jsx";
import useCsvData from "../../Util/loadCsv.js";
import SeatTypeSelector from "../../Component/SeatTypeSelector.jsx";
import PassengerSelector from "../../Component/PassengerSelector.jsx";

const KtxInquiry = () => {
  const [isStationModalOpen, setStationModalOpen] = useState(false);
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 출발/도착 구분
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [dateInfo, setDateInfo] = useState("");

  const [regions, setRegions] = useState([]);
  const [stations, setStations] = useState([]);
  const [allStations, setAllStations] = useState([]);
  const [dateFieldPosition, setDateFieldPosition] = useState({ top: 0, left: 0 });
  const [selectedLetter, setSelectedLetter] = useState(""); // 선택된 한글 자음
  const [isPassengerModalOpen, setPassengerModalOpen] = useState(false); // 인원 선택 모달 열림 여부

  // CSV 데이터 로드
  const regionData = useCsvData("/KTX2.csv");
  const stationData = useCsvData("/KTX3.csv");

  useEffect(() => {
    if (regionData.length > 0) {
      const sortedRegions = regionData.map((row) => row.CityName).sort();
      setRegions(sortedRegions);
    }

    if (stationData.length > 0) {
      setStations(stationData);
      setAllStations(stationData);
    }
  }, [regionData, stationData]);

  useEffect(() => {
    if (selectedLetter) {
      const filteredStations = allStations.filter(station => station.StationName.startsWith(selectedLetter));
      setStations(filteredStations);
    } else {
      setStations(allStations);
    }
  }, [selectedLetter, allStations]);

  const handleStationSelect = (station) => {
    if (modalType === "departure") setDeparture(station);
    if (modalType === "arrival") setArrival(station);
    setStationModalOpen(false);
  };

  const handleDateApply = (date, time) => {
    setDateInfo(`${date.toLocaleDateString()} · ${time}시 이후 출발`);
    setDateModalOpen(false);
  };

  const handleDateClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setDateFieldPosition({ top: rect.top, left: rect.left });
    setDateModalOpen(true);
  };

  const handleSeatTypeChange = (newSeatType) => {
    console.log("좌석 유형 선택:", newSeatType);
  };

  const handlePassengerChange = (newAdult, newChild, newInfant, newElderly, newSevereDisability, newMildDisability) => {
    console.log("어른:", newAdult, "어린이:", newChild, "유아:", newInfant, "경로:", newElderly, "중증장애인:", newSevereDisability, "경증장애인:", newMildDisability);
  };

  return (
    <KtxContainer>
      <h1>KTX 조회</h1>
      <StationGroup>
        <StationField>
          <input
            placeholder="출발역"
            value={departure}
            onClick={() => {
              setModalType("departure");
              setStationModalOpen(true);
            }}
            readOnly
          />
          <StationButton
            onClick={() => {
              setModalType("departure");
              setStationModalOpen(true);
            }}
          >
            🔍
          </StationButton>
        </StationField>
        <StationField>
          <input
            placeholder="도착역"
            value={arrival}
            onClick={() => {
              setModalType("arrival");
              setStationModalOpen(true);
            }}
            readOnly
          />
          <StationButton
            onClick={() => {
              setModalType("arrival");
              setStationModalOpen(true);
            }}
          >
            🔍
          </StationButton>
        </StationField>
      </StationGroup>

      <DateField>
        <input
          placeholder="가는날"
          value={dateInfo}
          onClick={handleDateClick}
          readOnly
        />
        <DateButton onClick={handleDateClick}>📅</DateButton>
        {isDateModalOpen && (
          <DateModal style={{ top: dateFieldPosition.top, left: dateFieldPosition.left }}>
            <DateComponent
              onClose={() => setDateModalOpen(false)}
              onApply={handleDateApply}
            />
            <button style={{ position: "absolute", top: "10px", right: "10px" }} onClick={() => setDateModalOpen(false)}>X</button>
          </DateModal>
        )}
      </DateField>

      <SeatTypeSelector onSeatTypeChange={handleSeatTypeChange} />

      <PassengerSelectorBox onClick={() => setPassengerModalOpen(true)}>
        인원 선택
      </PassengerSelectorBox>

      {isPassengerModalOpen && (
        <PassengerModal>
          <ModalContent>
            <h3>인원 선택</h3>
            <PassengerSelector onPassengerChange={handlePassengerChange} />
            <CloseButton onClick={() => setPassengerModalOpen(false)}>
              적용
            </CloseButton>
          </ModalContent>
        </PassengerModal>
      )}

      {isStationModalOpen && (
        <StationComponent
          regions={regions}
          stations={stations}
          allStations={allStations}
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
          onStationSelect={handleStationSelect}
          onClose={() => setStationModalOpen(false)}
        />
      )}
    </KtxContainer>
  );
};

export default KtxInquiry;
