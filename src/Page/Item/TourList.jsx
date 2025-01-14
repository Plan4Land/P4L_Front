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
    const [filters, setFilters] = useState(() => {
        const queryParams = new URLSearchParams(location.search);
        return {
          areaCode: queryParams.get("areaCode") || "",
          subAreaCode: queryParams.get("subAreaCode") || "",
          topTheme: queryParams.get("cat1") || "",
          middleTheme: queryParams.get("cat2") || "",
          bottomTheme: queryParams.get("cat3") || "",
          category: queryParams.get("category") || "",
          searchQuery: queryParams.get("searchQuery") ? decodeURIComponent(queryParams.get("searchQuery")) : "",
          currentPage: parseInt(queryParams.get("currentPage")) || 0,
          pageSize: parseInt(queryParams.get("pageSize")) || 10,
        };
      }
    )

    const [travelSpots, setTravelSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAreaOpen, setIsAreaOpen] = useState(true);
    const [isSubAreaOpen, setIsSubAreaOpen] = useState(true);
    const [isTopThemeOpen, setIsTopThemeOpen] = useState(true);
    const [isMiddleThemeOpen, setIsMiddleThemeOpen] = useState(true);
    const [isBottomThemeOpen, setIsBottomThemeOpen] = useState(true);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState(filters.searchQuery);


    useEffect(() => {
      const fetchFilteredTravelSpots = async () => {
        try {
          setLoading(true);
          const validFilters = Object.fromEntries(
            Object.entries(filters).filter(([, value]) => value)
          );
          const data = await TravelSpotApi.getTravelSpots(validFilters);
          setTravelSpots(data);
        } catch (error) {
          setError("여행지 데이터를 가져오는 데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      };

      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          if (key === 'bottomTheme' && typeof value === 'string') {
            queryParams.set("cat3", value);
          } else if (key === 'topTheme') {
            queryParams.set("cat1", value);
          } else if (key === 'middleTheme') {
            queryParams.set("cat2", value);
          } else if (key === 'searchQuery') {
            queryParams.set(key, encodeURIComponent(value));
          } else if (key === 'areaCode') {
            queryParams.set(key, value);
          } else if (key === 'subAreaCode') {
            queryParams.set(key, value);
          } else if (key === 'category') {
            queryParams.set(key, value);
          } else if (key === 'currentPage') {
            queryParams.set(key, value); // currentPage를 쿼리 파라미터에 추가
          } else if (key === 'pageSize') {
            queryParams.set(key, value); // pageSize를 쿼리 파라미터에 추가
          }
        }
      }
      navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`, {replace: true});
      fetchFilteredTravelSpots();
    }, [filters, navigate, filters.currentPage]);

    const updateFilters = (key, value) => {
      if (key !== "currentPage") {
        setFilters((prev) => {
          const newFilters = {
            ...prev,
            [key]: value,
            currentPage: 0,
          };
          if (key === "topTheme") {
            newFilters.middleTheme = "";
            newFilters.bottomTheme = "";
          } else if (key === "middleTheme") {
            newFilters.bottomTheme = "";
          }
          return newFilters;
        });
      } else {
        setFilters((prev) => {
          const newFilters = {
            ...prev,
            [key]: value,
          };
          if (key === "topTheme") {
            newFilters.middleTheme = "";
            newFilters.bottomTheme = "";
          } else if (key === "middleTheme") {
            newFilters.bottomTheme = "";
          }
          return newFilters;
        })
      }
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
        currentPage: 0,
        pageSize: 10,
      });
      // navigate("/tourlist");
    };

    const handlePageChange = (newPage) => {
      updateFilters("currentPage", newPage);
    };


    const handleSearch = () => {
      if (searchQuery.length < 2) {
        alert("검색어는 2자리 이상 입력해 주세요.");
        return;
      }
      updateFilters("searchQuery", searchQuery);
    }

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    const handleAreaChange = (areaCode) => {
      const isSameArea = filters.areaCode === areaCode;
      const newAreaCode = isSameArea ? "" : areaCode;
      updateFilters("areaCode", newAreaCode);
      updateFilters("subAreaCode", "");
    };

    const handleSubAreaChange = (subAreaCode) => {
      const isSameSubArea = filters.subAreaCode === subAreaCode;
      const newSubAreaCode = isSameSubArea ? "" : subAreaCode;
      updateFilters("subAreaCode", newSubAreaCode);
    };

    const handleTopThemeChange = (cat1) => {
      const isSameTopTheme = filters.topTheme === cat1;
      const newTopTheme = isSameTopTheme ? "" : cat1;
      updateFilters("topTheme", newTopTheme);
    };

    const handleMiddleThemeChange = (cat2) => {
      const isSameMiddleTheme = filters.middleTheme === cat2;
      const newMiddleTheme = isSameMiddleTheme ? "" : cat2;
      updateFilters("middleTheme", newMiddleTheme);
    };

    const handleBottomThemeChange = (cat3) => {
      setFilters((prev) => {
        let newSelectedBottomThemes = prev.bottomTheme ? prev.bottomTheme.split(',') : [];

        if (newSelectedBottomThemes.includes(cat3)) {
          newSelectedBottomThemes = newSelectedBottomThemes.filter((item) => item !== cat3);
        } else {
          if (newSelectedBottomThemes.length >= 3) {
            alert("최대 3개의 소분류만 선택할 수 있습니다.");
            return prev;
          }
          newSelectedBottomThemes.push(cat3);
        }
        return {
          ...prev,
          bottomTheme: newSelectedBottomThemes.join(','),
        };
      });
    };

    const handleCategoryChange = (category) => {
      updateFilters("category", category);
    };

    const selectedAreaData = areas.find((area) => area.code === filters.areaCode);


    // const updateFilters = (key, value) => {
    //   setFilters(prev => {
    //     const newFilters = {
    //       ...prev,
    //       [key]: value,
    //       currentPage: 0,
    //     };
    //     if (key === "bottomTheme" && Array.isArray(value)) {
    //       newFilters[key] = value.join(',');
    //     }
    //     const queryParams = new URLSearchParams();
    //     for (const [filterKey, filterValue] of Object.entries(newFilters)) {
    //       if (filterValue !== "" && filterValue !== null && filterValue !== undefined) {
    //         if (filterKey === 'bottomTheme' && typeof filterValue === 'string') {
    //           queryParams.set(filterKey, filterValue);
    //         } else if (filterKey === 'searchQuery') {
    //           queryParams.set(filterKey, encodeURIComponent(filterValue));
    //         } else {
    //           queryParams.set(filterKey, filterValue);
    //         }
    //       }
    //     }
    //     navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`, {replace: true});
    //     return newFilters;
    //   })
    // };


    // const handlePageChange = (newPage) => {
    //   setCurrentPage(newPage);
    //   const queryParams = new URLSearchParams(location.search);
    //   queryParams.set("currentPage", newPage);
    //   updateFilters(queryParams);
    // }

    // const handleTopThemeChange = (cat1) => {
    //   const queryParams = new URLSearchParams(location.search);
    //   const isSameTopTheme = filters.topTheme === cat1;
    //   const newTopTheme = isSameTopTheme ? "" : cat1;
    //   setFilters((prev) => ({
    //     ...prev,
    //     topTheme: newTopTheme,
    //     middleTheme: "",
    //     bottomTheme: "", // 상위 분류 변경 시 하위 분류 초기화
    //   }));
    //   if (newTopTheme) {
    //     queryParams.set("cat1", newTopTheme);
    //   } else {
    //     queryParams.delete("cat1");
    //     queryParams.delete("cat2");
    //     queryParams.delete("cat3");
    //   }
    //   navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
    // };
    //
    // const handleMiddleThemeChange = (cat2) => {
    //   const queryParams = new URLSearchParams(location.search);
    //   const isSameMiddleTheme = filters.middleTheme === cat2;
    //   const newMiddleTheme = isSameMiddleTheme ? "" : cat2;
    //   setFilters((prev) => ({
    //     ...prev,
    //     middleTheme: newMiddleTheme,
    //     bottomTheme: "", // 중분류 변경 시 소분류 초기화
    //   }));
    //   if (newMiddleTheme) {
    //     queryParams.set("cat2", newMiddleTheme);
    //   } else {
    //     queryParams.delete("cat2");
    //     queryParams.delete("cat3");
    //   }
    //   navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
    // };
    //
    // const handleBottomThemeChange = (cat3) => {
    //   let newSelectedBottomThemes = filters.bottomTheme ? filters.bottomTheme.split(',') : [];
    //   console.log(newSelectedBottomThemes)
    //
    //   if (newSelectedBottomThemes.includes(cat3)) {
    //     // 이미 선택된 항목인 경우, 제거
    //     newSelectedBottomThemes = newSelectedBottomThemes.filter((item) => item !== cat3);
    //   } else {
    //     // 아직 선택되지 않은 항목인 경우
    //     if (newSelectedBottomThemes.length >= 3) {
    //       alert("최대 3개의 소분류만 선택할 수 있습니다.");
    //       return; // 더 이상 추가하지 않고 함수 종료
    //     }
    //     newSelectedBottomThemes.push(cat3); // 배열에 추가
    //   }
    //
    //   setFilters((prev) => ({
    //     ...prev,
    //     bottomTheme: newSelectedBottomThemes.join(','), // 상태 업데이트
    //   }));
    //   const queryParams = new URLSearchParams(location.search);
    //   queryParams.set("cat3", newSelectedBottomThemes.join(','));
    //   navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
    // };


    // const handleCategoryChange = (category) => {
    //   const queryParams = new URLSearchParams(location.search);
    //   const isSameCategory = filters.category === category;
    //   const newCategory = isSameCategory ? "" : category;
    //
    //   setFilters((prev) => ({
    //     ...prev,
    //     category: newCategory,
    //   }));
    //
    //   if (newCategory) {
    //     queryParams.set("category", newCategory);
    //   } else {
    //     queryParams.delete("category");
    //   }
    //   navigate(`/tourlist${queryParams.toString() ? `?${queryParams.toString()}` : ""}`);
    // };


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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                onClick={() => handlePageChange(filters.currentPage - 1)}
                disabled={filters.currentPage === 0}
              >
                ◀
              </button>
              <span> {filters.currentPage + 1} 페이지 </span>
              <button onClick={() => handlePageChange(filters.currentPage + 1)}>▶</button>
            </div>
          </ItemList>
        </List>
        <Footer/>
      </>
    )
      ;
  }
;