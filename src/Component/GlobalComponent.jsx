import { HeaderSt, NavSt, FooterSt } from "../Style/GlobalStyle";
import { Link, useLocation } from "react-router-dom";
import logo from "../Img/Plan4landLogo.png";

export const Header = () => {
  return (
    <HeaderSt>
      <Link to="/" className="logo">
        <img src={logo} alt="Plan4land Logo" />
      </Link>
      <Link to="/search" className="search-link">
        <div className="search-container">
          <span className="placeholder">검색하세요.</span>
        </div>
      </Link>
      <Link to="/mypage" className="profile-link">
        <p>mypage</p>
      </Link>
    </HeaderSt>
  );
};

export const Nav = () => {
  const location = useLocation();

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
    <NavSt>
      <Link to="/post" className={`tag ${isActive("/post") ? "active" : ""}`}>
        전체
      </Link>
      <p>|</p>
      <Link
        to="/post?category=교통" // 이후 페이지 생성시 해당 부분 수정
        className={`tag ${isActive("/post", "category=교통") ? "active" : ""}`}
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
  );
};
export const Footer = () => {
  return <FooterSt>footer 입니다.</FooterSt>;
};
