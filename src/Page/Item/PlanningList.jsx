import { Header, Footer } from "../../Component/GlobalComponent";
import { useState, useEffect } from "react";
import { areas, themes } from "../../Util/Common";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, ToggleButton } from "../../Component/ButtonComponent";
import {
  SelectTourItem,
  SearchSt,
  List,
  ItemList,
} from "../../Style/ItemListStyled";
import { FaSearch, FaUndo } from "react-icons/fa";
import { PlannerItemApi } from "../../Api/ItemApi";
import { PlanItem } from "../../Component/ItemListComponent";
import { Pagination } from "../../Component/Pagination";

export const PlanningList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    return {
      areaCode: queryParams.get("areaCode") || "",
      subAreaCode: queryParams.get("subAreaCode") || "",
      themeList: queryParams.get("themeList")
        ? decodeURIComponent(queryParams.get("themeList"))
        : "",
      currentPage: parseInt(queryParams.get("currentPage")) || 0,
      pageSize: parseInt(queryParams.get("pageSize")) || 10,
      searchQuery: queryParams.get("searchQuery")
        ? decodeURIComponent(queryParams.get("searchQuery"))
        : "",
      sortBy: queryParams.get("sortBy") || "",
    };
  });

  const [planners, setPlanners] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAreaOpen, setIsAreaOpen] = useState(true);
  const [isSubAreaOpen, setIsSubAreaOpen] = useState(true);
  const [isThemeOpen, setIsThemeOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const sortBy = [
    {
      name: "최신순",
      value: "LatestDesc",
    },
    {
      name: "오래된 순",
      value: "LatestAsc",
    },
    {
      name: "북마크 많은 순",
      value: "BookmarkDesc",
    },
    {
      name: "북마크 적은 순",
      value: "BookmarkAsc",
    },
  ];

  const handleSortChange = (e) => {
    console.log("정렬 바뀜 : ", e.target.value);
    updateFilters("sortBy", e.target.value);
  };

  useEffect(() => {
    const fetchFilteredPlanners = async () => {
      try {
        setLoading(true);
        const validFilters = Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value)
        );
        const data = await PlannerItemApi.getPlanners(validFilters);
        setTotalItems(data.totalElements);
        setTotalPages(data.totalPages);
        setPlanners(data.content);
      } catch (error) {
        setError("플래너 데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        queryParams.set(
          key,
          key === "themeList" ? encodeURIComponent(value) : value
        );
      }
    }
    navigate(
      `/planninglist${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`,
      { replace: true }
    );
    fetchFilteredPlanners();
  }, [filters, navigate, filters.currentPage]);

  const updateFilters = (key, value) => {
    if (key !== "currentPage") {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        currentPage: 0,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleResetSelections = () => {
    setFilters({
      areaCode: "",
      subAreaCode: "",
      themeList: "",
      currentPage: 0,
      pageSize: 10,
      searchQuery: "",
      sortBy: "",
    });
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
  };

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

  const handleThemeChange = (theme) => {
    setFilters((prev) => {
      let newSelectedThemes = prev.themeList ? prev.themeList.split(",") : [];
      if (newSelectedThemes.includes(theme)) {
        newSelectedThemes = newSelectedThemes.filter((item) => item !== theme);
      } else {
        if (newSelectedThemes.length >= 3) {
          alert("최대 3개의 테마만 선택할 수 있습니다.");
          return prev;
        }
        newSelectedThemes.push(theme);
      }
      return { ...prev, themeList: newSelectedThemes.join(",") };
    });
  };
  const handleToggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const selectedAreaData = areas.find((area) => area.code === filters.areaCode);

  return (
    <>
      <Header />
      <button onClick={handleToggleSelect}>필터 열기</button>
      <List>
        <SelectTourItem className={isSelectOpen ? "open" : ""}>
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
              <ToggleButton
                isOpen={isAreaOpen}
                onToggle={() => setIsAreaOpen(!isAreaOpen)}
              />
            </h3>
            {isAreaOpen && (
              <div>
                {areas.map((area) => (
                  <Button
                    key={area.code}
                    onClick={() => handleAreaChange(area.code)}
                    className={`area-button ${
                      filters.areaCode === area.code ? "selected" : ""
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
                  onToggle={() => setIsSubAreaOpen(!isSubAreaOpen)}
                />
              </h3>
              {isSubAreaOpen && (
                <div>
                  {selectedAreaData.subAreas.map((subArea) => (
                    <Button
                      key={subArea.code}
                      onClick={() => handleSubAreaChange(subArea.code)}
                      className={`subarea-button ${
                        filters.subAreaCode === subArea.code ? "selected" : ""
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
              테마 선택
              <ToggleButton
                isOpen={isThemeOpen}
                onToggle={() => setIsThemeOpen(!isThemeOpen)}
              />
            </h3>
            {isThemeOpen && (
              <div>
                {themes.map((theme) => (
                  <Button
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    className={`theme-button ${
                      filters.themeList.split(",").includes(theme)
                        ? "selected"
                        : ""
                    }`}
                  >
                    {theme}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </SelectTourItem>
        <ItemList>
          {loading && <p>로딩 중...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className={"sort-select"}
          >
            {sortBy.map((e) => (
              <option key={e.name} value={e.value}>
                {e.name}
              </option>
            ))}
          </select>
          <div className="plannerList">
            {planners.map((planner) => {
              const areaName =
                areas.find((area) => area.code === planner.area)?.name ||
                "알 수 없는 지역";
              const subAreaName =
                areas
                  .find((area) => area.code === planner.area)
                  ?.subAreas.find((subArea) => subArea.code === planner.subArea)
                  ?.name || "알 수 없는 하위 지역";

              return (
                <PlanItem
                  key={planner.id}
                  id={planner.id}
                  thumbnail={planner.thumbnail || "/default-thumbnail.png"}
                  title={planner.title}
                  address={`${areaName} - ${subAreaName}`}
                  subCategory={planner.theme}
                  type={planner.public ? "공개" : "비공개"}
                  ownerprofile={planner.ownerProfileImg}
                  ownernick={planner.ownerNickname}
                />
              );
            })}
          </div>
          <Pagination
            currentPage={filters.currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </ItemList>
      </List>
      <Footer />
    </>
  );
};
