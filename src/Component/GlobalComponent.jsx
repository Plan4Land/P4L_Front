import { HeaderSt, NavSt, FooterSt } from "../Style/GlobalStyle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "../Util/Modal";
import { useAuth } from "../Context/AuthContext";
import AxiosApi from "../Api/AxiosApi";
// import { TopTourApi, TopPlanApi } from "../Api/ItemApi";
import { areas } from "../Util/Common";
import { MyPlannerApi, BookmarkedSpotsApi } from "../Api/ItemApi";

export const Header = () => {
  // const [topSpots, setTopSpots] = useState([]);
  // const [topPlans, setTopPlans] = useState([]);
  const [planners, setPlanners] = useState([]);
  const [bookmarkedSpots, setBookmarkedSpots] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const topPlanClick = (id) => {
    navigate(`/planning/${id}`);
  };
  const topTourClick = (id) => {
    navigate(`/tourItemInfo/${id}`);
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [plannersData, bookmarkedSpotsData] = await Promise.all([
  //         // TopTourApi.getTop5Travelspots(),
  //         // TopPlanApi.getTop3Plans(),
  //         MyPlannerApi.getPlannersByOwner(user.id),
  //         BookmarkedSpotsApi.getBookmarkedSpots(user.id),
  //       ]);
  //       console.log(plannersData);
  //       console.log(bookmarkedSpotsData);
  //       // setTopSpots(topSpotsData.slice(0, 3));
  //       // setTopPlans(topPlansData.slice(0, 3));
  //       setPlanners(plannersData);
  //       setBookmarkedSpots(bookmarkedSpotsData);
  //     } catch (error) {
  //       console.error("데이터 가져오기 실패: ", error);
  //     }
  //   };
  //   fetchData();
  // }, [user.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plannersData, bookmarkedSpotsData] = await Promise.all([
          MyPlannerApi.getPlannersByOwner(user.id, 0, 3),
          BookmarkedSpotsApi.getBookmarkedSpots(user.id, 0, 3),
        ]);

        console.log(plannersData);
        console.log(bookmarkedSpotsData);

        // 받은 데이터를 상태에 설정
        setPlanners(plannersData.content);
        setBookmarkedSpots(bookmarkedSpotsData.content);
      } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
      }
    };

    fetchData();
  }, [user.id]);

  return (
    <HeaderSt>
      <Link to="/" className="logo">
        <img src="/img/plan4land.png" />
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
          className={`tag ${
            isActive("/tourlist") || isActive("/tourItemInfo") ? "active" : ""
          }`}
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
      <div className="recomm">
        바로가기
        <div className="dropdown-list">
          <div className="topList">
            {/* 내 플래닝 */}
            <div className="topItem">
              <div className="title">
                <h3>내 플래닝</h3>
              </div>
              {planners.map((plan, index) => {
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
                    <span className="truncated-text">
                      {plan.theme
                        .split(",")
                        .map((theme) => `#${theme.trim()}`)
                        .join(" ")}
                    </span>
                  </p>
                );
              })}
              {/* 북마크 관광지 */}
              <div className="topItem">
                <div className="title">
                  <h3>내 북마크 관광지</h3>
                </div>
                {bookmarkedSpots.map((spot, index) => (
                  <p
                    key={`bookmarked-spot-${index}`}
                    onClick={() => topTourClick(spot.id)}
                  >
                    <strong className="truncated-text">{spot.title}</strong> -
                    <span className="truncated-text">{spot.addr1}</span>
                  </p>
                ))}
              </div>
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
                  backgroundImage: `url(${user.imgPath})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => {
                  window.location.href = "/mypage";
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
