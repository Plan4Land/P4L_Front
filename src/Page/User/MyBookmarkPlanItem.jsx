import { useState, useEffect } from "react";
import { PlanItem } from "../../Component/ItemListComponent";
import { BookmarkedPlanApi } from "../../Api/ItemApi";
import { useAuth } from "../../Context/AuthContext";
import { areas } from "../../Util/Common";
import { BookmarkItem } from "../../Style/BookmarkItemStyled";

export const MyBookmarkPlanItem = () => {
  const { user } = useAuth();
  const [bookmarkedPlans, setBookmarkedPlans] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBookmarkedPlans = async () => {
    try {
      const data = await BookmarkedPlanApi.getBookmarkedPlan(
        user.id,
        page,
        size
      );
      setBookmarkedPlans(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("북마크된 플래닝 조회 오류:", err);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchBookmarkedPlans();
  }, [user?.id, page]);

  return (
    <>
      <BookmarkItem>
        <div className="bookmarkList">
          {bookmarkedPlans.length > 0 ? (
            bookmarkedPlans.map((plannerObj) => {
              const planner = plannerObj.planner; // planner 객체를 추출
              console.log(planner); // 각 planner 객체의 구조 확인

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
                  ownerprofile={planner.owner.profileImg}
                  ownernick={planner.owner.nickname}
                />
              );
            })
          ) : (
            <p>북마크된 플래너가 없습니다.</p>
          )}
        </div>
        <div className="pagebutton">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            이전
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page + 1 >= totalPages}
          >
            다음
          </button>
        </div>
      </BookmarkItem>
    </>
  );
};
