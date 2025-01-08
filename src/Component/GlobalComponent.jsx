import { HeaderSt, NavSt, FooterSt } from "../Style/GlobalStyle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../Img/Plan4landLogo.png";
import { useState, useRef } from "react";
import { Modal } from "../Util/Modal";
import { FaSearch } from "react-icons/fa";

export const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("관광지");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toggleOptions = (event) => {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
    setShowOptions((prev) => !prev); // 상태 반전
  };
  const handleSearch = () => {
    if (searchQuery.length < 2) {
      alert("검색어는 2자리 이상 입력해 주세요.");
    } else {
      const params = new URLSearchParams();

      if (searchQuery) {
        params.set("search", searchQuery);
      }
      const destination =
        selectedOption === "관광지" ? "/tourlist" : "/planninglist";
      navigate(`${destination}?${params.toString()}`);
      setSearchQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Enter 키가 눌렸을 때
      handleSearch(); // 검색 함수 호출
    }
  };
  const selectOption = (option) => {
    setSelectedOption(option); // 선택된 옵션 표시
    setShowOptions(false); // 옵션 창 닫기
  };
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
      <div className="search-container">
        <button className="search-toggle" onClick={toggleOptions}>
          {showOptions ? "▲" : "▼"} {/* showOptions 상태에 따라 기호 변경 */}
        </button>
        <div className="search-wrapper">
          <span className="selected-option">{selectedOption}</span>
          <span className="divider">|</span>
          <input
            type="text"
            className="search"
            placeholder="제목 검색!"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // 검색어 업데이트
            onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch /> {/* 검색 아이콘 */}
          </button>
        </div>
        <div
          ref={optionsRef}
          className={`search-options ${showOptions ? "active" : ""}`}
          style={{ pointerEvents: showOptions ? "auto" : "none" }}
        >
          <div className="options-list">
            <p onClick={() => selectOption("관광지")}>관광지</p>
            <p onClick={() => selectOption("플래닝")}>플래닝</p>
          </div>
        </div>
      </div>
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
