import React, { useMemo } from "react";
import styled from "styled-components";
import { areas, themes, types } from "../Util/Common";
import { ServiceCode } from "../Util/Service_code_final";

const TopFilters = styled.div`
  align-self: flex-start;
  margin: 15px 0 10px 0;
  width: 100%;
  .filterList {
    width: 100%;
    display: flex;
    h4 {
      white-space: nowrap;
    }
  }
  .filter-tags {
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-left: 10px;
    flex-wrap: wrap;
  }

  .filter-tag {
    background-color: #f0f0f0;
    padding: 6px 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    height: 20px;
  }

  .filter-tag button {
    background: none;
    border: none;
    margin-left: 4px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .filter-tag {
      font-size: 10px;
    }
  }
`;

// 선택한 필터를 포맷하는 함수
const formatSelectedFilters = (filters) => {
  const selectedFilters = [];

  if (filters.areaCode) {
    const selectedArea = areas.find((area) => area.code === filters.areaCode);
    if (selectedArea) {
      selectedFilters.push({ key: "areaCode", name: selectedArea.name });
      const selectedSubArea = selectedArea.subAreas.find(
        (subArea) => subArea.code === filters.subAreaCode
      );
      if (selectedSubArea) {
        selectedFilters.push({
          key: "subAreaCode",
          name: selectedSubArea.name,
        });
      }
    }
  }

  if (filters.topTheme) {
    const selectedTopTheme = ServiceCode.find(
      (cat) => cat.cat1 === filters.topTheme
    );
    if (selectedTopTheme) {
      selectedFilters.push({
        key: "topTheme",
        name: selectedTopTheme.cat1Name,
      });
    }
  }

  if (filters.middleTheme) {
    const selectedMiddleTheme = ServiceCode.find(
      (cat) => cat.cat1 === filters.topTheme
    )?.cat2List.find((cat2) => cat2.cat2 === filters.middleTheme);
    if (selectedMiddleTheme) {
      selectedFilters.push({
        key: "middleTheme",
        name: selectedMiddleTheme.cat2Name,
      });
    }
  }

  if (filters.bottomTheme) {
    const selectedBottomThemes = filters.bottomTheme
      .split(",")
      .map((cat3) =>
        ServiceCode.find((cat) => cat.cat1 === filters.topTheme)
          ?.cat2List.find((cat2) => cat2.cat2 === filters.middleTheme)
          ?.cat3List.find((cat3Item) => cat3Item.cat3 === cat3)
      )
      .filter(Boolean)
      .map((cat3) => ({ key: "bottomTheme", name: cat3.cat3Name }));
    selectedFilters.push(...selectedBottomThemes);
  }

  if (filters.category) {
    const selectedCategory = types.find(
      (type) => type.code === filters.category
    );
    if (selectedCategory) {
      selectedFilters.push({ key: "category", name: selectedCategory.name });
    }
  }

  if (filters.themeList) {
    const selectedThemes = filters.themeList.split(",").map((theme) => ({
      key: "themeList",
      name: theme,
    }));
    selectedFilters.push(...selectedThemes);
  }

  if (filters.searchQuery) {
    selectedFilters.push({
      key: "searchQuery",
      name: `검색어: ${filters.searchQuery}`,
    });
  }

  return selectedFilters;
};

// 선택한 필터를 표시하고 클릭하면 필터를 제거하는 컴포넌트
export const SelectedFilters = ({ filters, onRemoveFilter }) => {
  // useMemo 사용하여 불필요한 렌더링 줄임
  // 사용 전에는 4번씩 렌더링 하였음
  const selectedFilters = useMemo(
    () => formatSelectedFilters(filters),
    [filters]
  );

  return (
    <TopFilters>
      <div className="filterList">
        <h4>선택 목록:</h4>
        {selectedFilters.length > 0 && (
          <div className="filter-tags">
            {selectedFilters.map((filter, index) => (
              <span key={index} className="filter-tag">
                {filter.name}
                <button onClick={() => onRemoveFilter(filter.key, filter.name)}>
                  x
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </TopFilters>
  );
};
