import { useState, useEffect } from "react";
import { TourItem } from "../../Component/ItemListComponent";
import { BookmarkedSpotsApi } from "../../Api/ItemApi";
import { useAuth } from "../../Context/AuthContext";
import { ServiceCode } from "../../Util/Service_code_final";
import { types } from "../../Util/Common";
import { BookmarkItem } from "../../Style/BookmarkItemStyled";
import { Pagination } from "../../Component/Pagination";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "react-responsive";

export const MyBookmarkTourItem = () => {
  const { user } = useAuth();
  const [bookmarkedSpots, setBookmarkedSpots] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [loading, setLoading] = useState(false);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  // // 북마크된 여행지 불러오기 함수
  // const fetchBookmarkedSpots = async () => {
  //   try {
  //     const data = await BookmarkedSpotsApi.getBookmarkedSpots(
  //       user.id,
  //       page,
  //       size
  //     );
  //     setBookmarkedSpots(data.content);
  //     setTotalPages(data.totalPages);
  //   } catch (err) {
  //     console.error("북마크된 여행지 조회 오류:", err);
  //   }
  // };

  // useEffect(() => {
  //   if (!user?.id) return;
  //   fetchBookmarkedSpots();
  // }, [user?.id, page]);
  const fetchBookmarkedSpots = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const currentPage = page;

      const data = await BookmarkedSpotsApi.getBookmarkedSpots(
        user.id,
        currentPage,
        size
      );
      console.log(data.content);

      // 모바일에서 이전 데이터와 새 데이터의 중복을 피하도록 처리
      if (isMobile) {
        setBookmarkedSpots((prevPlanners) => {
          // 이미 로드된 데이터와 새 데이터가 중복되지 않도록 처리
          const newPlanners = data.content.filter(
            (newPlanner) =>
              !prevPlanners.some((planner) => planner.id === newPlanner.id)
          );
          return [...prevPlanners, ...newPlanners]; // 기존 데이터에 새 데이터만 추가
        });
      } else {
        // PC에서는 새로운 데이터로 덮어씌우기
        setBookmarkedSpots(data.content);
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
      fetchBookmarkedSpots();
    } else {
      // 모바일에서는 page가 변경될 때만 데이터를 추가
      fetchBookmarkedSpots();
    }
  }, [page, isMobile, user.id]);

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
              dataLength={bookmarkedSpots.length} // 현재 데이터 개수
              next={loadMorePlanners} // 추가 데이터를 불러오는 함수
              hasMore={page + 1 < totalPages} // 추가 데이터 여부
              loader={<p>로딩 중...</p>}
              endMessage={<p>더 이상 불러올 데이터가 없습니다.</p>}
            >
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
            </InfiniteScroll>
          ) : bookmarkedSpots.length > 0 ? (
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
