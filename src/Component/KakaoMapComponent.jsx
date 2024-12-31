import { Map, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { useState } from "react";

export const KakaoMap = () => {
  useKakaoLoader();
  const [result, setResult] = useState("");
  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.5563, lng: 126.9723 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

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
          width: "400px",
          height: "400px",
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
