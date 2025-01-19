import { Header, Footer } from "../../Component/GlobalComponent";
import { TourItemInfoBox } from "../../Style/TourItemInfoStyled";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TourItemApi, BookmarkApi } from "../../Api/ItemApi";
import { KakaoMapSpot } from "../../Component/KakaoMapComponent";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons"; // 채워진 북마크
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons"; // 빈 북마크
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../Context/AuthContext";

export const TourItemInfo = () => {
  const { id } = useParams();
  const { user } = useAuth(); // useAuth 훅을 통해 user 객체 가져오기
  const [spotDetails, setSpotDetails] = useState(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 상태 변경 함수
  const toggleBookmark = async () => {
    try {
      if (!user?.id) {
        console.error("사용자 ID가 없습니다");
        return;
      }

      console.log("memberId:", user.id);
      console.log("spotId:", spotDetails.id);

      if (isBookmarked) {
        // 북마크 삭제
        const result = await BookmarkApi.removeBookmark(
          user.id,
          spotDetails.id
        );
        console.log("북마크 삭제 결과:", result);
        setIsBookmarked(false);
        setBookmarkCount((prev) => prev - 1);
        // 북마크 수 직접 업데이트
        setSpotDetails((prevDetails) => ({
          ...prevDetails,
          bookmark: prevDetails.bookmark - 1, // 바로 반영
        }));
      } else {
        // 북마크 추가
        const result = await BookmarkApi.addBookmark(user.id, spotDetails.id);
        console.log("북마크 추가 결과:", result);
        setIsBookmarked(true);
        setBookmarkCount((prev) => prev + 1);
        // 북마크 수 직접 업데이트
        setSpotDetails((prevDetails) => ({
          ...prevDetails,
          bookmark: prevDetails.bookmark + 1, // 바로 반영
        }));
      }
    } catch (error) {
      console.error("북마크 상태 변경 실패:", error);
    }
  };

  // 여행지 상세 정보 불러오기
  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        const data = await TourItemApi.getSpotDetails(id);
        setSpotDetails(data);

        if (user?.id) {
          const bookmarkStatus = await BookmarkApi.getBookmarkStatus(
            user.id,
            id
          );
          setIsBookmarked(bookmarkStatus);
        }
      } catch (error) {
        console.error("여행지 상세 정보 조회 오류:", error);
      }
    };

    fetchSpotDetails();
  }, [id, user]);

  if (!spotDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <TourItemInfoBox>
        {spotDetails ? (
          <>
            <img
  src={
    spotDetails.thumbnail ||
    (spotDetails.typeId === "100"
      ? "/img/cateimg/type_200.png"
      : spotDetails.typeId === "200"
      ? "/img/cateimg/type_200.png"
      : spotDetails.typeId === "300"
      ? "/img/cateimg/type_300.png"
      : "/profile-pic/basic1.png") // 기본 이미지
  }
  alt="여행지 이미지"
  className="tour-image"
/>

            <div className="tour-details">
              <button className="bookmark" onClick={toggleBookmark}>
                <FontAwesomeIcon
                  icon={isBookmarked ? solidBookmark : regularBookmark}
                />
              </button>
              <h1 className="tour-title">{spotDetails.title}</h1>
              <p>주소: {spotDetails.addr1 || "정보 없음"}</p>
              <p>연락처: {spotDetails.tel || "정보 없음"}</p>
              <p>북마크 수: {spotDetails.bookmark}</p>
            </div>
            <div className="item-map">
              <KakaoMapSpot mapX={spotDetails.mapX} mapY={spotDetails.mapY} />
            </div>
          </>
        ) : (
          <p>여행지 정보를 불러오는 중입니다...</p>
        )}
      </TourItemInfoBox>
      <Footer />
    </>
  );
};
