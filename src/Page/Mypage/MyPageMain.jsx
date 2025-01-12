import { Header, Footer } from "../../Component/GlobalComponent";
import { UserMenu } from "../../Component/UserComponent";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MyPageMainContainer,
  UserMain,
  UserInfo,
  UserPlanning,
  FollowList,
} from "../../Style/MyPageMainStyled";
import UserInfoValidate from "./UserInfoValidate";
import MyPlanningList from "./MyPlanningList";
import { CheckModal } from "../../Util/Modal";

export const MyPageMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("followings");
  const [followings, setFollowings] = useState(["사용자1", "사용자2"]);
  const [followers, setFollowers] = useState(["사용자4", "사용자5"]);

  const handleUserDetailClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // URL에서 menu 값을 가져옴
  const menuFromUrl = queryParams.get("menu");
  const [selectedMenu, setSelectedMenu] = useState(menuFromUrl || "");

  useEffect(() => {
    setSelectedMenu(menuFromUrl || "");
  }, [menuFromUrl]);

  useEffect(() => {
    if (selectedMenu) {
      navigate(`?menu=${selectedMenu}`, { replace: true });
    } else {
      navigate("/mypage", { replace: true });
    }
  }, [selectedMenu, navigate]);

  return (
    <>
      <Header />
      <MyPageMainContainer>
        <div className="menu">
          <UserMenu
            setSelectedMenu={setSelectedMenu}
            selectedMenu={selectedMenu}
          />
        </div>
        <div className="MyPageMenu">
          {!selectedMenu && (
            <UserMain>
            <UserInfo>
              <div className="ProfileImg"></div>
              <div className="UserExplain">
                <p>닉네임: 어쩌구</p>
                <p>아이디: 뭐뭐</p>
                <div className="follow"  onClick={handleUserDetailClick}>
                  <span className="label">팔로잉:</span>
                  <span className="value">150</span>
                  <span className="label">팔로워:</span>
                  <span className="value">200</span>
                </div>
              </div>
            </UserInfo>
            <UserPlanning>
<p>여기에 플래닝 리스트?</p>
            </UserPlanning>
            </UserMain>
          )}
          
          
          {selectedMenu === "내 플래닝" && <MyPlanningList />}
          {selectedMenu === "좋아요 관광지"}
          {selectedMenu === "좋아요 플래닝"}
          {selectedMenu === "내 정보 수정" && <UserInfoValidate />}
        </div>
      </MyPageMainContainer>
      <CheckModal isOpen={isModalOpen} onClose={closeModal}>
            <FollowList>
              <div className="tabs">
                <button
                  onClick={() => handleTabClick("followings")}
                  className={selectedTab === "followings" ? "active" : ""}
                >
                  팔로잉
                </button>
                <button
                  onClick={() => handleTabClick("followers")}
                  className={selectedTab === "followers" ? "active" : ""}
                >
                  팔로워
                </button>
              </div>
              <div className="tab-content">
                {selectedTab === "followings" && (
                  <div className="list">
                    {followings.map((following, index) => (
                      <div key={index} className="list-item">
                        {following}
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === "followers" && (
                  <div className="list">
                    {followers.map((follower, index) => (
                      <div key={index} className="list-item">
                        {follower}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FollowList>
          </CheckModal>
      <Footer />
    </>
  );
};

export default MyPageMain;
