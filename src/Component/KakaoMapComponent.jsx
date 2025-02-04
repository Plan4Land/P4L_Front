import { Map, MapMarker, Roadview, RoadviewMarker } from "react-kakao-maps-sdk";
import { useMap } from "react-kakao-maps-sdk";
import React, { useState, useEffect, useMemo } from "react";
import { ScrollBar } from "./ButtonComponent";
import styled from "styled-components";
import markerFood from "../Img/cateimg/markerFood.png";
import markerPlace from "../Img/cateimg/markerPlace.png";
import markerRoom from "../Img/cateimg/markerRoom.png";
import { colors } from "../Style/GlobalStyle";

const { kakao } = window;

// 관광지 상세페이지에 사용되는 지도
export const KakaoMapSpot = ({ mapX, mapY }) => {
  const [toggle, setToggle] = useState("map");
  const placePosition = {
    lat: mapY,
    lng: mapX,
  };
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Map
        center={placePosition}
        style={{
          display: toggle === "map" ? "block" : "none",
          width: "100%",
          height: "100%",
        }}
        level={3}
      >
        <MapMarker position={placePosition} />
        {toggle === "map" && (
          <input
            style={{
              position: "absolute",
              width: "55px",
              top: "5px",
              left: "5px",
              zIndex: 10,
              backgroundColor: colors.colorC,
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            type="button"
            onClick={() => setToggle("roadview")}
            value="로드뷰"
          />
        )}
      </Map>
      <Roadview
        position={{ ...placePosition, radius: 50 }}
        style={{
          display: toggle === "roadview" ? "block" : "none",
          width: "100%",
          height: "100%",
        }}
      >
        <RoadviewMarker position={placePosition} />
        {toggle === "roadview" && (
          <input
            style={{
              position: "absolute",
              width: "55px",
              top: "5px",
              left: "5px",
              zIndex: 10,
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            type="button"
            onClick={() => setToggle("map")}
            title="지도 보기"
            value="지도"
          />
        )}
      </Roadview>
    </div>
  );
};

export const MapInfo = styled.div`
  color: ${colors.colorD};
`;

// 플래너 페이지에 사용되는 지도
export const KakaoMap = React.memo(({ plans, date }) => {
  // plans, date가 이전 렌더링과 동일하면 재렌더링 안함(React.memo)
  const [prevLatLng, setPrevLatLng] = useState(null);

  const firstPlan = plans[date]?.[0];

  const allPlans = Object.values(plans).flat();
  const sortedPlans = allPlans.sort((a, b) => {
    const dateComparison = new Date(a.date) - new Date(b.date);
    if (dateComparison !== 0) return dateComparison;

    // date가 같을 경우 seq 순으로 정렬 (오름차순)
    return a.seq - b.seq;
  });

  const centerLatLng = useMemo(() => {
    // centerLatLng값이 plans나 date가 변경되었을때만 재계산
    if (firstPlan) {
      const newLatLng = {
        lat: parseFloat(firstPlan.latitude || firstPlan.position.lat),
        lng: parseFloat(firstPlan.longitude || firstPlan.position.lng),
      };
      setPrevLatLng(newLatLng); // 새로운 lat, lng 값을 저장
      return newLatLng;
    } else if (prevLatLng === null && sortedPlans.length > 0) {
      const newLatLng = {
        lat: parseFloat(
          sortedPlans[0]?.latitude || sortedPlans[0]?.position.lat
        ),
        lng: parseFloat(
          sortedPlans[0]?.longitude || sortedPlans[0]?.position.lng
        ),
      };
      setPrevLatLng(newLatLng); // 이전 값으로 저장
      return newLatLng;
    } else if (prevLatLng) {
      return prevLatLng;
    } else {
      const defaultLatLng = {
        lat: plans[Object.keys(plans)[0]]?.[0].latitude || 37.5563,
        lng: plans[Object.keys(plans)[0]]?.[0].longitude || 126.9723,
      };
      return defaultLatLng;
    }
  }, [plans, date]);

  const data = Object.values(plans)
    .flat()
    .map((plan) => ({
      content: (
        <>
          <div style={{ color: "#000", width: "200px" }}>
            {plan.spotName || plan.content}
          </div>
        </>
      ),
      latlng: {
        lat: parseFloat(plan.latitude || plan.position.lat),
        lng: parseFloat(plan.longitude || plan.position.lng),
      },
      category: plan.category,
    }));

  const EventMarkerContainer = ({ position, content, category }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);
    const handleOnClickMarker = () => {
      const latLng = new kakao.maps.LatLng(position.lat, position.lng);
      map.setCenter(latLng);
      map.setLevel(4);
    };
    const markerImage = (category) => {
      if (category?.includes("숙박") || category?.includes("부동산")) {
        return markerRoom;
      } else if (category?.includes("음식")) {
        return markerFood;
      } else {
        return markerPlace;
      }
    };

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        image={{
          src: markerImage(category),
          size: {
            width: 24,
            height: 35,
          },
        }}
        // @ts-ignore
        onClick={() => handleOnClickMarker()}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && (
          <div
            style={{
              padding: "4px 6px", // 패딩
              fontSize: "14px", // 글씨 크기
              fontWeight: "bold", // 글씨 굵기
              textAlign: "center", // 텍스트 가운데 정렬
            }}
          >
            {content}
          </div>
        )}
      </MapMarker>
    );
  };

  return (
    <Map // 지도를 표시할 Container
      center={centerLatLng}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
      }}
      level={4} // 지도의 확대 레벨
    >
      {data.map((value, index) => (
        <EventMarkerContainer
          key={`${value.latlng.lat}-${value.latlng.lng}-${index}`}
          position={value.latlng}
          content={value.content}
          category={value.category}
        />
      ))}
    </Map>
  );
});

export const ScrollableStyle = styled.div`
  width: 90%;
  height: 385px;
  max-height: 385px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ddd;
  overflow-y: scroll;
  ${ScrollBar}
  @media (max-width: 768px) {
    height: 315px;
  }
`;
// 플래너 페이지에서 장소 추가할 때 검색
export const SearchKakaoMap = ({
  searchKeyword,
  setModals,
  setCurrentAddedPlace,
}) => {
  const [info, setInfo] = useState(); // 현재 선택된 마커의 정보
  const [markers, setMarkers] = useState([]); // 지도에 표시할 마커 목록
  const [map, setMap] = useState(); // 카카오 지도 객체

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];
        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name, // 장소명
            address: data[i].address_name,
            category: data[i].category_name, // 카테고리 ex) 여행 > 관광,명소 > 테마파크
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        map.setBounds(bounds);
      }
    });
  }, [searchKeyword, map]);

  const handleListItemClick = (marker) => {
    // 마커 클릭 시 지도 이동 및 정보 업데이트
    const position = new kakao.maps.LatLng(
      marker.position.lat,
      marker.position.lng
    );
    map.setCenter(position);
    setInfo(marker);

    setCurrentAddedPlace((prev) => ({
      ...prev,
      ...marker,
    }));

    setModals((prevModals) => ({ ...prevModals, addPlaceModal: false }));
  };
  return (
    <div>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          display: "none",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          ></MapMarker>
        ))}
      </Map>
      <ScrollableStyle>
        <h4 style={{ margin: "3px auto" }}>검색 결과</h4>
        <hr />
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {markers.length > 0 ? (
            markers.map((marker, index) => (
              <li
                key={index}
                onClick={() => handleListItemClick(marker)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                }}
              >
                <strong>{marker.content}</strong>
                <br />
                <span style={{ fontSize: "12px", color: "#666" }}>
                  {marker.address}
                </span>
              </li>
            ))
          ) : (
            <li
              style={{
                padding: "10px",
                textAlign: "center",
                color: "#999",
              }}
            >
              검색 결과가 없습니다
            </li>
          )}
        </ul>
      </ScrollableStyle>
    </div>
  );
};
