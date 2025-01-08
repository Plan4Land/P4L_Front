import { HeaderSt, NavSt, FooterSt } from "../Style/GlobalStyle";
import { Link, useLocation } from "react-router-dom";
import logo from "../Img/Plan4landLogo.png";
import { useState } from "react";
import { Modal } from "../Util/Modal";

export const Header = () => {
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path, query = "") => {
    const pathnameMatches = location.pathname.startsWith(path);
    const queryMatches = query ? location.search.includes(query) : true;
    return pathnameMatches && queryMatches;
  };

  return (
    <HeaderSt>
      <Link to="/" className="logo">
        <img src={logo} alt="Plan4land Logo" />
      </Link>
      <NavSt>
        <Link
          to="/ktxinquiry" // 이후 페이지 생성시 해당 부분 수정
          className={`tag ${isActive("/ktxinquiry") ? "active" : ""}`}
        >
          교통
        </Link>
        <p>|</p>
        <Link
          to="/tourlist"
          className={`tag ${isActive("/tourlist") ? "active" : ""}`}
        >
          관광지
        </Link>
        <p>|</p>
        <Link
          to="/planninglist"
          className={`tag ${isActive("/planninglist") ? "active" : ""}`}
        >
          플래닝
        </Link>
      </NavSt>
      <div className="recomm">추천합니다.</div>
      <div
        className="profile-link"
        onClick={() => {
          if (!showLogoutModal) {
            window.location.href = "/mypage";
          }
        }}
      >
        <div className="dropdown" onClick={(e) => e.stopPropagation()}>
          <Link to="/mypage" className="dropdown-item">
            마이페이지
          </Link>
          <button
            className="dropdown-item"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowLogoutModal(true);
            }}
          >
            로그아웃
          </button>
        </div>
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            setShowLogoutModal(false);
          }}
        >
          <p>로그아웃 하시겠습니까?</p>
        </Modal>
      </div>
    </HeaderSt>
  );
};

export const Footer = () => {
  return <FooterSt>footer 입니다.</FooterSt>;
};
