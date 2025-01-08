import {
  Map,
  MapTypeControl,
  ZoomControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import { useKakaoLoader, useMap } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import MarkerPlace from "../Img/markerPlace.png";
import { faL } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

export const KakaoMap = () => {
  useKakaoLoader();
  const [result, setResult] = useState("");
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.5563, lng: 126.9723 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });
  // https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/overlay/basicMarker

  return (
    <>
      <Map // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 37.5563,
          lng: 126.9723,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={5} // 지도의 확대 레벨
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          console.log(
            `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
          );
        }}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
      </Map>
    </>
  );
};

export const KakaoEx = () => {
  // Rest API
  // https://developers.kakao.com/docs/latest/ko/local/dev-guide#address-coord
  // https://react-kakao-maps-sdk.jaeseokim.dev/docs/sample/library/keywordBasic
  // 참고 사이트 : https://m.blog.naver.com/kiddwannabe/221812712712
  // https://bluepebble25.tistory.com/73#--%--%EA%B-%AC%ED%--%--%--%EC%--%B-%EA%B-%B--%---%--react-kakao-maps-sdk%--%ED%-C%A-%ED%--%A-%EC%A-%--%--%EC%-D%B-%EC%-A%A-

  // useEffect(() => {
  //   window.kakao.maps.load(() => {

  //   })
  // })
  //   import React, { useState, useEffect } from "react";
  // import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";

  // export const CombinedKakaoMap = () => {
  //   const [map, setMap] = useState(null);
  //   const [info, setInfo] = useState(null);
  //   const [markers, setMarkers] = useState([]);

  //   const staticData = [
  //     {
  //       content: <div style={{ color: "#000" }}>카카오</div>,
  //       latlng: { lat: 33.450705, lng: 126.570677 },
  //     },
  //     {
  //       content: <div style={{ color: "#000" }}>생태연못</div>,
  //       latlng: { lat: 33.450936, lng: 126.569477 },
  //     },
  //     {
  //       content: <div style={{ color: "#000" }}>텃밭</div>,
  //       latlng: { lat: 33.450879, lng: 126.56994 },
  //     },
  //     {
  //       content: (
  //         <>
  //           <img src="/path/to/marker-image.png" alt="" style={{ margin: "10px" }} />
  //           <div style={{ color: "#000" }}>근린공원</div>
  //         </>
  //       ),
  //       latlng: { lat: 33.451393, lng: 126.570738 },
  //     },
  //   ];

  //   useEffect(() => {
  //     if (!map) return;

  //     const ps = new kakao.maps.services.Places();

  //     ps.keywordSearch("이태원 맛집", (data, status, _pagination) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         const bounds = new kakao.maps.LatLngBounds();
  //         const dynamicMarkers = data.map((place) => {
  //           bounds.extend(new kakao.maps.LatLng(place.y, place.x));
  //           return {
  //             position: { lat: parseFloat(place.y), lng: parseFloat(place.x) },
  //             content: <div style={{ color: "#000" }}>{place.place_name}</div>,
  //           };
  //         });

  //         setMarkers(dynamicMarkers);
  //         map.setBounds(bounds);
  //       }
  //     });
  //   }, [map]);

  //   const EventMarkerContainer = ({ position, content }) => {
  //     const map = useMap();
  //     const [isVisible, setIsVisible] = useState(false);

  //     return (
  //       <MapMarker
  //         position={position}
  //         image={{
  //           src: "/path/to/marker-image.png",
  //           size: { width: 24, height: 35 },
  //         }}
  //         onClick={(marker) => map.panTo(marker.getPosition())}
  //         onMouseOver={() => setIsVisible(true)}
  //         onMouseOut={() => setIsVisible(false)}
  //       >
  //         {isVisible && content}
  //       </MapMarker>
  //     );
  //   };

  //   return (
  //     <Map
  //       center={{ lat: 33.450701, lng: 126.570667 }}
  //       style={{ width: "100%", height: "450px" }}
  //       level={3}
  //       onCreate={setMap}
  //     >
  //       {/* Static Markers */}
  //       {staticData.map((value, index) => (
  //         <EventMarkerContainer
  //           key={`static-${index}`}
  //           position={value.latlng}
  //           content={value.content}
  //         />
  //       ))}

  //       {/* Dynamic Markers from Kakao API */}
  //       {markers.map((marker, index) => (
  //         <EventMarkerContainer
  //           key={`dynamic-${index}`}
  //           position={marker.position}
  //           content={marker.content}
  //         />
  //       ))}
  //     </Map>
  //   );
  // };

  const data = [
    {
      content: <div style={{ color: "#000" }}>카카오</div>,
      latlng: { lat: 33.450705, lng: 126.570677 },
    },
    {
      content: <div style={{ color: "#000" }}>생태연못</div>,
      latlng: { lat: 33.450936, lng: 126.569477 },
    },
    {
      content: <div style={{ color: "#000" }}>텃밭</div>,
      latlng: { lat: 33.450879, lng: 126.56994 },
    },
    {
      content: (
        <>
          <img src={MarkerPlace} alt="" style={{ margin: "10px" }} />
          <div style={{ color: "#000" }}>근린공원</div>
        </>
      ),
      latlng: { lat: 33.451393, lng: 126.570738 },
    },
  ];

  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        image={{
          src: MarkerPlace,
          size: {
            width: 24,
            height: 35,
          },
        }}
        // @ts-ignore
        onClick={(marker) => map.panTo(marker.getPosition())}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    );
  };

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={3} // 지도의 확대 레벨
    >
      {data.map((value) => (
        <EventMarkerContainer
          key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
          position={value.latlng}
          content={value.content}
        />
      ))}
    </Map>
  );
};

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
    setCurrentAddedPlace(marker);
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
          height: "400px",
          margin: "0 auto",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        <h3 style={{ margin: "10px auto" }}>검색 결과</h3>
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
