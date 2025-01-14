import { Header, Footer } from "../../Component/GlobalComponent";
import {
  UserMain,
  UserInfo,
  UserPlanning,
  FollowList,
} from "../../Style/MyPageMainStyled";
import { useState } from "react";
import { CheckModal } from "../../Util/Modal";
import { Button } from "../../Component/ButtonComponent";

export const Otheruser = () => {
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("followings");
  const [followings, setFollowings] = useState(["사용자1", "사용자2"]);
  const [followers, setFollowers] = useState(["사용자4", "사용자5"]);

  const openFollowModal = () => {
    setIsFollowModalOpen(true);
  };
  const closeFollowModal = () => {
    setIsFollowModalOpen(false);
  };
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <>
      <Header />
      <div className="otheruser">
        <UserMain>
          <UserInfo>
            <div className="user">
              <div
                className="ProfileImg"
                style={{
                  backgroundImage: `url($)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="UserExplain">
                <p>닉네임: {}</p>
                <p>아이디: {}</p>
                <div className="follow" onClick={openFollowModal}>
                  <p>팔로잉: 숫자 팔로워: 숫자</p>
                </div>
              </div>
            </div>
            <div className="Button">
              <Button>팔로우</Button>
            </div>
          </UserInfo>
          <UserPlanning>
            <p>여기에 플래닝 리스트</p>
          </UserPlanning>
        </UserMain>
      </div>
      <CheckModal isOpen={isFollowModalOpen} onClose={closeFollowModal}>
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
