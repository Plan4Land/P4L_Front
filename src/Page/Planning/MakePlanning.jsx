import { useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import { SearchKakaoMap } from "../../Component/KakaoMapComponent";

export const MakePlanning = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  console.log(process.env.REACT_APP_KAKAOMAP_KEY);
  return (
    <>
      <Header />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={handleInputChange}
          style={{
            width: "300px",
            height: "40px",
            fontSize: "16px",
            marginBottom: "20px",
            padding: "5px",
          }}
        />
      </div>
      <div style={{ height: "500px" }}>
        <SearchKakaoMap searchKeyword={searchKeyword} />{" "}
      </div>
      <Footer />
    </>
  );
};
