import { HeaderSt, NavSt, FooterSt } from "../Style/GlobalStyle";
import { Link, useLocation } from "react-router-dom";
import logo from "../Img/Plan4landLogo.png";
import { useState } from "react";
export const Header = () => {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path, queryParams = null) => {
    const currentPath = location.pathname;
    const currentSearch = location.search;

    if (path === "/post" && !queryParams) {
      return currentPath === path && currentSearch === "";
    }

    const isPathMatch = currentPath === path;

    if (queryParams) {
      const currentParams = new URLSearchParams(currentSearch);
      const targetParams = new URLSearchParams(queryParams);

      const isQueryMatch = [...targetParams].every(
        ([key, value]) => currentParams.get(key) === value
      );
      return isPathMatch && isQueryMatch;
    }

    return isPathMatch;
  };
  return (
    <HeaderSt>
      <Link to="/" className="logo">
        <img src={logo} alt="Plan4land Logo" />
      </Link>
      <NavSt>
        <Link
          to="/post?category=교통" // 이후 페이지 생성시 해당 부분 수정
          className={`tag ${
            isActive("/post", "category=교통") ? "active" : ""
          }`}
        >
          교통
        </Link>
        <p>|</p>
        <Link
          to="/post?category=관광지"
          className={`tag ${
            isActive("/post", "category=관광지") ? "active" : ""
          }`}
        >
          관광지
        </Link>
        <p>|</p>
        <Link
          to="/post?category=플래닝"
          className={`tag ${
            isActive("/post", "category=플래닝") ? "active" : ""
          }`}
        >
          플래닝
        </Link>
      </NavSt>
      <Link to="/search" className="search-link">
        <div className="search-container">
          <span className="placeholder">검색하세요.</span>
        </div>
      </Link>
      <div className="recomm">추천합니다.</div>
      <Link to="/mypage" className="profile-link">
        <div className="dropdown">
          <Link to="/mypage" className="dropdown-item">
            마이페이지
          </Link>
          <button
            className="dropdown-item"
            onClick={(e) => {
              e.preventDefault();
              setShowLogoutModal(true);
            }}
          >
            로그아웃
          </button>
        </div>
      </Link>
      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <p>로그아웃 하시겠습니까?</p>
            <button
              onClick={() => {
                setShowLogoutModal(false);
              }}
            >
              확인
            </button>
            <button onClick={() => setShowLogoutModal(false)}>취소</button>
          </div>
        </div>
      )}
    </HeaderSt>
  );
};

export const Footer = () => {
  return <FooterSt>footer 입니다.</FooterSt>;
};
