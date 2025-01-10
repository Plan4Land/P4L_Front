import { Header, Footer } from "../../Component/GlobalComponent";
import { useState, useEffect } from "react";
import { areas, types } from "../../Util/Common";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, ToggleButton } from "../../Component/ButtonComponent";
import {
  SelectTourItem,
  SearchSt,
  List,
  ItemList,
} from "../../Style/ItemListStyled";
import { FaSearch, FaUndo } from "react-icons/fa";
import { ServiceCode } from "../../Util/Service_code_final";
import { TourItem } from "../../Component/ItemListComponent";
import { TravelSpotApi } from "../../Api/ItemApi";

export const TourList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { areaCode, subAreaCode } = useParams();
  const location = useLocation();
  const [selectedAreaCode, setSelectedAreaCode] = useState("");
  const [selectedSubAreaCode, setSelectedSubAreaCode] = useState("");
  const [selectedTopTheme, setSelectedTopTheme] = useState("");
  const [selectedMiddleTheme, setSelectedMiddleTheme] = useState("");
  const [selectedBottomTheme, setSelectedBottomTheme] = useState("");
  const [selectedBottomThemes, setSelectedBottomThemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isAreaOpen, setIsAreaOpen] = useState(true); // 지역 선택 토글 상태
  const [isSubAreaOpen, setIsSubAreaOpen] = useState(true); // 세부지역 선택 토글 상태
  const [isTopThemeOpen, setIsTopThemeOpen] = useState(true); // 대분류 토글 상태
  const [isMiddleThemeOpen, setIsMiddleThemeOpen] = useState(true); // 중분류 토글 상태
  const [isBottomThemeOpen, setIsBottomThemeOpen] = useState(true); // 소분류 토글 상태
  const [isCategoryOpen, setIsCategoryOpen] = useState(true); // 카테고리 선택 토글 상태

  const [travelSpots, setTravelSpots] = useState([]); // 여행지 데이터를 관리할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리할 상태
  const [error, setError] = useState(null); // 에러 상태를 관리할 상태
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [pageSize] = useState(10); // 페이지 크기 (고정)

  // 각 토글 상태를 변경하는 함수
  const handleToggleArea = () => setIsAreaOpen(!isAreaOpen);
  const handleToggleSubArea = () => setIsSubAreaOpen(!isSubAreaOpen);
  const handleToggleTopTheme = () => setIsTopThemeOpen(!isTopThemeOpen);
  const handleToggleMiddleTheme = () =>
    setIsMiddleThemeOpen(!isMiddleThemeOpen);
  const handleToggleBottomTheme = () =>
    setIsBottomThemeOpen(!isBottomThemeOpen);
  const handleToggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  useEffect(() => {
    const fetchTravelSpots = async () => {
      try {
        const data = await TravelSpotApi.getTravelSpots(currentPage, pageSize);
        setTravelSpots(data);
      } catch (error) {
        setError("여행지 데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchTravelSpots();
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setLoading(true);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSelectedAreaCode(areaCode || queryParams.get("area") || "");
    setSelectedSubAreaCode(queryParams.get("subarea") || "");
    setSelectedTopTheme(queryParams.get("cat1") || "");
    setSelectedMiddleTheme(queryParams.get("cat2") || "");
    setSelectedBottomTheme(queryParams.get("cat3") || "");
    setSelectedCategory(queryParams.get("category") || "");
  }, [areaCode, location.search]); // URL이 변경될 때마다 실행

  // 모든 선택 초기화
  const handleResetSelections = () => {
    setSelectedAreaCode("");
    setSelectedSubAreaCode("");
    setSelectedTopTheme("");
    setSelectedMiddleTheme("");
    setSelectedBottomTheme("");
    setSelectedCategory("");
    setSearchQuery(""); // 검색어도 초기화
    navigate("/tourlist"); // URL 쿼리 파라미터 제거
  };
  const handleSearch = () => {
    if (searchQuery.length < 2) {
      alert("검색어는 2자리 이상 입력해 주세요.");
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    queryParams.set("search", searchQuery); // 검색어 추가

    navigate(
      `/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
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
    let queryParams = new URLSearchParams(location.search);
    if (newAreaCode) {
      queryParams.set("area", newAreaCode);
    } else {
      queryParams.delete("area");
    }
    if (!newAreaCode) {
      queryParams.delete("subarea");
    }
    navigate(
      `/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    );
    setSelectedAreaCode(newAreaCode);
    setSelectedSubAreaCode("");
  };

  const handleSubAreaChange = (subAreaCode) => {
    const queryParams = new URLSearchParams(location.search);

    if (selectedSubAreaCode === subAreaCode) {
      queryParams.delete("subarea");
      setSelectedSubAreaCode("");
    } else {
      queryParams.set("subarea", subAreaCode);
      setSelectedSubAreaCode(subAreaCode);
    }
    if (searchQuery) queryParams.set("search", searchQuery);
    navigate(
      `/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    );
  };

  const handleTopThemeChange = (cat1) => {
    const queryParams = new URLSearchParams(location.search);
    if (selectedTopTheme === cat1) {
      queryParams.delete("cat1");
      setSelectedTopTheme("");
    } else {
      queryParams.set("cat1", cat1);
      setSelectedTopTheme(cat1);
    }

    queryParams.delete("cat2");
    queryParams.delete("cat3");
    setSelectedMiddleTheme("");
    setSelectedBottomThemes([]);

    if (searchQuery) queryParams.set("search", searchQuery);
    navigate(
      `/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    );
  };

  const handleMiddleThemeChange = (cat2) => {
    const queryParams = new URLSearchParams(location.search);
    if (selectedMiddleTheme === cat2) {
      queryParams.delete("cat2");
      setSelectedMiddleTheme("");
    } else {
      queryParams.set("cat2", cat2);
      setSelectedMiddleTheme(cat2);
    }

    queryParams.delete("cat3");
    setSelectedBottomThemes([]);

    if (searchQuery) queryParams.set("search", searchQuery);
    navigate(
      `/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    );
  };

  const handleBottomThemeChange = (cat3) => {
    const queryParams = new URLSearchParams(location.search);
    let newSelectedBottomThemes = [...selectedBottomThemes];

    if (newSelectedBottomThemes.includes(cat3)) {
      newSelectedBottomThemes = newSelectedBottomThemes.filter(
        (item) => item !== cat3
      );
    } else {
      // 소분류가 3개 이상 선택된 경우 더 이상 추가하지 않음
      if (newSelectedBottomThemes.length >= 3) {
        alert("최대 3개의 소분류만 선택할 수 있습니다.");
        return;
      }
      // 새로운 소분류는 추가
      newSelectedBottomThemes.push(cat3);
    }

    setSelectedBottomThemes(newSelectedBottomThemes);

    // 선택된 소분류만 쿼리 파라미터에 추가
    if (newSelectedBottomThemes.length > 0) {
      queryParams.set("cat3", newSelectedBottomThemes.join(","));
    } else {
      queryParams.delete("cat3");
    }

    if (searchQuery) queryParams.set("search", searchQuery);
    navigate(
      `/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    );
  };

  const handleCategoryChange = (category) => {
    const queryParams = new URLSearchParams(location.search);

    if (selectedCategory === category) {
      queryParams.delete("category");
      setSelectedCategory("");
    } else {
      queryParams.set("category", category);
      setSelectedCategory(category);
    }
    if (searchQuery) queryParams.set("search", searchQuery);
    navigate(
      `/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    );
  };

  const selectedAreaData = areas.find((area) => area.code === selectedAreaCode);

  return (
    <>
      <Header />
      <List>
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
          <div className="top">
            <h3>
              대분류{" "}
              <ToggleButton
                isOpen={isTopThemeOpen}
                onToggle={handleToggleTopTheme}
              />
            </h3>
            {isTopThemeOpen && (
              <div>
                {ServiceCode.map((cat) => (
                  <Button
                    key={cat.cat1}
                    onClick={() => handleTopThemeChange(cat.cat1)}
                    className={`theme-button ${
                      selectedTopTheme === cat.cat1 ? "selected" : ""
                    }`}
                  >
                    {cat.cat1Name}
                  </Button>
                ))}{" "}
              </div>
            )}
          </div>

          {selectedTopTheme && (
            <div className="middle">
              <h3>
                중분류
                <ToggleButton
                  isOpen={isMiddleThemeOpen}
                  onToggle={handleToggleMiddleTheme}
                />
              </h3>
              {isMiddleThemeOpen && (
                <div>
                  {ServiceCode.find(
                    (cat) => cat.cat1 === selectedTopTheme
                  )?.cat2List.map((theme) => (
                    <Button
                      key={theme.cat2}
                      onClick={() => handleMiddleThemeChange(theme.cat2)}
                      className={`theme-button ${
                        selectedMiddleTheme === theme.cat2 ? "selected" : ""
                      }`}
                    >
                      {theme.cat2Name}
                    </Button>
                  ))}{" "}
                </div>
              )}
            </div>
          )}

          {selectedMiddleTheme && (
            <div className="bottom">
              <h3>
                소분류
                <ToggleButton
                  isOpen={isBottomThemeOpen}
                  onToggle={handleToggleBottomTheme}
                />
              </h3>
              {isBottomThemeOpen && (
                <div>
                  {selectedMiddleTheme &&
                    ServiceCode.find((cat) => cat.cat1 === selectedTopTheme)
                      ?.cat2List.find(
                        (cat2) => cat2.cat2 === selectedMiddleTheme
                      )
                      ?.cat3List.map((cat3) => (
                        <Button
                          key={cat3.cat3}
                          onClick={() => handleBottomThemeChange(cat3.cat3)}
                          className={`theme-button ${
                            selectedBottomThemes.includes(cat3.cat3)
                              ? "selected"
                              : ""
                          }`}
                        >
                          {cat3.cat3Name}
                        </Button>
                      ))}{" "}
                </div>
              )}
            </div>
          )}

          <div className="category">
            <h3>
              카테고리 선택
              <ToggleButton
                isOpen={isCategoryOpen}
                onToggle={handleToggleCategory}
              />
            </h3>
            {isCategoryOpen && (
              <div>
                {types.map((type) => (
                  <Button
                    key={type.code}
                    onClick={() => handleCategoryChange(type.code)}
                    className={`category-button ${
                      selectedCategory === type.code ? "selected" : ""
                    }`}
                  >
                    {type.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </SelectTourItem>
        <ItemList>
          <div className="tour-list">
            {travelSpots.map((spot) => {
              const cat3Name = ServiceCode.flatMap((cat) =>
                cat.cat2List.flatMap((cat2) =>
                  cat2.cat3List.filter((cat3) => cat3.cat3 === spot.cat3)
                )
              ).map((cat3) => cat3.cat3Name)[0];
              const typeName = types.find(
                (type) => type.code === spot.typeId
              )?.name;

              return (
                <TourItem
                  key={spot.id}
                  id={spot.id}
                  thumbnail={spot.thumbnail}
                  title={spot.title}
                  address={spot.addr1 || "정보 없음"}
                  subCategory={cat3Name || "정보 없음"}
                  type={typeName || "정보 없음"}
                />
              );
            })}
          </div>

          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              ◀
            </button>
            <span> {currentPage + 1} 페이지 </span>
            <button onClick={() => handlePageChange(currentPage + 1)}>▶</button>
          </div>
        </ItemList>
      </List>
      <Footer />
    </>
  );
};
