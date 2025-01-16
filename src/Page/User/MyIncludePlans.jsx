import { useState, useEffect } from "react";
import { PlanItem } from "../../Component/ItemListComponent";
import { InPlannerApi } from "../../Api/ItemApi";
import { useAuth } from "../../Context/AuthContext";
import { areas } from "../../Util/Common";
import { BookmarkItem } from "../../Style/BookmarkItemStyled";
import { Pagination } from "../../Component/Pagination";

export const MyIncludePlans = () => {
  const { user } = useAuth();
  const [includePlans, setIncludePlans] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const fetchIncludePlans = async () => {
    try {
      const data = await InPlannerApi.getIncludePlan(user.id, page, size);
      console.log(">>>", data.content);
      console.log("*******", data);
      setIncludePlans(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("내가 포함된 플래닝 조회:", err);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchIncludePlans();
  }, [user?.id, page]);

  return (
    <>
      <BookmarkItem>
        <div className="bookmarkList">
          {includePlans.length > 0 ? (
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
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </BookmarkItem>
    </>
  );
};
