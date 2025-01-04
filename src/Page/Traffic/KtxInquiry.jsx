import React, { useState, useEffect } from "react";
import { loadCsv } from "../../Util/loadCsv";

const KtxInquiry = () => {
  const [regions, setRegions] = useState([]); // 지역 데이터
  const [stations, setStations] = useState([]); // 전체 역 데이터
  const [selectedRegion, setSelectedRegion] = useState(""); // 선택된 지역
  const [filteredStations, setFilteredStations] = useState([]); // 필터링된 역 목록
  const [departureStation, setDepartureStation] = useState("출발역 선택");
  const [arrivalStation, setArrivalStation] = useState("도착역 선택");
  const [stationType, setStationType] = useState(""); // 'departure' or 'arrival'
  const [isRegionModalOpen, setRegionModalOpen] = useState(false);
  const [isStationModalOpen, setStationModalOpen] = useState(false);

  // CSV 파일 로드
  useEffect(() => {
    // 지역 데이터 로드
    loadCsv("/KTX2.csv", (data) => {
      const sortedRegions = data.map((row) => row.CityName).sort();
      setRegions(sortedRegions);
    });

    // 역 데이터 로드
    loadCsv("/KTX3.csv", (data) => {
      setStations(data);
    });
  }, []);

  // 지역 선택 시 필터링
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    const filtered = stations
      .filter((station) => station.CityName === region)
      .map((station) => station.StationName);
    setFilteredStations(filtered);
    setRegionModalOpen(false);
    setStationModalOpen(true);
  };

  // 역 선택
  const handleStationSelect = (station) => {
    if (stationType === "departure") {
      setDepartureStation(station);
    } else if (stationType === "arrival") {
      setArrivalStation(station);
    }
    setStationModalOpen(false);
  };

  return (
    <div>
      <h1>기차 조회</h1>
      {/* 출발역 선택 */}
      <div>
        <label>
          출발역:
          <button
            onClick={() => {
              setStationType("departure");
              setRegionModalOpen(true);
            }}
          >
            {departureStation}
          </button>
        </label>
      </div>

      {/* 도착역 선택 */}
      <div>
        <label>
          도착역:
          <button
            onClick={() => {
              setStationType("arrival");
              setRegionModalOpen(true);
            }}
          >
            {arrivalStation}
          </button>
        </label>
      </div>

      {/* 지역 선택 모달 */}
      {isRegionModalOpen && (
        <div className="modal">
          <h2>지역 선택</h2>
          {regions.map((region, idx) => (
            <button key={idx} onClick={() => handleRegionSelect(region)}>
              {region}
            </button>
          ))}
          <button onClick={() => setRegionModalOpen(false)}>닫기</button>
        </div>
      )}

      {/* 역 선택 모달 */}
      {isStationModalOpen && (
        <div className="modal">
          <br />
          {filteredStations.map((station, idx) => (
            <button key={idx} onClick={() => handleStationSelect(station)}>
              {station}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default KtxInquiry;
