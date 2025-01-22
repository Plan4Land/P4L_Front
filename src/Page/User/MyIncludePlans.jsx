import { useState, useEffect } from "react";
import { PlanItem } from "../../Component/ItemListComponent";
import { InPlannerApi } from "../../Api/ItemApi";
import { useAuth } from "../../Context/AuthContext";
import { areas } from "../../Util/Common";
import { BookmarkItem } from "../../Style/BookmarkItemStyled";
import { Pagination } from "../../Component/Pagination";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "react-responsive";

export const MyIncludePlans = () => {
  const { user } = useAuth();
  const [includePlans, setIncludePlans] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [loading, setLoading] = useState(false);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  // const fetchIncludePlans = async () => {
  //   try {
  //     const data = await InPlannerApi.getIncludePlan(user.id, page, size);
  //     setIncludePlans(data.content);
  //     setTotalPages(data.totalPages);
  //   } catch (err) {
  //     console.error("내가 포함된 플래닝 조회:", err);
  //   }
  // };

  const fetchIncludePlans = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const currentPage = page;

      const data = await InPlannerApi.getIncludePlan(
        user.id,
        currentPage,
        size
      );
      console.log(data.content);

      // 모바일에서 이전 데이터와 새 데이터의 중복을 피하도록 처리
      if (isMobile) {
        setIncludePlans((prevPlanners) => {
          // 이미 로드된 데이터와 새 데이터가 중복되지 않도록 처리
          const newPlanners = data.content.filter(
            (newPlanner) =>
              !prevPlanners.some((planner) => planner.id === newPlanner.id)
          );
          return [...prevPlanners, ...newPlanners]; // 기존 데이터에 새 데이터만 추가
        });
      } else {
        // PC에서는 새로운 데이터로 덮어씌우기
        setIncludePlans(data.content);
      }

      setTotalPages(data.totalPages); // 전체 페이지 수 설정
      setLoading(false);
    } catch (error) {
      console.error("플래너 조회 오류:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!isMobile) {
      // PC에서는 page가 변경될 때마다 데이터를 새로 고침
      fetchIncludePlans();
    } else {
      // 모바일에서는 page가 변경될 때만 데이터를 추가
      fetchIncludePlans();
    }
  }, [page, isMobile, user.id]);

  // useEffect(() => {
  //   if (!user?.id) return;
  //   fetchIncludePlans();
  // }, [user?.id, page]);

  const loadMorePlanners = () => {
    if (page + 1 < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <BookmarkItem>
        <div className="bookmarkList">
          {isMobile ? (
            <InfiniteScroll
              dataLength={includePlans.length}
              next={loadMorePlanners}
              hasMore={page + 1 < totalPages}
              loader={<p>로딩 중...</p>}
              endMessage={<p>더 이상 불러올 데이터가 없습니다.</p>}
            >
              {includePlans.length > 0 ? (
                includePlans.map((plannerObj) => {
                  const planner = plannerObj;

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
                })
              ) : (
                <p>내가 포함된 플래너가 없습니다.</p>
              )}
            </InfiniteScroll>
          ) : includePlans.length > 0 ? (
            includePlans.map((plannerObj) => {
              const planner = plannerObj;

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
            })
          ) : (
            <p>내가 포함된 플래너가 없습니다.</p>
          )}
        </div>
      </BookmarkItem>
      {!isMobile && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};
