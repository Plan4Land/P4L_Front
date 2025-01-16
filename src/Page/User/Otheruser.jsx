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

import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "react-responsive";

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

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const openFollowModal = () => {
    setIsFollowModalOpen(true);
  };
  const closeFollowModal = () => {
    setIsFollowModalOpen(false);
  };
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const fetchPlanners = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const currentPage = page;

      const data = await MyPlannerApi.getPlannersByOwner(
        userId,
        currentPage,
        size
      );

      // 모바일에서 이전 데이터와 새 데이터의 중복을 피하도록 처리
      if (isMobile) {
        setPlanners((prevPlanners) => {
          // 이미 로드된 데이터와 새 데이터가 중복되지 않도록 처리
          const newPlanners = data.content.filter(
            (newPlanner) =>
              !prevPlanners.some((planner) => planner.id === newPlanner.id)
          );
          return [...prevPlanners, ...newPlanners]; // 기존 데이터에 새 데이터만 추가
        });
      } else {
        // PC에서는 새로운 데이터로 덮어씌우기
        setPlanners(data.content);
      }

      setTotalPages(data.totalPages); // 전체 페이지 수 설정
      setLoading(false);
    } catch (error) {
      console.error("플래너 조회 오류:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isMobile) {
      // 모바일에서는 page가 변경될 때만 데이터를 추가
      fetchPlanners();
    }
  }, [page, isMobile]); // page가 변경될 때마다 실행

  useEffect(() => {
    if (!isMobile) {
      // PC에서는 page가 변경될 때마다 데이터를 새로 고침
      fetchPlanners();
    }
  }, [page, isMobile]);

  useEffect(() => {
    fetchPlanners();
  }, [userId]); // userId가 변경될 때마다 실행

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await AxiosApi.memberInfo(userId);
        setUserInfo(response.data);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 오류가 발생했습니다:", error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  const loadMorePlanners = () => {
    if (page + 1 < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
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
            {isMobile ? (
              <InfiniteScroll
                dataLength={planners.length}
                next={loadMorePlanners}
                hasMore={page + 1 < totalPages}
                loader={<p>로딩 중...</p>}
                endMessage={<p>모든 플래너를 불러왔습니다.</p>}
              >
                <div className="myPlanList">
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
                        thumbnail={
                          planner.thumbnail || "/default-thumbnail.png"
                        }
                        title={planner.title}
                        address={`${areaName} - ${subAreaName}`}
                        subCategory={planner.theme}
                        type={planner.public ? "공개" : "비공개"}
                      />
                    );
                  })}
                </div>
              </InfiniteScroll>
            ) : (
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
            )}
          </UserPlanning>
          {!isMobile && (
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
          )}
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
