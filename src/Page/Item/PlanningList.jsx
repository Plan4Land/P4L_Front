import { Header, Footer } from "../../Component/GlobalComponent";
import { useState, useEffect } from "react";
import { areas, themes } from "../../Util/Common";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, ToggleButton } from "../../Component/ButtonComponent";
import { SelectTourItem, SearchSt } from "../../Style/ItemListStyled";
import { FaSearch, FaUndo } from "react-icons/fa";

export const PlanningList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { areaCode, subAreaCode } = useParams();
  const location = useLocation();
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [selectedSubAreaCode, setSelectedSubAreaCode] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [isAreaOpen, setIsAreaOpen] = useState(true); // 지역 선택 토글 상태
  const [isSubAreaOpen, setIsSubAreaOpen] = useState(true); // 세부지역 선택 토글 상태
  const [isThemeOpen, setIsThemeOpen] = useState(true);

  const handleToggleArea = () => setIsAreaOpen(!isAreaOpen);
  const handleToggleSubArea = () => setIsSubAreaOpen(!isSubAreaOpen);
  const handleToggleTheme = () => setIsThemeOpen(!isThemeOpen);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSelectedAreaCode(areaCode || queryParams.get("area") || "");
    setSelectedSubAreaCode(queryParams.get("subarea") || "");
    setSelectedTheme(queryParams.get("theme") || "");
  }, [areaCode, location.search]); // URL이 변경될 때마다 실행

  // 모든 선택 초기화
  const handleResetSelections = () => {
    setSelectedAreaCode("");
    setSelectedSubAreaCode("");
    setSelectedTheme("");
    setSearchQuery(""); // 검색어도 초기화
    navigate("/planninglist"); // URL 쿼리 파라미터 제거
  };

  const handleSearch = () => {
    if (searchQuery.length < 2) {
      alert("검색어는 2자리 이상 입력해 주세요.");
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    queryParams.set("search", searchQuery); // 검색어 추가

    navigate(
      `/planninglist${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAreaChange = (areaCode) => {
    const isSameArea = selectedAreaCode === areaCode;
    const newAreaCode = isSameArea ? "" : areaCode;

    // Query parameters 업데이트
    let queryParams = new URLSearchParams(location.search);

    if (newAreaCode) {
      queryParams.set("area", newAreaCode); // 새로운 지역 코드 설정
    } else {
      queryParams.delete("area"); // 지역이 취소된 경우 area 파라미터 삭제
    }

    // 세부 지역 초기화
    if (!newAreaCode) {
      queryParams.delete("subarea");
    }

    // URL 변경
    navigate(
      `/planninglist${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`
    );

    // 상태 업데이트
    setSelectedAreaCode(newAreaCode);
    setSelectedSubAreaCode("");
  };

  const handleSubAreaChange = (subAreaCode) => {
    const queryParams = new URLSearchParams(location.search);

    if (selectedSubAreaCode === subAreaCode) {
      queryParams.delete("subarea"); // 세부지역 선택 취소
      setSelectedSubAreaCode("");
    } else {
      queryParams.set("subarea", subAreaCode); // 새로운 세부지역 설정
      setSelectedSubAreaCode(subAreaCode);
    }

    // 기존 검색어 유지
    if (searchQuery) queryParams.set("search", searchQuery);

    navigate(
      `/planninglist${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`
    );
  };

  const handleThemeChange = (theme) => {
    const queryParams = new URLSearchParams(location.search);

    if (selectedTheme === theme) {
      queryParams.delete("theme"); // 테마 선택 취소
      setSelectedTheme("");
    } else {
      queryParams.set("theme", theme); // 새로운 테마 설정
      setSelectedTheme(theme);
    }

    // 기존 검색어 유지
    if (searchQuery) queryParams.set("search", searchQuery);

    navigate(
      `/planninglist${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`
    );
  };

  const selectedAreaData = areas.find((area) => area.code === selectedAreaCode);

  return (
    <>
      <Header />
      <SelectTourItem>
        <button className="reset-button" onClick={handleResetSelections}>
          초기화
          <FaUndo style={{ marginLeft: "6px" }} />
        </button>
        <SearchSt>
          <div className="search-wrapper">
            <input
              type="text"
              className="search"
              placeholder="제목 검색!"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // 검색어 업데이트
              onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
            />
            <button className="search-button" onClick={handleSearch}>
              <FaSearch /> {/* 검색 아이콘 */}
            </button>
          </div>
        </SearchSt>
        <div className="mainarea">
          <h3>
            지역 선택
            <ToggleButton isOpen={isAreaOpen} onToggle={handleToggleArea} />
          </h3>
          {isAreaOpen && (
            <div>
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
          )}
        </div>
        {selectedAreaData && (
          <div className="subarea">
            <h3>
              세부 지역 선택{" "}
              <ToggleButton
                isOpen={isSubAreaOpen}
                onToggle={handleToggleSubArea}
              />
            </h3>
            {isSubAreaOpen && (
              <div>
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
          </div>
        )}
        <div className="theme">
          <h3>
            테마 선택{" "}
            <ToggleButton isOpen={isThemeOpen} onToggle={handleToggleTheme} />
          </h3>
          {isThemeOpen && (
            <div>
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
          )}
        </div>
      </SelectTourItem>
      <Footer />
    </>
  );
};
