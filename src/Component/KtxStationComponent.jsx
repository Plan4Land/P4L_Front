import React, { useState, useEffect } from "react";
import loadCsv from "../Util/loadCsv";

const StationComponent = ({ toggleModal, type, setSelectedStation }) => {
  const [stations, setStations] = useState([]);
  const [regions, setRegions] = useState([]);
  const [viewType, setViewType] = useState("region");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedConsonant, setSelectedConsonant] = useState("");
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);
  const [currentConsonantIndex, setCurrentConsonantIndex] = useState(0);  // 자음 인덱스 추가

  const consonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

  useEffect(() => {
    const fetchData = async () => {
      const stationData = await loadCsv("/KTX3.csv");
      const regionData = await loadCsv("/KTX2.csv");
      setStations(stationData);
      setRegions(regionData);
    };
    fetchData();
  }, []);

  const handleConsonantClick = (consonant) => {
    setSelectedConsonant(consonant);
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const handleArrowClick = (direction, type) => {
    if (type === "region") {
      if (direction === "left" && currentRegionIndex > 0) {
        setCurrentRegionIndex(currentRegionIndex - 3);
      } else if (direction === "right" && currentRegionIndex + 3 < regions.length) {
        setCurrentRegionIndex(currentRegionIndex + 3);
      }
    } else if (type === "consonant") {
      if (direction === "left" && currentConsonantIndex > 0) {
        setCurrentConsonantIndex(currentConsonantIndex - 5);
      } else if (direction === "right" && currentConsonantIndex + 5 < consonants.length) {
        setCurrentConsonantIndex(currentConsonantIndex + 5);
      }
    }
  };

  const getInitialConsonant = (str) => {
    const koreanChars = str.charCodeAt(0);
    if (koreanChars < 0xAC00 || koreanChars > 0xD7A3) {
      return "";  // 한글이 아니면 빈 문자열 반환
    }

    const initialConsonant = Math.floor((koreanChars - 0xAC00) / 28 / 21);
    const initialConsonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    return initialConsonants[initialConsonant];
  };

  const filteredStations =
    selectedConsonant === ""
      ? stations
      : stations.filter((station) =>
          station.StationName && getInitialConsonant(station.StationName) === selectedConsonant
        );

  const filteredByRegion =
    selectedRegion === ""
      ? filteredStations
      : filteredStations.filter(
          (station) => station.CityName === selectedRegion
        );

  const handleStationClick = (station) => {
    setSelectedStation(station.StationName);  // 출발역 이름을 부모로 전달
    toggleModal();  // 모달 닫기
  };

  return (
    <div className="station-modal">
      <div className="modal-header" style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => setViewType("region")}>지역순</button>
        <button onClick={() => setViewType("consonant")}>가나다순</button>
        <button className="close-btn" onClick={toggleModal} style={{ position: "absolute", top: 10, right: 10 }}>X</button>
      </div>

      {viewType === "region" && (
        <div className="region-list" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <button className="arrow left" onClick={() => handleArrowClick("left", "region")}>◀</button>
          {regions.slice(currentRegionIndex, currentRegionIndex + 3).map((region) => (
            <button key={region.CityCode} onClick={() => handleRegionClick(region.CityName)} style={{ margin: "5px" }}>
              {region.CityName}
            </button>
          ))}
          <button className="arrow right" onClick={() => handleArrowClick("right", "region")}>▶</button>
        </div>
      )}

      {viewType === "consonant" && (
        <div className="consonant-list">
          <button className="arrow left" onClick={() => handleArrowClick("left", "consonant")}>◀</button>
          {consonants.slice(currentConsonantIndex, currentConsonantIndex + 5).map((consonant) => (
            <button key={consonant} onClick={() => handleConsonantClick(consonant)}>{consonant}</button>
          ))}
          <button className="arrow right" onClick={() => handleArrowClick("right", "consonant")}>▶</button>
        </div>
      )}

      <div className="station-list" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {filteredByRegion.map((station) => (
          <div key={station.StationCode} onClick={() => handleStationClick(station)}>{station.StationName}</div>
        ))}
      </div>
    </div>
  );
};

export default StationComponent;
