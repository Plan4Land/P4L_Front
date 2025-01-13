import { useState, useEffect } from "react";
import { TourItem } from "../../Component/ItemListComponent";
import { BookmarkedSpotsApi } from "../../Api/ItemApi";
import { useAuth } from "../../Context/AuthContext";
import { ServiceCode } from "../../Util/Service_code_final";
import { types } from "../../Util/Common";

export const MyBookmarkTourItem = () => {
  const { user } = useAuth();
  const [bookmarkedSpots, setBookmarkedSpots] = useState([]);

  useEffect(() => {
    if (!user?.id) return; // 사용자 ID가 없으면 실행하지 않음
    const loadBookmarkedSpots = async () => {
      try {
        const spots = await BookmarkedSpotsApi.getBookmarkedSpots(user.id);
        console.log("API 응답 데이터:", spots);
        setBookmarkedSpots(spots);
      } catch (err) {
        console.error("북마크된 여행지 조회 오류:", err);
      }
    };
    loadBookmarkedSpots();
  }, [user]);

  return (
    <div>
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
  );
};
