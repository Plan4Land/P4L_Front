import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
  Roadview,
  RoadviewMarker,
} from "react-kakao-maps-sdk";
import { useKakaoLoader, useMap } from "react-kakao-maps-sdk";
import React, { useState, useEffect } from "react";

const { kakao } = window;

export const KakaoMapSpot = ({ mapX, mapY }) => {
  const [toggle, setToggle] = useState("map");
  const placePosition = {
    lat: mapY,
    lng: mapX,
  };
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Map // 로드뷰를 표시할 Container
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
              top: "5px",
              left: "5px",
              zIndex: 10,
            }}
            type="button"
            onClick={() => setToggle("roadview")}
            title="로드뷰 보기"
            value="로드뷰"
          />
        )}
      </Map>
      <Roadview // 로드뷰를 표시할 Container
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
              top: "5px",
              left: "5px",
              zIndex: 10,
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

// export const KakaoMapEx = () => {
//   useKakaoLoader();
//   const [result, setResult] = useState("");
//   const [state, setState] = useState({
//     // 지도의 초기 위치
//     center: { lat: 37.5563, lng: 126.9723 },
//     // 지도 위치 변경시 panto를 이용할지에 대해서 정의
//     isPanto: false,
//   });
//   // https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/overlay/basicMarker

//   return (
//     <>
//       <Map // 지도를 표시할 Container
//         id="map"
//         center={{
//           // 지도의 중심좌표
//           lat: 37.5563,
//           lng: 126.9723,
//         }}
//         style={{
//           width: "100%",
//           height: "100%",
//         }}
//         level={5} // 지도의 확대 레벨
//         onClick={(_, mouseEvent) => {
//           const latlng = mouseEvent.latLng;
//           console.log(
//             `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
//           );
//         }}
//       >
//         <MapTypeControl position={"TOPRIGHT"} />
//         <ZoomControl position={"RIGHT"} />
//       </Map>
//     </>
//   );
// };

export const KakaoMap = React.memo(({ plans, date }) => {
  // Rest API
  // https://developers.kakao.com/docs/latest/ko/local/dev-guide#address-coord
  // https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/library/keywordBasic
  // 참고 사이트 : https://m.blog.naver.com/kiddwannabe/221812712712
  // https://bluepebble25.tistory.com/73#--%--%EA%B-%AC%ED%--%--%--%EC%--%B-%EA%B-%B--%---%--react-kakao-maps-sdk%--%ED%-C%A-%ED%--%A-%EC%A-%--%--%EC%-D%B-%EC%-A%A-

  const [centerLatLng, setCenterLatLng] = useState({
    lat: plans[Object.keys(plans)[0]]?.[0].latitude,
    lng: plans[Object.keys(plans)[0]]?.[0].longitude,
  });
  // const [firstPlan, setFirstPlan] = useState(null);
  const firstPlan = plans[date]?.[0];

  console.log("카카오맵에 plans : ", plans, date);
  const allPlans = Object.values(plans).flat();
  // const filteredPlans = plans[date] || [];

  // const firstPlan = plans[firstDate]?.[0];
  // console.log("firstDate : ", firstDate);
  // console.log("firstPlan : ", firstPlan);

  useEffect(() => {
    if (firstPlan) {
      setCenterLatLng({
        lat: parseFloat(firstPlan.latitude || firstPlan.position.lat),
        lng: parseFloat(firstPlan.longitude || firstPlan.position.lng),
      });
    } else {
      setCenterLatLng({
        lat: allPlans[0]?.latitude,
        lng: allPlans[0]?.longitude,
      });
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
      setCenterLatLng(position);
      map.setLevel(4);
    };
    const markerImage = (category) => {
      if (category?.includes("숙박")) {
        return "/img/cateimg/markerRoom.png";
      } else if (category?.includes("음식")) {
        return "/img/cateimg/markerFood.png";
      } else {
        return "/img/cateimg/markerPlace.png";
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
        {isVisible && content}
      </MapMarker>
    );
  };

  return (
    <Map // 지도를 표시할 Container
      center={centerLatLng}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={4} // 지도의 확대 레벨
    >
      {data.map((value) => (
        <EventMarkerContainer
          key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
          position={value.latlng}
          content={value.content}
          category={value.category}
        />
      ))}
    </Map>
  );
});

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
    console.log(marker);

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
      <div
        style={{
          width: "90%",
          height: "385px",
          margin: "0 auto",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        <h4 style={{ margin: "3px auto" }}>검색 결과</h4>
        <hr />
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {markers.map((marker, index) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
};
