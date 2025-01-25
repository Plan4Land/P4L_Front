import { Header, Footer } from "../../Component/GlobalComponent";
import {
  TourItemInfoBox,
  NearTravelList,
} from "../../Style/TourItemInfoStyled";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TourItemApi, BookmarkApi } from "../../Api/ItemApi";
import { KakaoMapSpot } from "../../Component/KakaoMapComponent";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons"; // 채워진 북마크
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons"; // 빈 북마크
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../Context/AuthContext";
import { Loading } from "../../Component/LoadingComponent";
import cate1 from "../../Img/cateimg/type_100.png";
import cate2 from "../../Img/cateimg/type_200.png";
import cate3 from "../../Img/cateimg/type_300.png";

export const TourItemInfo = () => {
  const { id } = useParams();
  const { user } = useAuth(); // useAuth 훅을 통해 user 객체 가져오기
  const [spotDetails, setSpotDetails] = useState(null);
  const [spotApiInfo, setSpotApiInfo] = useState(null);
  const [spotApiDetails, setSpotApiDetails] = useState(null);
  const [spotApiPics, setSpotApiPics] = useState(null);
  const [nearbySpots, setNearbySpots] = useState([]);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 상태 변경 함수
  const toggleBookmark = async () => {
    try {
      if (!user?.id) {
        console.error("사용자 ID가 없습니다");
        return;
      }

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
        // 여행지 상세 정보 조회
        const data = await TourItemApi.getSpotDetails(id);
        setSpotDetails(data);

        // 북마크 상태 확인
        if (user?.id) {
          const bookmarkStatus = await BookmarkApi.getBookmarkStatus(
            user.id,
            id
          );
          setIsBookmarked(bookmarkStatus);
        }

        // 근처 관광지 목록 조회
        if (data.mapX && data.mapY) {
          const nearbyData = await TourItemApi.getNearbySpots(
            data.mapX,
            data.mapY,
            5,
            id
          ); // 5km 반경
          setNearbySpots(nearbyData);
        }

        const apiSpot = await TourItemApi.getSpotApiInfo(id);
        setSpotApiInfo(apiSpot);
        const apiPics = await TourItemApi.getSpotApiPics(id);
        setSpotApiPics(apiPics);
        const apiSpotDetail = await TourItemApi.getSpotApiDetails(
          id,
          apiSpot.contenttypeid
        );
        setSpotApiDetails(apiSpotDetail);

        console.log("apiSpot : ", apiSpot);
        console.log("apiPics : ", apiPics);
        console.log("apidetails : ", apiSpotDetail);
      } catch (error) {
        console.error(
          "여행지 상세 정보 조회 오류 또는 근처 관광지 조회 오류:",
          error
        );
      }
    };

    fetchSpotDetails();
  }, [id, user]);

  if (!spotDetails) {
    return (
      <Loading>
        {" "}
        <p>정보를 불러오는 중 입니다.</p>
      </Loading>
    );
  }

  return (
    <>
      <Header />
      <TourItemInfoBox>
        {spotDetails ? (
          <>
            <div className="tour-details">
              <button className="bookmark" onClick={toggleBookmark}>
                <FontAwesomeIcon
                  icon={isBookmarked ? solidBookmark : regularBookmark}
                />
              </button>
              <div className="info">
                <h1 className="tour-title">{spotDetails.title}</h1>
              </div>
            </div>
            <div className="tourThumb">
              <img
                src={
                  spotDetails.thumbnail ||
                  (spotDetails.typeId === "100"
                    ? cate1
                    : spotDetails.typeId === "200"
                    ? cate2
                    : spotDetails.typeId === "300"
                    ? cate3
                    : "/profile-pic/basic1.png") // 기본 이미지
                }
                alt="여행지 이미지"
                className="tour-image"
              />
            </div>
            <h2>기본 정보</h2>
            <div className="info-detail">
              <div className="info-left">
                <li className="info-item">
                  <span className="info-name">·&nbsp;&nbsp;주소</span>
                  <span className="info-content">
                    {spotDetails?.addr1 || "정보 없음"}
                  </span>
                </li>
                <li className="info-item">
                  <span className="info-name">·&nbsp;&nbsp;문의 전화</span>
                  {/* <span
                    className="info-content"
                    dangerouslySetInnerHTML={{
                      __html: spotApiDetails?.infocenter || "정보 없음",
                    }}
                  /> */}
                  <span className="info-content">
                    {spotApiDetails?.infocenter
                      ? spotApiDetails.infocenter
                          .split("<br>")
                          .map((line, i) => (
                            <div key={i}>
                              {line}
                              {i <
                                spotApiDetails.infocenter.split("<br>").length -
                                  1 && <br />}
                            </div>
                          ))
                      : "정보 없음"}
                  </span>
                </li>
                <li className="info-item">
                  <span className="info-name">·&nbsp;&nbsp;주차</span>
                  <span
                    className="info-content"
                    dangerouslySetInnerHTML={{
                      __html: spotApiDetails?.parking || "정보 없음",
                    }}
                  />
                </li>
                <li className="info-item">
                  <span className="info-name">·&nbsp;&nbsp;북마크 수</span>
                  <span className="info-content">{spotDetails?.bookmark}</span>
                </li>
              </div>
              <div className="info-right">
                <li className="info-item">
                  <span className="info-name">·&nbsp;&nbsp;휴일</span>
                  <span className="info-content">
                    {spotApiDetails?.restdate
                      ? spotApiDetails.restdate.split("<br>").map((line, i) => (
                          <div key={i}>
                            {line}
                            {i <
                              spotApiDetails.restdate.split("<br>").length -
                                1 && <br />}
                          </div>
                        ))
                      : "정보 없음"}
                  </span>
                </li>
                <li className="info-item">
                  <span className="info-name">·&nbsp;&nbsp;운영 시간</span>
                  <span className="info-content">
                    {spotApiDetails?.usetime
                      ? spotApiDetails.usetime.split("<br>").map((line, i) => (
                          <div key={i}>
                            {line}
                            {i <
                              spotApiDetails.usetime.split("<br>").length -
                                1 && <br />}
                          </div>
                        ))
                      : "정보 없음"}
                  </span>
                </li>

                <li className="info-item">
                  <span className="info-name">·&nbsp;&nbsp;홈페이지</span>
                  {spotApiInfo?.homepage ? (
                    spotApiInfo.homepage.startsWith("www.") ? (
                      <a
                        href={`http://${spotApiInfo.homepage}`}
                        className="info-content"
                      >
                        {`http://${spotApiInfo.homepage}`}
                      </a>
                    ) : spotApiInfo.homepage.includes('<a href="') ? (
                      <a
                        href={spotApiInfo.homepage.split('"')[1]}
                        className="info-content"
                      >
                        {spotApiInfo.homepage.split('"')[1]}
                      </a>
                    ) : (
                      <span className="info-content">
                        {spotApiInfo.homepage}
                      </span>
                    )
                  ) : (
                    <span className="info-content">정보 없음</span>
                  )}
                </li>
              </div>
            </div>
            <h2>상세 정보</h2>
            <div className="info-description">
              {spotApiInfo?.overview
                ? spotApiInfo.overview.split("<br>").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < spotApiInfo.overview.split("<br>").length - 1 && (
                        <br />
                      )}
                    </React.Fragment>
                  ))
                : "정보 없음"}
            </div>
            <div className="item-map">
              <KakaoMapSpot mapX={spotDetails.mapX} mapY={spotDetails.mapY} />
              <NearTravelList>
                <h3>주변 관광지</h3>
                {nearbySpots.length > 0 && (
                  <div className="nearby-travelspot">
                    {nearbySpots.map((spot) => (
                      <div key={spot.id}>
                        <div className="nearbybox">
                          <Link
                            to={`/tourItemInfo/${spot.id}`}
                            className="nearbyspot"
                          >
                            <h4>{spot.title}</h4>
                            <p>주소: {spot.addr1}</p>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </NearTravelList>
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
