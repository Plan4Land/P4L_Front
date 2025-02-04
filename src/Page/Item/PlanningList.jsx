import { Header, Footer } from "../../Component/GlobalComponent";
import { useState, useEffect } from "react";
import { areas, themes } from "../../Util/Common";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { Button, ToggleSection } from "../../Component/ButtonComponent";
import {
  SelectTourItem,
  SearchSt,
  List,
  ItemList,
  FilterButton,
  SortSelect,
} from "../../Style/ItemListStyled";
import { FaSearch, FaUndo } from "react-icons/fa";
import { PlannerItemApi } from "../../Api/ItemApi";
import { PlanItem } from "../../Component/ItemListComponent";
import { Pagination } from "../../Component/Pagination";
import { FaBars } from "react-icons/fa";
import { Loading } from "../../Component/LoadingComponent";
import { SelectedFilters } from "../../Component/SelectedFilterComponent";
import { CheckModal } from "../../Util/Modal";
import { useAuth } from "../../Context/AuthContext";

export const PlanningList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handlePlanningClick = (e) => {
    if (!user?.id) {
      e.preventDefault(); // 네비게이션 막기
      setIsModalOpen(true); // 모달 열기
    }
  };

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
          value // url 인코딩 key === "themeList" ? encodeURIComponent(value) : value
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
          // alert("최대 3개의 테마만 선택할 수 있습니다.");
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

  const handleTopFilterChange = (key, name) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (key === "themeList") {
        newFilters[key] = newFilters[key]
          .split(",")
          .filter((theme) => theme !== name)
          .join(",");
      } else {
        newFilters[key] = "";
      }
      return newFilters;
    });
  };

  const selectedAreaData = areas.find((area) => area.code === filters.areaCode);

  return (
    <>
      {/* <Header /> */}
      <FilterButton onClick={handleToggleSelect}>
        <FaBars />
      </FilterButton>
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
            <ToggleSection
              title="지역 선택"
              isOpen={isAreaOpen}
              onToggle={() => setIsAreaOpen(!isAreaOpen)}
            >
              <div className="buttons">
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
            </ToggleSection>
          </div>

          {selectedAreaData && (
            <div className="subarea">
              <ToggleSection
                title="세부 지역 선택"
                isOpen={isSubAreaOpen}
                onToggle={() => setIsSubAreaOpen(!isSubAreaOpen)}
              >
                <div className="buttons">
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
              </ToggleSection>
            </div>
          )}

          <div className="theme">
            <ToggleSection
              title="테마 선택"
              isOpen={isThemeOpen}
              onToggle={() => setIsThemeOpen(!isThemeOpen)}
            >
              <div className="buttons">
                {themes.map((theme) => (
                  <Button
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    className={`theme-button ${
                      filters.themeList.split(",").includes(theme)
                        ? "selected"
                        : ""
                    }`}
                    disabled={
                      filters.themeList.split(",").length >= 3 &&
                      !filters.themeList.split(",").includes(theme)
                    }
                  >
                    #{theme}
                  </Button>
                ))}
              </div>
            </ToggleSection>
          </div>
        </SelectTourItem>
        <ItemList>
          <div className="totalCount">
            총 {totalItems.toLocaleString()}건
            <Link to={"/makeplanning"} onClick={handlePlanningClick}>
              <Button>플래닝 만들기</Button>
            </Link>
          </div>
          <SelectedFilters
            filters={filters}
            onRemoveFilter={handleTopFilterChange}
          ></SelectedFilters>

          {loading && (
            <Loading>
              <p>목록을 불러오는 중 입니다.</p>
            </Loading>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="selectMenu">
            <SortSelect value={filters.sortBy} onChange={handleSortChange}>
              {sortBy.map((e) => (
                <option key={e.name} value={e.value}>
                  {e.name}
                </option>
              ))}
            </SortSelect>
            {/* <Link to={"/makeplanning"}>
              <Button>플래닝 만들기</Button>
            </Link> */}
          </div>
          <div className="plannerList">
            {planners.length === 0 ? (
              <p>해당 조건의 플래닝이 없습니다.</p>
            ) : (
              planners.map((planner) => {
                const areaName =
                  areas.find((area) => area.code === planner.area)?.name ||
                  "알 수 없는 지역";
                const subAreaName =
                  areas
                    .find((area) => area.code === planner.area)
                    ?.subAreas.find(
                      (subArea) => subArea.code === planner.subArea
                    )?.name || "알 수 없는 하위 지역";

                return (
                  <div className="itemBox" key={planner.id}>
                    <PlanItem
                      id={planner.id}
                      thumbnail={planner.thumbnail || "/default-thumbnail.png"}
                      title={planner.title}
                      address={`${areaName} - ${subAreaName}`}
                      subCategory={planner.theme
                        .split(",")
                        .map((theme) => `#${theme.trim()}`)
                        .join(" ")}
                      type={planner.public ? "공개" : "비공개"}
                      ownerprofile={planner.ownerProfileImg}
                      ownernick={planner.ownerNickname}
                    />
                  </div>
                );
              })
            )}
          </div>
          <Pagination
            currentPage={filters.currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </ItemList>
      </List>
      {/* <Footer /> */}
      <CheckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        로그인이 필요한 서비스입니다.
      </CheckModal>
    </>
  );
};
