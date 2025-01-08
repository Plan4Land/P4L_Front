import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 스타일 컴포넌트
const Modal = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-height: 500px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const RegionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const RegionButton = styled.button`
  padding: 8px 12px;
  background: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }
`;

const StationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

const StationItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const LetterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const LetterButton = styled.button`
  padding: 8px 12px;
  background: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }
`;

const StationComponent = ({ regions, allStations, onStationSelect, onClose }) => {
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [sorting, setSorting] = useState("region"); // 'region' or 'alphabet'
  const [selectedLetter, setSelectedLetter] = useState("");

  // 지역을 클릭하면 해당 지역의 역을 필터링
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    // 해당 지역의 역만 필터링해서 보여줌
    const stationsInRegion = allStations.filter((station) => station.CityName === region);
    setFilteredStations(stationsInRegion);
  };

  // 가나다순을 클릭했을 때 ㄱ ~ ㅎ 자음 버튼을 보여주고 자음 클릭 시 해당 자음으로 시작하는 역을 필터링
  const handleLetterClick = (letter) => {
    setSelectedLetter(letter); // 선택된 자음을 설정
    const stationsInLetter = allStations.filter((station) => {
      return station.StationName && station.StationName.startsWith(letter); // 자음으로 시작하는 역만 필터링
    });

    if (stationsInLetter.length > 0) {
      setFilteredStations(stationsInLetter); // 필터된 역 목록을 상태에 설정
    } else {
      setFilteredStations([]); // 필터된 역이 없으면 빈 배열로 설정
    }
  };

  // 지역순 클릭 시, 역 이름을 초기화
  const handleSortingChange = (sortType) => {
    setSorting(sortType);
    setSelectedLetter(""); // 가나다순 선택 해제
    if (sortType === "region") {
      setFilteredStations([]); // 역 목록 초기화
    }
  };

  const handleStationClick = (stationName) => {
    // 역 이름을 부모 컴포넌트로 전달하여 출발역과 도착역 박스에 업데이트
    onStationSelect(stationName); // 선택된 역을 부모로 전달
  };

  return (
    <Modal>
      <CloseButton onClick={onClose}>✖</CloseButton>
      <h3>지역 선택</h3>
      <div>
        <button onClick={() => handleSortingChange("region")}>지역순</button>
        <button onClick={() => handleSortingChange("alphabet")}>가나다순</button>
      </div>

      {/* 가나다순을 클릭했을 때 자음 버튼을 보여주기 */}
      {sorting === "alphabet" && (
        <LetterList>
          {["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"].map((letter) => (
            <LetterButton key={letter} onClick={() => handleLetterClick(letter)}>
              {letter}
            </LetterButton>
          ))}
        </LetterList>
      )}

      {/* 지역순을 클릭했을 때 지역 목록을 보여주고, 지역을 클릭하면 해당 지역의 역을 필터링 */}
      {sorting === "region" && (
        <RegionList>
          {regions.map((region) => (
            <RegionButton key={region} onClick={() => handleRegionClick(region)}>
              {region}
            </RegionButton>
          ))}
        </RegionList>
      )}

      {/* 선택된 자음에 해당하는 역을 필터링하여 보여줌 */}
      {filteredStations.length > 0 && (
        <StationList>
          {filteredStations.map((station) => (
            <StationItem key={station.StationCode} onClick={() => handleStationClick(station.StationName)}>
              {station.StationName}
            </StationItem>
          ))}
        </StationList>
      )}
    </Modal>
  );
};

export default StationComponent;