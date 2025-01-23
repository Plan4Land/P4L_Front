import { HeaderSt, NavSt, FooterSt } from "../Style/GlobalStyle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "../Util/Modal";
import { useAuth } from "../Context/AuthContext";
import AxiosApi from "../Api/AxiosApi";
import { TopTourApi, TopPlanApi } from "../Api/ItemApi";
import { areas } from "../Util/Common";

export const Header = () => {
  const [topSpots, setTopSpots] = useState([]);
  const [topPlans, setTopPlans] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const topPlanClick = (id) => {
    navigate(`/planning/${id}`);
  };
  const topTourClick = (id) => {
    navigate(`/tourItemInfo/${id}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      const response = await AxiosApi.logout(user.id);
      if (response.status === 204) {
        logout();
        navigate("/login");
      } else {
        console.error("Logout failed: Invalid response data");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path, query = "") => {
    const pathnameMatches = location.pathname.startsWith(path);
    const queryMatches = query ? location.search.includes(query) : true;
    return pathnameMatches && queryMatches;
  };

  useEffect(() => {
    const fetchTopData = async () => {
      try {
        const topSpotsData = await TopTourApi.getTop5Travelspots();
        const topPlansData = await TopPlanApi.getTop3Plans();
        setTopSpots(topSpotsData.slice(0, 3));
        setTopPlans(topPlansData.slice(0, 3));
      } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
      }
    };

    fetchTopData();
  }, []);

  const transportClick = (route) => {
    // 교통 드롭다운 항목 클릭 시 이동
    if (route === 'ktxinquiry') navigate('/ktxinquiry');
    if (route === 'expressbus') navigate('/expressbus');
    if (route === 'intercitybus') navigate('/intercitybus');
  };

  const handleItemClick = (transportType) => {
    setDropdownVisible(false); // 클릭 시 드롭다운 숨기기
    transportClick(transportType); // 클릭된 항목에 해당하는 페이지로 이동
  };

  return (
    <HeaderSt>
      <Link to="/" className="logo">
        <img src="/img/plan4land.png" />
      </Link>
      <NavSt>
        <div className="recomm" onClick={toggleDropdown}>
          <Link className={`tag ${isActive("/ktxinquiry") ? "" : "active"}`}>
            교통
          </Link>
          {dropdownVisible && (
            <div className="dropdown-Trafficlist">
              <div className="topItem">
                <p onClick={() => handleItemClick("ktxinquiry")}>
                  KTX
                </p>
                <p onClick={() => handleItemClick("expressbus")}>
                  고속버스
                </p>
                <p onClick={() => handleItemClick("intercitybus")}>
                  시외버스
                </p>
              </div>
            </div>
          )}
        </div>
        <p>|</p>
        <div className="recomm">
          <Link
            to="/tourlist"
            className={`tag ${isActive("/tourlist") || isActive("/tourItemInfo") ? "active" : ""}`}
          >
            관광지
          </Link>
        </div>
        <p>|</p>
        <div className="recomm">
          <Link
            to="/planninglist"
            className={`tag ${isActive("/planninglist") ? "active" : ""}`}
          >
            플래닝
          </Link>
        </div>
      </NavSt>
      <div className="recomm">
        인기탭
        <div className="dropdown-list">
          <div className="topList">
            <div className="topItem">
              <h3>인기 관광지</h3>
              {topSpots.map((spot, index) => (
                <p key={`spot-${index}`} onClick={() => topTourClick(spot.id)}>
                  <strong className="truncated-text">{spot.title}</strong> -
                  <span className="truncated-text">{spot.addr1}</span>
                </p>
              ))}
            </div>
            <div className="topItem">
              <h3>인기 플래닝</h3>
              {topPlans.map((plan, index) => {
                const areaName =
                  areas.find((area) => area.code === plan.area)?.name ||
                  "알 수 없는 지역";
                const subAreaName =
                  areas
                    .find((area) => area.code === plan.area)
                    ?.subAreas.find((subArea) => subArea.code === plan.subArea)
                    ?.name || "알 수 없는 하위 지역";

                return (
                  <p
                    key={`plan-${index}`}
                    onClick={() => topPlanClick(plan.id)}
                  >
                    <strong className="truncated-text">{plan.title}</strong> -
                    <span className="truncated-text">
                      {areaName} {subAreaName}
                    </span>
                    <span>||</span>
                    <span className="truncated-text">{plan.theme}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={`profile-link ${user ? "logged-in" : "logged-out"}`}>
        {user ? (
          <>
            {user.imgPath && (
              <div
                className="profile-img"
                style={{
                  backgroundColor: "white",
                  backgroundImage: `url(/${user.imgPath})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
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
          </>
        ) : (
          <Link to="/login" className="login-btn">
            로그인
          </Link>
        )}
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        >
          <p style={{ color: "black" }}>로그아웃 하시겠습니까?</p>
        </Modal>
      </div>
    </HeaderSt>
  );
};

export const Footer = () => {
  return <FooterSt>footer 입니다.</FooterSt>;
};
