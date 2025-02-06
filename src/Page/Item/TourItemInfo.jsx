import { Header, Footer } from "../../Component/GlobalComponent";
import {
  TourItemInfoBox,
  NearTravelList,
  SpotInformation,
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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { ServiceCode } from "../../Util/Service_code_final";
import { CheckModal } from "../../Util/Modal";

export const TourItemInfo = () => {
  const { id } = useParams();
  const { user } = useAuth(); // useAuth 훅을 통해 user 객체 가져오기
  const [spotDetails, setSpotDetails] = useState(null);
  const [spotApiInfo, setSpotApiInfo] = useState(null);
  const [spotApiDetails, setSpotApiDetails] = useState(null);
  const [spotApiPics, setSpotApiPics] = useState([]);
  const [nearbySpots, setNearbySpots] = useState([]);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 북마크 상태 변경 함수
  const toggleBookmark = async () => {
    try {
      if (!user?.id) {
        setIsModalOpen(true);
        return;
      }

      if (isBookmarked) {
        // 북마크 삭제
        const result = await BookmarkApi.removeBookmark(
          user.id,
          spotDetails.id
        );
        // console.log("북마크 삭제 결과:", result);
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
        // console.log("북마크 추가 결과:", result);
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
          // console.log(nearbyData);
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

        // console.log("apiSpot : ", apiSpot);
        // console.log("apiPics : ", apiPics);
        // console.log(spotApiPics);
        // console.log("apidetails : ", apiSpotDetail);
      } catch (error) {
        console.error(
          "여행지 상세 정보 조회 오류 또는 근처 관광지 조회 오류:",
          error
        );
      }
    };

    fetchSpotDetails();
  }, [id, user]);
  useEffect(() => {
    // console.log("spotApiPics : ", spotApiPics);
  }, [spotApiPics]); // spotApiPics가 변경될 때마다 실행
  // 여행지 상세 정보 불러오기
  if (!spotDetails) {
    return (
      <Loading>
        <p>정보를 불러오는 중 입니다.</p>
      </Loading>
    );
  }

  // 기본 썸네일 설정
  const defaultThumbnail =
    spotDetails.thumbnail ||
    (spotDetails.typeId === "100"
      ? cate1
      : spotDetails.typeId === "200"
      ? cate2
      : spotDetails.typeId === "300"
      ? cate3
      : cate1);

  // API에서 가져온 이미지 URL 추출
  const apiImageUrls = Array.isArray(spotApiPics.item)
    ? spotApiPics.item.map((pic) => pic.originimgurl).filter(Boolean) // 유효한 URL만 추출
    : [];
  // console.log("API 이미지 URL들:", apiImageUrls);

  // 최종 이미지 배열 생성
  const images = apiImageUrls.length > 0 ? apiImageUrls : [defaultThumbnail];
  // console.log("이미지 배열", images);

  const handleTabClick = (tab) => {
    setActiveTab(tab); // 클릭된 탭으로 상태 변경
  };

  const getCategoryName = (cat1, cat2, cat3) => {
    const cat1Item = ServiceCode.find((item) => item.cat1 === cat1);
    const cat2Item = cat1Item?.cat2List.find((item) => item.cat2 === cat2);
    const cat3Item = cat2Item?.cat3List.find((item) => item.cat3 === cat3);

    return [cat1Item?.cat1Name, cat2Item?.cat2Name, cat3Item?.cat3Name]
      .filter(Boolean)
      .join(" > ");
  };

  return (
    <>
      {/* <Header /> */}
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
              <p>북마크 수: {spotDetails?.bookmark}</p>
            </div>
            <div className="tourThumb">
              {images.length > 1 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`여행지 이미지 ${index + 1}`}
                        className="tour-image"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img
                  src={images[0]} // 기본 이미지 또는 첫 번째 이미지를 표시
                  alt="여행지 기본 이미지"
                  className="tour-image"
                />
              )}
            </div>
            <SpotInformation>
              <div className="tabs">
                <button
                  className={`tab-button ${
                    activeTab === "basic" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("basic")}
                >
                  기본 정보
                </button>
                <p>|</p>
                <button
                  className={`tab-button ${
                    activeTab === "detail" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("detail")}
                >
                  상세 정보
                </button>
              </div>

              {/* 기본 정보 탭 */}
              {activeTab === "basic" && (
                <div className="info-detail">
                  <div className="informationDetail">
                    <div className="info-item">
                      <span className="info-name">&nbsp;&nbsp;주소</span>
                      <span className="info-content">
                        {spotDetails?.addr1 || "정보 없음"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-name">&nbsp;&nbsp;문의 전화</span>
                      <span className="info-content">
                        {spotApiDetails?.infocenter
                          ? spotApiDetails.infocenter
                              .split("<br>")
                              .map((line, i) => (
                                <div key={i}>
                                  {line}
                                  {i <
                                    spotApiDetails.infocenter.split("<br>")
                                      .length -
                                      1 && <br />}
                                </div>
                              ))
                          : "정보 없음"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-name">&nbsp;&nbsp;주차</span>
                      <span
                        className="info-content"
                        dangerouslySetInnerHTML={{
                          __html: spotApiDetails?.parking || "정보 없음",
                        }}
                      />
                    </div>
                    <div className="info-item">
                      <span className="info-name">&nbsp;&nbsp;휴무일</span>
                      <span className="info-content">
                        {spotApiDetails?.restdate
                          ? spotApiDetails.restdate
                              .split("<br>")
                              .map((line, i) => (
                                <div key={i}>
                                  {line}
                                  {i <
                                    spotApiDetails.restdate.split("<br>")
                                      .length -
                                      1 && <br />}
                                </div>
                              ))
                          : "정보 없음"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-name">&nbsp;&nbsp;운영 시간</span>
                      <span className="info-content">
                        {spotApiDetails?.usetime
                          ? spotApiDetails.usetime
                              .split("<br>")
                              .map((line, i) => (
                                <div key={i}>
                                  {line}
                                  {i <
                                    spotApiDetails.usetime.split("<br>")
                                      .length -
                                      1 && <br />}
                                </div>
                              ))
                          : "정보 없음"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-name">&nbsp;&nbsp;홈페이지</span>
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
                    </div>
                  </div>
                </div>
              )}

              {/* 상세 정보 탭 */}
              {activeTab === "detail" && (
                <div className="info-description">
                  <div className="informationDetail">
                    {spotApiInfo?.overview
                      ? spotApiInfo.overview.split("<br>").map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i <
                              spotApiInfo.overview.split("<br>").length - 1 && (
                              <br />
                            )}
                          </React.Fragment>
                        ))
                      : "정보 없음"}
                  </div>
                </div>
              )}
            </SpotInformation>

            <div className="item-map">
              <KakaoMapSpot mapX={spotDetails.mapX} mapY={spotDetails.mapY} />
              <NearTravelList>
                <h3>주변 관광지</h3>
                {nearbySpots.length > 0 && (
                  <div className="nearby-travelspot">
                    {nearbySpots.map((spot) => {
                      const categoryPath = getCategoryName(
                        spot.cat1,
                        spot.cat2,
                        spot.cat3
                      );
                      return (
                        <div key={spot.id}>
                          <div className="nearbybox">
                            <Link
                              to={`/tourItemInfo/${spot.id}`}
                              className="nearbyspot"
                            >
                              <h4>{spot.title}</h4>
                              <p>{categoryPath}</p>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </NearTravelList>
            </div>
          </>
        ) : (
          <p>여행지 정보를 불러오는 중입니다...</p>
        )}
      </TourItemInfoBox>
      <CheckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>로그인이 필요한 서비스입니다.</p>
      </CheckModal>
      {/* <Footer /> */}
    </>
  );
};
