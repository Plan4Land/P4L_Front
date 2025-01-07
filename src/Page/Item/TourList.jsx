import { Header, Footer } from "../../Component/GlobalComponent";
import { useState, useEffect } from "react";
import { areas, themes } from "../../Util/Common";
import { useParams, useLocation } from "react-router-dom";
import { Button } from "../../Component/ButtonComponent";
import { SelectTourItem } from "../../Style/TourListStyled";

export const TourList = () => {
  const { areaCode, subAreaCode } = useParams();
  const location = useLocation();
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [selectedSubAreaCode, setSelectedSubAreaCode] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setSelectedAreaCode(""); // 지역 초기화
    setSelectedSubAreaCode(""); // 세부지역 초기화
    setSelectedTheme(""); // 테마 초기화
    setSelectedCategory(""); // 카테고리 초기화
    window.history.replaceState({}, "", "/tourlist");
  }, []);

  // 지역 선택
  const handleAreaChange = (areaCode) => {
    if (selectedAreaCode === areaCode) {
      setSelectedAreaCode("");
      setSelectedSubAreaCode("");
      window.history.replaceState(
        {},
        "",
        `/tourlist${selectedTheme ? `?theme=${selectedTheme}` : ""}${
          selectedCategory ? `&category=${selectedCategory}` : ""
        }`
      );
    } else {
      setSelectedAreaCode(areaCode);
      setSelectedSubAreaCode("");
      window.history.pushState(
        {},
        "",
        `/tourlist/${areaCode}${
          selectedTheme ? `?theme=${selectedTheme}` : ""
        }${selectedCategory ? `&category=${selectedCategory}` : ""}`
      );
    }
  };

  // 세부지역 선택
  const handleSubAreaChange = (subAreaCode) => {
    if (selectedSubAreaCode === subAreaCode) {
      setSelectedSubAreaCode("");
      window.history.replaceState(
        {},
        "",
        `/tourlist${selectedAreaCode ? `/${selectedAreaCode}` : ""}${
          selectedTheme ? `?theme=${selectedTheme}` : ""
        }${selectedCategory ? `&category=${selectedCategory}` : ""}`
      );
    } else {
      setSelectedSubAreaCode(subAreaCode);
      window.history.pushState(
        {},
        "",
        `/tourlist${
          selectedAreaCode ? `/${selectedAreaCode}` : ""
        }/${subAreaCode}${selectedTheme ? `?theme=${selectedTheme}` : ""}${
          selectedCategory ? `&category=${selectedCategory}` : ""
        }`
      );
    }
  };

  // 테마 선택
  const handleThemeChange = (theme) => {
    if (selectedTheme === theme) {
      setSelectedTheme("");
      window.history.replaceState(
        {},
        "",
        `/tourlist${
          selectedAreaCode && selectedSubAreaCode
            ? `/${selectedAreaCode}/${selectedSubAreaCode}`
            : `/${selectedAreaCode}`
        }${selectedCategory ? `&category=${selectedCategory}` : ""}`
      );
    } else {
      setSelectedTheme(theme);
      window.history.pushState(
        {},
        "",
        `/tourlist${
          selectedAreaCode && selectedSubAreaCode
            ? `/${selectedAreaCode}/${selectedSubAreaCode}`
            : `/${selectedAreaCode}`
        }?theme=${theme}${
          selectedCategory ? `&category=${selectedCategory}` : ""
        }`
      );
    }
  };

  // 카테고리 선택
  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(""); // 선택된 카테고리 다시 클릭하면 취소
      window.history.replaceState(
        {},
        "",
        `/tourlist${
          selectedAreaCode && selectedSubAreaCode
            ? `/${selectedAreaCode}/${selectedSubAreaCode}`
            : ""
        }${selectedTheme ? `?theme=${selectedTheme}` : ""}`
      );
    } else {
      setSelectedCategory(category);
      window.history.pushState(
        {},
        "",
        `/tourlist${
          selectedAreaCode && selectedSubAreaCode
            ? `/${selectedAreaCode}/${selectedSubAreaCode}`
            : ""
        }${selectedTheme ? `?theme=${selectedTheme}` : ""}&category=${category}`
      );
    }
  };

  const selectedAreaData = areas.find((area) => area.code === selectedAreaCode);

  return (
    <>
      <Header />
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
