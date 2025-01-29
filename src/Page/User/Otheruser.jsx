import { Footer, Header } from "../../Component/GlobalComponent";
import {
  OtherUserInfo,
  ReportContent,
  UserInfo,
  UserMain,
  UserPlanning,
} from "../../Style/MyPageMainStyled";
import { useEffect, useState } from "react";
import { CheckModal, Modal } from "../../Util/Modal";
import { Button } from "../../Component/ButtonComponent";
import { useNavigate, useParams } from "react-router-dom";
import { UserPlannerApi } from "../../Api/ItemApi";
import { areas } from "../../Util/Common";
import { PlanItem } from "../../Component/ItemListComponent";
import AxiosApi from "../../Api/AxiosApi";
import { Pagination } from "../../Component/Pagination";

import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "react-responsive";
import { useAuth } from "../../Context/AuthContext";
import FollowLoad from "../../Component/UserPageComponent/FollowLoad";
import ReportModal from "../../Component/UserPageComponent/ReportModalComponent";

export const Otheruser = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [planners, setPlanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("followings");
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false); // 신고 모달 상태
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // 신고 완료 모달 상태
  const [reportContent, setReportContent] = useState(""); // 신고 내용 저장
  const [isActivateUser, setIsActivateUser] = useState(true);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

  // 신고하기 모달을 닫고 완료 모달을 열기
  const handleReportConfirm = () => {
    if (!reportContent.trim()) {
      setIsCheckModalOpen(true); // 신고 내용이 비어있으면 CheckModal 열기
    } else {
      // 신고 내용이 있으면 신고 처리 로직 실행
      setShowReportModal(false); // 신고 모달 닫기
      fetchReports(); // 신고 내용 처리 (예: 서버에 전송)
      setShowConfirmationModal(true); // 신고 완료 모달 열기
    }
  };

  // 신고 내용이 비었을 때 CheckModal 닫기
  const handleCheckModalClose = () => {
    setIsCheckModalOpen(false); // CheckModal 닫기
  };

  // 신고 완료 모달을 닫기
  const handleConfirmationClose = () => {
    setShowConfirmationModal(false);
  };
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const openFollowModal = () => {
    setIsFollowModalOpen(true);
  };
  const closeFollowModal = () => {
    setIsFollowModalOpen(false);
  };
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const openReportModal = () => {
    setIsReportModalOpen(true);
  };
  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleFollow = async (follower, followed, isFollow) => {
    const data = await AxiosApi.follow(follower, followed, isFollow);
    setIsFollowed(!isFollowed);
  };

  const fetchReports = async () => {
    try {
      return await AxiosApi.report(user.id, userId, reportContent);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlanners = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const currentPage = page;

      const data = await UserPlannerApi.getuserPlannersByOwner(
        userId,
        currentPage,
        size
      );
      console.log(data.content);

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
    if (!isMobile) {
      // PC에서는 page가 변경될 때마다 데이터를 새로 고침
      fetchPlanners();
    } else {
      // 모바일에서는 page가 변경될 때만 데이터를 추가
      fetchPlanners();
    }
  }, [page, isMobile, userId]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await AxiosApi.memberInfo(userId);
        console.log(response.data);
        console.log(response.data.state);
        setUserInfo(response.data);
        setIsActivateUser(response.data.state === null);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 오류가 발생했습니다:", error);
      }
    };
    const fetchFollowInfo = async () => {
      try {
        const data = await AxiosApi.loadFollow(userId);
        setFollowings(data?.followingInfo || []);
        setFollowers(data?.followerInfo || []);
        if (data.followerInfo.some((member) => member.id === user?.id)) {
          setIsFollowed(true);
        }
      } catch (error) {
        console.error("팔로워 정보를 불러오는데 오류가 발생했습니다.", error);
      }
    };

    if (userId) {
      fetchUserInfo();
      fetchFollowInfo();
    }

    console.log(user?.id, " : ", userId);

    closeFollowModal();
  }, [isFollowed]);

  const loadMorePlanners = () => {
    if (page + 1 < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <UserMain>
        <OtherUserInfo>
          <UserInfo isInactive={!isActivateUser}>
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
                {isActivateUser ? (
                  <div className="follow" onClick={openFollowModal}>
                    <p>
                      팔로잉: {followings.length} 팔로워: {followers.length}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {user && user.id !== userId && isActivateUser && (
              <div className="Button">
                {isFollowed ? (
                  <Button
                    onClick={() => handleFollow(user?.id, userInfo.id, false)}
                  >
                    팔로우 해제
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleFollow(user?.id, userInfo.id, true)}
                  >
                    팔로우
                  </Button>
                )}
                <Button onClick={() => setShowReportModal(true)}>
                  신고하기
                </Button>
              </div>
            )}
            {isActivateUser ? (
              ""
            ) : (
              <p className="inactiveUser">비활성화된 계정입니다.</p>
            )}
          </UserInfo>
        </OtherUserInfo>
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
                    <div className="itemBox">
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
                        ownerprofile={planner.ownerProfileImg}
                        ownernick={planner.ownerNickname}
                      />
                    </div>
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
                  <div className="itemBox">
                    <PlanItem
                      key={planner.id}
                      id={planner.id}
                      thumbnail={planner.thumbnail || "/default-thumbnail.png"}
                      title={planner.title}
                      address={`${areaName} - ${subAreaName}`}
                      subCategory={planner.theme}
                      type={planner.public ? "공개" : "비공개"}
                      ownerprofile={`${planner.ownerProfileImg}`}
                      ownernick={planner.ownerNickname}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </UserPlanning>
        {!isMobile && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </UserMain>

      <CheckModal isOpen={isFollowModalOpen} onClose={closeFollowModal}>
        <FollowLoad
          followers={followers}
          followings={followings}
          isMyPage={false}
          loginUser={user?.id}
        ></FollowLoad>
      </CheckModal>

      <CheckModal isOpen={isReportModalOpen} onClose={closeReportModal}>
        <ReportModal reporter={user?.id} reported={userId}></ReportModal>
      </CheckModal>
      {/* 신고하기 모달 */}
      <Modal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onConfirm={handleReportConfirm}
        buttonProps={{ children: "확인" }}
      >
        <ReportContent>
          <h3>신고 내용을 입력해주세요</h3>
          <textarea
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="신고 내용을 입력 해 주세요.
            허위 신고의 경우 신고자에게 불이익이 생길 수 있습니다."
          />
        </ReportContent>
      </Modal>

      {/* CheckModal: 신고 내용이 비었을 때 띄움 */}
      <CheckModal isOpen={isCheckModalOpen} onClose={handleCheckModalClose}>
        <p>신고 사유를 작성 해 주세요.</p>
      </CheckModal>

      {/* 신고 완료 모달 */}
      <CheckModal
        isOpen={showConfirmationModal}
        onClose={handleConfirmationClose}
      >
        <p>신고가 완료되었습니다.</p>
      </CheckModal>
      {/* <Footer /> */}
    </>
  );
};
