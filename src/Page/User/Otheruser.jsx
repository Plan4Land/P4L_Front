import { Header, Footer } from "../../Component/GlobalComponent";
import {
  UserMain,
  UserInfo,
  UserPlanning,
  FollowList,
} from "../../Style/MyPageMainStyled";
import { useState, useEffect } from "react";
import { CheckModal } from "../../Util/Modal";
import { Button } from "../../Component/ButtonComponent";
import { useParams } from "react-router-dom";
import { MyPlannerApi } from "../../Api/ItemApi";
import { areas } from "../../Util/Common";
import { PlanItem } from "../../Component/ItemListComponent";
import AxiosApi from "../../Api/AxiosApi";

export const Otheruser = () => {
  const { userId } = useParams();
  const [planners, setPlanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
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

  const fetchPlanners = async (reset = false) => {
    try {
      if (loading) return;
      setLoading(true);
      const data = await MyPlannerApi.getPlannersByOwner(userId, page, size);
      setPlanners((prevPlanners) =>
        reset ? data.content : [...prevPlanners, ...data.content]
      );
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("플래너 조회 오류:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanners(true);
  }, [page]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await AxiosApi.memberInfo(userId);
        console.log(response);
        setUserInfo(response.data);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 오류가 발생했습니다:", error);
      }
    };

    if (userId) {
      fetchUserInfo(); // 유저 정보 호출
    }
  }, [userId]);

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
                  backgroundImage:
                    userInfo && userInfo.imgPath
                      ? `url(/${userInfo.imgPath})`
                      : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="UserExplain">
                {userInfo ? (
                  <>
                    <p>닉네임: {userInfo.nickname}</p>
                    <p>아이디: {userInfo.id}</p>
                  </>
                ) : (
                  <p>유저 정보를 불러오지 못했습니다.</p>
                )}
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
            <div className="myPlanList">
              {loading && <p>로딩 중...</p>}
              {planners.map((planner) => {
                const areaName =
                  areas.find((area) => area.code === planner.area)?.name ||
                  "알 수 없는 지역";
                const subAreaName =
                  areas
                    .find((area) => area.code === planner.area)
                    ?.subAreas.find(
                      (subArea) => subArea.code === planner.subArea
                    )?.name || "알 수 없는 하위 지역";
                return (
                  <PlanItem
                    key={planner.id}
                    id={planner.id}
                    thumbnail={planner.thumbnail || "/default-thumbnail.png"}
                    title={planner.title}
                    address={`${areaName} - ${subAreaName}`}
                    subCategory={planner.theme}
                    type={planner.public ? "공개" : "비공개"}
                  />
                );
              })}
            </div>
          </UserPlanning>
          <div className="pagebutton">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              이전
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page + 1 >= totalPages}
            >
              다음
            </button>
          </div>
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
