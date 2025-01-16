import { useState, useEffect } from "react";
import { TourItem } from "../../Component/ItemListComponent";
import { BookmarkedSpotsApi } from "../../Api/ItemApi";
import { useAuth } from "../../Context/AuthContext";
import { ServiceCode } from "../../Util/Service_code_final";
import { types } from "../../Util/Common";
import { BookmarkItem } from "../../Style/BookmarkItemStyled";

export const MyBookmarkTourItem = () => {
  const { user } = useAuth();
  const [bookmarkedSpots, setBookmarkedSpots] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // 북마크된 여행지 불러오기 함수
  const fetchBookmarkedSpots = async () => {
    try {
      const data = await BookmarkedSpotsApi.getBookmarkedSpots(
        user.id,
        page,
        size
      );
      setBookmarkedSpots(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("북마크된 여행지 조회 오류:", err);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchBookmarkedSpots();
  }, [user?.id, page]);

  return (
    <>
      <BookmarkItem>
        <div className="bookmarkList">
          {bookmarkedSpots.length > 0 ? (
            bookmarkedSpots.map((spot) => {
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
            })
          ) : (
            <p>북마크된 여행지가 없습니다.</p>
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
