import { Header, Footer } from "../../Component/GlobalComponent";
import { useState, useEffect } from "react";
import { areas, themes } from "../../Util/Common";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "../../Component/ButtonComponent";
import { SelectTourItem } from "../../Style/ItemListStyled";

export const TourList = () => {
  const { areaCode, subAreaCode } = useParams();
  const location = useLocation();
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [selectedSubAreaCode, setSelectedSubAreaCode] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSelectedAreaCode(areaCode || queryParams.get("area") || "");
    setSelectedSubAreaCode(queryParams.get("subarea") || "");
    setSelectedTheme(queryParams.get("theme") || "");
    setSelectedCategory(queryParams.get("category") || "");
  }, [areaCode, location.search]); // URL이 변경될 때마다 실행

  // 모든 선택 초기화
  const handleResetSelections = () => {
    setSelectedAreaCode("");
    setSelectedSubAreaCode("");
    setSelectedTheme("");
    setSelectedCategory("");
    window.history.replaceState({}, "", "/tourlist");
  };

  const handleAreaChange = (areaCode) => {
    let queryParams = new URLSearchParams();

    // 지역을 선택한 경우
    if (selectedAreaCode === areaCode) {
      setSelectedAreaCode(""); // 지역 초기화
      setSelectedSubAreaCode(""); // 세부지역 초기화
      queryParams.delete("area"); // URL에서 area 파라미터 삭제
      queryParams.delete("subarea"); // URL에서 subarea 파라미터 삭제
    } else {
      setSelectedAreaCode(areaCode);
      setSelectedSubAreaCode(""); // 세부지역 초기화
      queryParams.set("area", areaCode); // 선택한 지역을 URL에 추가
    }

    // 테마, 카테고리, 세부지역 관련 값들을 쿼리에 추가
    if (selectedTheme) queryParams.set("theme", selectedTheme);
    if (selectedCategory) queryParams.set("category", selectedCategory);

    // URL을 업데이트 (pushState로 상태 변경)
    window.history.pushState(
      {},
      "",
      `/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    );
  };

  const handleSubAreaChange = (subAreaCode) => {
    const queryParams = new URLSearchParams();
    if (selectedTheme) queryParams.append("theme", selectedTheme);
    if (selectedCategory) queryParams.append("category", selectedCategory);

    if (selectedSubAreaCode === subAreaCode) {
      setSelectedSubAreaCode("");
    } else {
      setSelectedSubAreaCode(subAreaCode);
      queryParams.append("subarea", subAreaCode);
    }

    const queryStr = queryParams.toString();
    window.history.pushState(
      {},
      "",
      `/tourlist${selectedAreaCode ? `?area=${selectedAreaCode}` : ""}${
        queryStr ? `&${queryStr}` : ""
      }`
    );
  };

  const handleThemeChange = (theme) => {
    let queryParams = new URLSearchParams();

    if (selectedAreaCode) queryParams.append("area", selectedAreaCode);
    if (selectedSubAreaCode) queryParams.append("subarea", selectedSubAreaCode);
    if (selectedCategory) queryParams.append("category", selectedCategory);

    if (selectedTheme === theme) {
      setSelectedTheme(""); // 테마 선택 취소
    } else {
      setSelectedTheme(theme); // 테마 선택
      queryParams.append("theme", theme);
    }

    const queryStr = queryParams.toString();
    window.history.pushState(
      {},
      "",
      `/tourlist${queryStr ? `?${queryStr}` : ""}`
    );
  };

  const handleCategoryChange = (category) => {
    let queryParams = new URLSearchParams();

    if (selectedAreaCode) queryParams.append("area", selectedAreaCode);
    if (selectedSubAreaCode) queryParams.append("subarea", selectedSubAreaCode);
    if (selectedTheme) queryParams.append("theme", selectedTheme);

    if (selectedCategory === category) {
      setSelectedCategory(""); // 카테고리 선택 취소
    } else {
      setSelectedCategory(category); // 카테고리 선택
      queryParams.append("category", category);
    }

    const queryStr = queryParams.toString();
    window.history.pushState(
      {},
      "",
      `/tourlist${queryStr ? `?${queryStr}` : ""}`
    );
  };

  const selectedAreaData = areas.find((area) => area.code === selectedAreaCode);

  return (
    <>
      <Header />
      <Button onClick={handleResetSelections} style={{ marginBottom: "10px" }}>
        선택 초기화
      </Button>
      <SelectTourItem>
        <div className="mainarea">
          <h3>지역 선택</h3>
          {areas.map((area) => (
            <Button
              key={area.code}
              onClick={() => handleAreaChange(area.code)}
              className={`area-button ${
                selectedAreaCode === area.code ? "selected" : ""
              }`}
            >
              {area.name}
            </Button>
          ))}
        </div>
        {selectedAreaData && (
          <div className="subarea">
            <h3>세부 지역 선택</h3>
            {selectedAreaData.subAreas.map((subArea) => (
              <Button
                key={subArea.code}
                onClick={() => handleSubAreaChange(subArea.code)}
                className={`subarea-button ${
                  selectedSubAreaCode === subArea.code ? "selected" : ""
                }`}
              >
                {subArea.name}
              </Button>
            ))}
          </div>
        )}
        <div className="theme">
          <h3>테마 선택</h3>
          {themes.map((theme) => (
            <Button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className={`theme-button ${
                selectedTheme === theme ? "selected" : ""
              }`}
            >
              {theme}
            </Button>
          ))}
        </div>
        <div className="category">
          <h3>카테고리 선택</h3>
          {["관광지", "숙소", "음식점"].map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-button ${
                selectedCategory === category ? "selected" : ""
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </SelectTourItem>
      <Footer />
    </>
  );
};
