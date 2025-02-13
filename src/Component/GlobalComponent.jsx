import {
  HeaderSt,
  NavSt,
  FooterSt,
  GlobalFont,
  Main,
} from "../Style/GlobalStyle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Modal } from "../Util/Modal";
import { useAuth } from "../Context/AuthContext";
import AxiosApi from "../Api/AxiosApi";
// import { TopTourApi, TopPlanApi } from "../Api/ItemApi";
import { areas } from "../Util/Common";
import { MyPlannerApi, BookmarkedSpotsApi } from "../Api/ItemApi";
import Logo from "../Img/plan4landlogo.png"; //
import Title from "../../src/Img/plan4land_.png";
import { Outlet } from "react-router-dom";
import { MdSwitchAccessShortcutAdd } from "react-icons/md";

export const Header = () => {
  // const [topSpots, setTopSpots] = useState([]);
  // const [topPlans, setTopPlans] = useState([]);
  const [planners, setPlanners] = useState([]);
  const [bookmarkedSpots, setBookmarkedSpots] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef(null); // 드롭다운 영역을 참조

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // 드롭다운 닫기
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside); // 언마운트 시 이벤트 리스너 제거
    };
  }, []);

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
        setShowLogoutModal(false);
        // navigate("/login");
        setTimeout(() => {
          navigate("/login");
        }, 100);
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

        // console.log(plannersData);
        // console.log(bookmarkedSpotsData);

        // 받은 데이터를 상태에 설정
        setPlanners(plannersData.content);
        setBookmarkedSpots(bookmarkedSpotsData.content);
      } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
      }
    };

    fetchData();
  }, [user?.id]);

  // const transportClick = (route) => {
  //   // 교통 드롭다운 항목 클릭 시 이동
  //   if (route === "ktxinquiry") navigate("/ktxinquiry");
  //   if (route === "expressbus") navigate("/expressbus");
  //   if (route === "intercitybus") navigate("/intercitybus");
  // };

  // const handleItemClick = (transportType) => {
  //   setDropdownVisible(false); // 클릭 시 드롭다운 숨기기
  //   transportClick(transportType); // 클릭된 항목에 해당하는 페이지로 이동
  // };

  return (
    <HeaderSt>
      <GlobalFont />
      <Link to="/" className="logo">
        <div className="logoBox">
          <img src={Logo} alt="" className="logoImg" />
          <img src={Title} alt="" className="logoTitle" />
        </div>
      </Link>
      <NavSt>
        <div className="recomm" onClick={toggleDropdown} ref={dropdownRef}>
          <Link
            to="/traffic"
            className={`tag ${isActive("/traffic") ? "active" : ""}`}
          >
            <p className="title-font">교통</p>
          </Link>
          {/* {dropdownVisible && (
            <div className="dropdown-Trafficlist">
              <p onClick={() => handleItemClick("ktxinquiry")}>KTX</p>
              <p onClick={() => handleItemClick("expressbus")}>고속버스</p>
              <p onClick={() => handleItemClick("intercitybus")}>시외버스</p>
            </div>
          )} */}
        </div>
        <p>|</p>
        <div className="recomm">
          <Link
            to="/tourlist"
            className={`tag ${
              isActive("/tourlist") || isActive("/tourItemInfo") ? "active" : ""
            }`}
          >
            <p className="title-font">관광지</p>
          </Link>
        </div>
        <p>|</p>
        <div className="recomm">
          <Link
            to="/planninglist"
            className={`tag ${
              isActive("/planninglist") || isActive("/planning") ? "active" : ""
            }`}
          >
            <p className="title-font">플래닝</p>
          </Link>
        </div>
      </NavSt>
      <div className="usermenu">
        {user ? (
          <div className="recomm">
            <div className="quickmenu">
              <MdSwitchAccessShortcutAdd />
              <p className="content-font2">바로가기</p>
            </div>
            <div className="dropdown-list">
              <div className="topList">
                {/* 내 플래닝 */}
                <div className="topItem">
                  <div className="title">
                    <h3>내 플래닝</h3>
                  </div>
                  {planners.map((plan, index) => {
                    // const areaName =
                    //   areas.find((area) => area.code === plan.area)?.name ||
                    //   "알 수 없는 지역";
                    // const subAreaName =
                    //   areas
                    //     .find((area) => area.code === plan.area)
                    //     ?.subAreas.find(
                    //       (subArea) => subArea.code === plan.subArea
                    //     )?.name || "알 수 없는 하위 지역";

                    return (
                      <p
                        key={`plan-${index}`}
                        onClick={() => topPlanClick(plan.id)}
                      >
                        <strong className="truncated-text">{plan.title}</strong>{" "}
                        {/* -
                        <span className="truncated-text">
                          {areaName} {subAreaName}
                        </span>
                        <span>||</span>
                        <span className="truncated-text">
                          {plan.theme
                            .split(",")
                            .map((theme) => `#${theme.trim()}`)
                            .join(" ")}
                        </span> */}
                      </p>
                    );
                  })}
                </div>

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
                      <strong className="truncated-text">{spot.title}</strong>
                      {/* -
                      <span className="truncated-text">{spot.addr1}</span> */}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

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
                    navigate("/mypage");
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
            <p>로그아웃 하시겠습니까?</p>
          </Modal>
        </div>
      </div>
    </HeaderSt>
  );
};

export const Footer = () => {
  return (
    <FooterSt>
      <h4>Plan4Land</h4>
      <p>문의가 필요한 사항은 메일 부탁드립니다.</p>
      <p>mail: plan4land.mail@gmail.com</p>
    </FooterSt>
  );
};

export const Layout = () => {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
};
