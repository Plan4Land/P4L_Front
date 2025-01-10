import { Header, Footer } from "../../Component/GlobalComponent";
import { TourItemInfoBox } from "../../Style/TourItemInfoStyled";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TourItemApi } from "../../Api/ItemApi";

export const TourItemInfo = () => {
  const { id } = useParams();
  const [spotDetails, setSpotDetails] = useState(null);

  useEffect(() => {
    const fetchSpotDetails = async () => {
      try {
        const details = await TourItemApi.getSpotDetails(id);
        setSpotDetails(details); // 데이터를 받아서 상태에 저장
      } catch (error) {
        console.error("여행지 상세 정보 조회 오류:", error);
      }
    };
    fetchSpotDetails();
  }, [id]);

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
              src={spotDetails.thumbnail || "/profile-pic/basic2.png"}
              alt="여행지 이미지"
              className="tour-image"
            />
            <div className="item-map">
              <p>위치 지도</p>
            </div>
            <div className="tour-details">
              <h1 className="tour-title">{spotDetails.title}</h1>
              <p>주소: {spotDetails.addr1 || "정보 없음"}</p>
              <p>연락처: {spotDetails.tel || "정보 없음"}</p>
              <p>북마크 수: {spotDetails.bookmarkCount || "정보 없음"}</p>
            </div>
          </>
        ) : (
          <p>여행지 정보를 불러오는 중입니다...</p> // 로딩 메시지
        )}
      </TourItemInfoBox>
      <Footer />
    </>
  );
};
