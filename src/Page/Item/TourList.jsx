import { Header, Footer } from "../../Component/GlobalComponent";
import { useState } from "react";
import { areas, themes } from "../../Util/Common";

export const TourList = () => {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSubArea, setSelectedSubArea] = useState("");

  const handleAreaChange = (areaName, areaCode) => {
    setSelectedArea(areaName);
    setSelectedSubArea("");
    window.history.pushState({}, "", `/tourlist/${areaCode}`); // URL 변경
  };

  const handleSubAreaChange = (subAreaName, subAreaCode) => {
    setSelectedSubArea(subAreaName);
    const areaCode = areas.find((area) => area.name === selectedArea).code;
    window.history.pushState({}, "", `/tourlist/${areaCode}/${subAreaCode}`); // URL 변경
  };

  const selectedAreaData = areas.find((area) => area.name === selectedArea);

  return (
    <>
      <Header />
      <div className="area-buttons">
        <h3>지역 선택</h3>
        {areas.map((area) => (
          <button
            key={area.name}
            onClick={() => handleAreaChange(area.name, area.code)} // 지역 코드 전달
            className={`area-button ${
              selectedArea === area.name ? "selected" : ""
            }`}
          >
            {area.name}
          </button>
        ))}
      </div>

      {selectedAreaData && (
        <div className="subarea-buttons">
          <h3>세부 지역 선택</h3>
          {selectedAreaData.subAreas.map((subArea) => (
            <button
              key={subArea.code}
              onClick={() => handleSubAreaChange(subArea.name, subArea.code)} // 세부 지역 코드 전달
              className={`subarea-button ${
                selectedSubArea === subArea.name ? "selected" : ""
              }`}
            >
              {subArea.name}
            </button>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};
