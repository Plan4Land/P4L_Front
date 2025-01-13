import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Footer, Header} from "../../Component/GlobalComponent";
import {Button, ToggleButton} from "../../Component/ButtonComponent";
import {ItemList, List, SearchSt, SelectTourItem} from "../../Style/ItemListStyled";
import {FaSearch, FaUndo} from "react-icons/fa";
import {ServiceCode} from "../../Util/Service_code_final";
import {TourItem} from "../../Component/ItemListComponent";
import {TravelSpotApi} from "../../Api/ItemApi";
import {areas, types} from "../../Util/Common";

export const TourList = () => {
    const {areaCode} = useParams();
    const location = useLocation();
    // Location 훅 사용
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
      areaCode: "",
      subAreaCode: "",
      topTheme: "",
      middleTheme: "",
      bottomTheme: "",
      category: "",
      searchQuery: "",
    });
    const [travelSpots, setTravelSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [isAreaOpen, setIsAreaOpen] = useState(true);
    const [isSubAreaOpen, setIsSubAreaOpen] = useState(true);
    const [isTopThemeOpen, setIsTopThemeOpen] = useState(true);
    const [isMiddleThemeOpen, setIsMiddleThemeOpen] = useState(true);
    const [isBottomThemeOpen, setIsBottomThemeOpen] = useState(true);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);

    useEffect(() => {
      const fetchFilteredTravelSpots = async () => {
        try {
          setLoading(true);
          const validFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc[key] = value;
            return acc;
          }, {});
          const data = await TravelSpotApi.getTravelSpots(validFilters, currentPage, pageSize);
          setTravelSpots(data);
        } catch (error) {
          setError("여행지 데이터를 가져오는 데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      };
      fetchFilteredTravelSpots();
    }, [filters]);

  const updateFilters = (key, value) => {
    setFilters((prevState) => {
      const newFilters = { ...prevState, [key]: value };
      if (key === "bottomTheme" && Array.isArray(value)) {
        newFilters[key] = value.join(','); // 배열일 때만 join 사용
      }
      return newFilters;
    });

    const queryParams = new URLSearchParams(location.search);
    queryParams.delete(key);

    if (key === "bottomTheme" && Array.isArray(value)) {
      queryParams.set(key, value.join(','));
    } else if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, encodeURIComponent(v)));
    } else if (value) {
      queryParams.set(key, encodeURIComponent(value));
    }

    navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`, { replace: true });
  };



  const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    const handleResetSelections = () => {
      setFilters({
        areaCode: "",
        subAreaCode: "",
        topTheme: "",
        middleTheme: "",
        bottomTheme: "",
        category: "",
        searchQuery: "",
      });
      navigate("/tourlist");
    };

    const handleSearch = () => {
      if (filters.searchQuery.length < 2) {
        alert("검색어는 2자리 이상 입력해 주세요.");
        return;
      }
      updateFilters("searchQuery", filters.searchQuery);
    }

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    const handleAreaChange = (areaCode) => {
      const isSameArea = filters.areaCode === areaCode;
      const newAreaCode = isSameArea ? "" : areaCode;
      const queryParams = new URLSearchParams(location.search);
      setFilters((prev) => ({
        ...prev,
        areaCode: newAreaCode,
        subAreaCode: "", // 지역 변경 시 세부지역 초기화
      }));
      if (newAreaCode) {
        queryParams.set("areaCode", newAreaCode);
      } else {
        queryParams.delete("areaCode");
        queryParams.delete("subAreaCode");
      }
      navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
    };

    const handleSubAreaChange = (subAreaCode) => {
      const isSameSubArea = filters.subAreaCode === subAreaCode;
      const newSubAreaCode = isSameSubArea ? "" : subAreaCode;
      updateFilters("subAreaCode", newSubAreaCode);
    };

    const handleTopThemeChange = (cat1) => {
      const queryParams = new URLSearchParams(location.search);
      const isSameTopTheme = filters.topTheme === cat1;
      const newTopTheme = isSameTopTheme ? "" : cat1;
      setFilters((prev) => ({
        ...prev,
        topTheme: newTopTheme,
        middleTheme: "",
        bottomTheme: "", // 상위 분류 변경 시 하위 분류 초기화
      }));
      if (newTopTheme) {
        queryParams.set("cat1", newTopTheme);
      } else {
        queryParams.delete("cat1");
        queryParams.delete("cat2");
        queryParams.delete("cat3");
      }
      navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
    };

    const handleMiddleThemeChange = (cat2) => {
      const queryParams = new URLSearchParams(location.search);
      const isSameMiddleTheme = filters.middleTheme === cat2;
      const newMiddleTheme = isSameMiddleTheme ? "" : cat2;
      setFilters((prev) => ({
        ...prev,
        middleTheme: newMiddleTheme,
        bottomTheme: "", // 중분류 변경 시 소분류 초기화
      }));
      if (newMiddleTheme) {
        queryParams.set("cat2", newMiddleTheme);
      } else {
        queryParams.delete("cat2");
        queryParams.delete("cat3");
      }
      navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
    };

  const handleBottomThemeChange = (cat3) => {
    let newSelectedBottomThemes = filters.bottomTheme ? filters.bottomTheme.split(',') : [];
    console.log(newSelectedBottomThemes)

    if (newSelectedBottomThemes.includes(cat3)) {
      // 이미 선택된 항목인 경우, 제거
      newSelectedBottomThemes = newSelectedBottomThemes.filter((item) => item !== cat3);
    } else {
      // 아직 선택되지 않은 항목인 경우
      if (newSelectedBottomThemes.length >= 3) {
        alert("최대 3개의 소분류만 선택할 수 있습니다.");
        return; // 더 이상 추가하지 않고 함수 종료
      }
      newSelectedBottomThemes.push(cat3); // 배열에 추가
    }

    setFilters((prev) => ({
      ...prev,
      bottomTheme: newSelectedBottomThemes.join(','), // 상태 업데이트
    }));
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("cat3", newSelectedBottomThemes.join(','));
    navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
  };


    const handleCategoryChange = (category) => {
      const queryParams = new URLSearchParams(location.search);
      const isSameCategory = filters.category === category;
      const newCategory = isSameCategory ? "" : category;

      setFilters((prev) => ({
        ...prev,
        category: newCategory,
      }));

      if (newCategory) {
        queryParams.set("category", newCategory);
      } else {
        queryParams.delete("category");
      }
      navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
    };

    const selectedAreaData = areas.find((area) => area.code === filters.areaCode);

    return (
      <>
        <Header/>
        <List>
          <SelectTourItem>
            <button className="reset-button" onClick={handleResetSelections}>
              초기화
              <FaUndo style={{marginLeft: "6px"}}/>
            </button>
            <SearchSt>
              <div className="search-wrapper">
                <input
                  type="text"
                  className="search"
                  placeholder="제목 검색!"
                  value={filters.searchQuery}
                  onChange={(e) => updateFilters("searchQuery", e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="search-button" onClick={handleSearch}>
                  <FaSearch/>
                </button>
              </div>
            </SearchSt>

            <div className="mainarea">
              <h3>
                지역 선택
                <ToggleButton isOpen={isAreaOpen} onToggle={() => setIsAreaOpen(!isAreaOpen)}/>
              </h3>
              {isAreaOpen && (
                <div>
                  {areas.map((area) => (
                    <Button
                      key={area.code}
                      onClick={() => handleAreaChange(area.code)}
                      className={`area-button ${filters.areaCode === area.code ? "selected" : ""}`}
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
                  세부 지역 선택
                  <ToggleButton isOpen={isSubAreaOpen} onToggle={() => setIsSubAreaOpen(!isSubAreaOpen)}/>
                </h3>
                {isSubAreaOpen && (
                  <div>
                    {selectedAreaData.subAreas.map((subArea) => (
                      <Button
                        key={subArea.code}
                        onClick={() => handleSubAreaChange(subArea.code)}
                        className={`subarea-button ${filters.subAreaCode === subArea.code ? "selected" : ""}`}
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
                대분류
                <ToggleButton isOpen={isTopThemeOpen} onToggle={() => setIsTopThemeOpen(!isTopThemeOpen)}/>
              </h3>
              {isTopThemeOpen && (
                <div>
                  {ServiceCode.map((cat) => (
                    <Button
                      key={cat.cat1}
                      onClick={() => handleTopThemeChange(cat.cat1)}
                      className={`theme-button ${filters.topTheme === cat.cat1 ? "selected" : ""}`}
                    >
                      {cat.cat1Name}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {filters.topTheme && (
              <div className="middle">
                <h3>
                  중분류
                  <ToggleButton isOpen={isMiddleThemeOpen} onToggle={() => setIsMiddleThemeOpen(!isMiddleThemeOpen)}/>
                </h3>
                {isMiddleThemeOpen && (
                  <div>
                    {ServiceCode.find((cat) => cat.cat1 === filters.topTheme)?.cat2List.map((cat2) => (
                      <Button
                        key={cat2.cat2}
                        onClick={() => handleMiddleThemeChange(cat2.cat2)}
                        className={`theme-button ${filters.middleTheme === cat2.cat2 ? "selected" : ""}`}
                      >
                        {cat2.cat2Name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {filters.middleTheme && (
              <div className="bottom">
                <h3>
                  소분류
                  <ToggleButton isOpen={isBottomThemeOpen} onToggle={() => setIsBottomThemeOpen(!isBottomThemeOpen)}/>
                </h3>
                {isBottomThemeOpen && (
                  <div>
                    {filters.middleTheme &&
                      ServiceCode.find((cat) => cat.cat1 === filters.topTheme)?.cat2List.find(
                        (cat2) => cat2.cat2 === filters.middleTheme
                      )?.cat3List.map((cat3) => (
                        <Button
                          key={cat3.cat3}
                          onClick={() => handleBottomThemeChange(cat3.cat3)}
                          className={`theme-button ${
                            filters.bottomTheme.includes(cat3.cat3) ? "selected" : ""
                          }`}
                        >
                          {cat3.cat3Name}
                        </Button>
                      ))}
                  </div>
                )}
              </div>
            )}

            <div className="category">
              <h3>
                카테고리 선택
                <ToggleButton isOpen={isCategoryOpen} onToggle={() => setIsCategoryOpen(!isCategoryOpen)}/>
              </h3>
              {isCategoryOpen && (
                <div>
                  {types.map((type) => (
                    <Button
                      key={type.code}
                      onClick={() => handleCategoryChange(type.code)}
                      className={`category-button ${filters.category === type.code ? "selected" : ""}`}
                    >
                      {type.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </SelectTourItem>

          <ItemList>
            {(loading || error) && <div>{loading ? "로딩 중..." : error}</div>}
            {!loading && !error &&
              <div className="tour-list">
                {travelSpots.map((spot) => {
                  const cat3Name = ServiceCode.flatMap((cat) =>
                    cat.cat2List.flatMap((cat2) =>
                      cat2.cat3List.filter((cat3) => cat3.cat3 === spot.cat3)
                    )
                  ).map((cat3) => cat3.cat3Name)[0];
                  const typeName = types.find((type) => type.code === spot.typeId)?.name;

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
            }
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
        <Footer/>
      </>
    )
      ;
  }
;