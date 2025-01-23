import {
  MainContainer,
  Info,
  Users,
  PlannerOwner,
  UserProfile,
  UserName,
  ContentContainer,
  KakaoMapContainer,
  ChatContainer,
  ChatMsgContainer,
  Message,
} from "../../Style/PlanningStyled";
import { HiArrowCircleUp } from "react-icons/hi";
import { FaTimes, FaBars } from "react-icons/fa";
import { KakaoMap } from "../../Component/KakaoMapComponent";
import {
  PlannerInfoEditComponent,
  PlansComponent,
} from "../../Component/PlanningComponents/PlansComponent";
import { useEffect, useRef, useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import { ProfileImg } from "../../Component/PictureCommponent";
import { Loading } from "../../Component/LoadingComponent";
import { Button } from "../../Component/ButtonComponent";
import PlanningApi from "../../Api/PlanningApi";
import AxiosApi from "../../Api/AxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import { areas, themes } from "../../Util/Common";
import { useAuth } from "../../Context/AuthContext";
import { MenuIcons } from "../../Component/PlanningComponents/PlanningMenuIcons";
import {
  UserModal,
  AddPlaceModal,
  SearchUser,
  SetPublicModal,
  DeletePlanning,
} from "../../Component/PlanningComponents/PlanningModals";
import _ from "lodash";

export const Planning = () => {
  const navigate = useNavigate();
  const { plannerId } = useParams();
  const { user } = useAuth();
  const [plannerInfo, setPlannerInfo] = useState(null);
  const [editPlannerInfo, setEditPlannerInfo] = useState(null);
  const [receivePlanner, setReceivePlanner] = useState(null);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [areaState, setAreaState] = useState({
    area: "",
    subArea: "",
  });
  const [plans, setPlans] = useState([]);
  const [editPlans, setEditPlans] = useState(null); ///////////////////////////////////////////
  const [modals, setModals] = useState({
    userModal: false, // 초대된 users 모달 open 여부
    addPlaceModal: false, // 장소 추가 모달 open 여부
    public: false,
    deletePlanning: false,
    searchUser: false, // 멤버 초대 모달 open 여부
  });
  const [memoState, setMemoState] = useState({
    ///////////////////////////////////////////////
    isClicked: [], // 메모마다 open 여부
    isOpened: false, // 현재 열린 메모가 있는지 여부
    updatedMemo: "", // 작성한 메모 내용
  });
  const [currentAddedPlace, setCurrentAddedPlace] = useState({}); // 검색에서 선택된 장소 정보
  const [searchState, setSearchState] = useState({
    keyword: "", // 실시간 입력한 키워드
    submittedKeyword: "", // 검색에 보낼 키워드
    userKeyword: "", // 멤버 초대할때 멤버 검색 키워드
    submitUserKeyword: "", // 검색에 보낼 멤버 키워드
    searchUsersRst: [], // 검색한 멤버 정보
  });
  const [travelInfo, setTravelInfo] = useState({
    days: 0, // 여행 기간
    dates: [], // 여행 날짜들
    arrowDirections: [], // 토글 화살표 클릭 여부
    dayToggle: [], // 토글 열림 여부
    clickedDate: "",
  });
  const [groupPlans, setGroupPlans] = useState({}); // 계획 정렬    /////////////////////////////////////////////////////
  const [selectedPlan, setSelectedPlan] = useState({}); // date, planIndex, plan
  const [isEditting, setIsEditting] = useState(false); //////////////////////////////////////////////////////
  const [editor, setEditor] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(null);
  const [inputMsg, setInputMsg] = useState(""); // 입력 메시지
  const [chatList, setChatList] = useState([]); // 채팅 글 목록
  const [socketConnected, setSocketConnected] = useState(false); // 웹소켓 연결 여부
  const [sender, setSender] = useState(""); // 메시지를 보낸 사람
  const ws = useRef(null); // 웹소켓 객체 생성, 소켓 연결 정보를 유지해야 하지만, 렌더링과는 무관
  const ChatContainerRef = useRef(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlanMenuToggleOpen, setIsPlanMenuToggleOpen] = useState(false);

  const handleChatKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault(); // 기본 Enter 동작 막기
      if (inputMsg?.trim()) {
        handleChatButtonClick(); // 버튼 클릭 함수 호출
      }
    }

    if (event.key === "Enter" && event.shiftKey) {
    }
  };

  const handleChatButtonClick = (e) => {
    // 메시지 전송
    ws.current.send(
      JSON.stringify({
        type: "CHAT",
        plannerId: plannerId,
        sender: sender,
        message: inputMsg.replace(/\n/g, "<br>"),
      })
    );
    setInputMsg("");
    console.log("전송");
  };

  const closeChat = () => {
    setIsChatOpen(false); // "X" 버튼 클릭 시 채팅 창 닫기
  };
  const closeMemo = () => {
    if (selectedPlan.date !== undefined) {
      setMemoState((prevState) => ({
        ...prevState,
        isClicked: {
          ...prevState.isClicked,
          [selectedPlan.date]: {
            ...prevState.isClicked[selectedPlan.date],
            [selectedPlan.planIndex]:
              !prevState.isClicked[selectedPlan.date]?.[selectedPlan.planIndex],
          },
        },
        isOpened: false,
        updatedMemo: "",
      }));
    }
    setSelectedPlan({});
  };

  const handleOnClickEdit = () => {
    setIsEditting(!isEditting);
    let message;
    if (isEditting) {
      // 편집 완료하면
      console.log("수정 완료 버튼 누름");
      // setEditor("");
      // setEditPlannerInfo(null);
      // setPlannerInfo(editPlannerInfo);
      message = {
        type: "PLANNER",
        plannerId: plannerId,
        sender: sender,
        message: "편집완료",
        data: {
          plannerInfo: editPlannerInfo,
          plans: editPlans,
          isEditting: !isEditting,
        },
      };
    } else {
      // 편집 시작하면
      console.log("편집 시작", plannerInfo);
      console.log(selectedThemes);
      setEditPlannerInfo(plannerInfo);
      setEditPlans(plans);
      message = {
        type: "PLANNER",
        plannerId: plannerId,
        sender: sender,
        message: "편집시작",
        data: {
          plannerInfo: plannerInfo,
          plans: plans,
          isEditting: !isEditting,
        },
      };
    }

    // 웹소켓 메시지 전송
    if (ws.current) {
      ws.current.send(JSON.stringify(message));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (ws.current) {
        ws.current.onmessage = async (msg) => {
          const data = JSON.parse(msg.data);
          console.log("data ::::: ", data);

          if (
            data.type === "PLANNER" &&
            data.data?.plannerInfo?.[0] &&
            !_.isEqual(data.data.plannerInfo[0], editPlannerInfo)
          ) {
            console.log("plannerInfo 바뀐거 있음");
            setEditPlannerInfo(data.data.plannerInfo[0]);
            setReceivePlanner(data.data.plannerInfo[0]);
            // setPlans(data.data.plans);
            setIsEditting(data.data.isEditting);
            setEditor(data.sender);
          } else if (
            data.type === "PLANNER" &&
            data.data?.plannerInfo?.[0] &&
            data.data?.plans !== null &&
            !_.isEqual(data.data.plans, editPlans)
          ) {
            console.log("plans 바뀐거 있음");
            setEditPlans(data.data.plans);
            setIsEditting(data.data.isEditting);
            setEditor(data.sender);
          } else if (data.type === "PLANNER") {
            console.log("바뀐거 없음");
            setReceivePlanner(
              Array.isArray(data.data.plannerInfo) &&
                data.data.plannerInfo.length > 0
                ? data.data.plannerInfo[0]
                : data.data.plannerInfo
            );
            setPlans(data.data.plans);
            setIsEditting(data.data.isEditting);

            if (data.message === "편집완료") {
              setPlannerInfo(editPlannerInfo);
              setEditor(null);
              setReceivePlanner(null);
              closeMemo();

              // 비동기 호출 처리
              if (editPlannerInfo && data.sender === user?.nickname) {
                const plannerResult = await PlanningApi.editPlannerInfo(
                  editPlannerInfo,
                  plannerId
                );
                const planResult = await PlanningApi.editPlan(
                  plannerId,
                  editPlans
                );
                setPlannerInfo(plannerResult.data);
                setPlans(planResult.data);
                setEditPlannerInfo(null);
                setEditPlans(null);
              }
              window.location.reload();
            } else {
              setEditor(data.sender);
            }
          }

          if (data.type === "CHAT") {
            setChatList((prev) => [...prev, data]);
          }

          if (editor && data.type === "CLOSE" && editor === data.sender) {
            console.log("editor : ", editor);
            // 수정하던 사람이 새로고침하면
            setPlannerInfo(plannerInfo);
            setEditPlannerInfo(null);
            setPlans(plans);
            setEditPlans(null);
            setEditor(null);
            closeMemo();
          } else {
            setPlannerInfo(plannerInfo);
            setPlans(plans);
          }
        };
      }
    };

    fetchData(); // async 함수 호출
  }, [socketConnected, editPlannerInfo, editPlans]);

  // 웹 소켓 연결하기
  useEffect(() => {
    if (plannerInfo) {
      const participant =
        plannerInfo.ownerNickname === user?.nickname ||
        plannerInfo.participants.some(
          (participant) =>
            participant.memberNickname === user?.nickname &&
            participant.state === "ACCEPT"
        );

      setIsParticipant(participant);

      if (participant && !ws.current) {
        ws.current = new WebSocket("ws://localhost:8111/ws/planner");
        ws.current.onopen = () => {
          setSocketConnected(true);
          console.log("소켓 연결 완료");
        };
      }
    }
    const closeMessage = {
      type: "CLOSE",
      plannerId: plannerId,
      sender: sender,
      message: editor,
      data: {
        plannerInfo: null,
        plans: null,
        isEditting: false,
      },
    };

    const handleBeforeUnload = () => {
      console.log("editor /////// ", editor);
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(closeMessage));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (ws.current) {
        ws.current.close();
        ws.current = null;
        console.log("페이지 이동으로 인해 소켓 연결 종료");
      }
    };
  }, [plannerInfo?.id, user?.nickname]);

  useEffect(() => {
    if (ChatContainerRef.current) {
      ChatContainerRef.current.scrollTop =
        ChatContainerRef.current.scrollHeight;
    }
  }, [chatList, isChatOpen]);

  useEffect(() => {
    // 소켓이 연결된 상태에서 메시지 전송
    if (socketConnected && sender) {
      const message = {
        type: "ENTER",
        plannerId: plannerId,
        sender: sender,
        message: "입장합니다.",
      };

      ws.current.send(JSON.stringify(message));
    }
  }, [socketConnected, sender, plannerId]);

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const response = await PlanningApi.getPlanning(plannerId);
        setPlannerInfo(response); // 데이터를 상태에 저장
        setSelectedThemes(
          response.theme
            ? response.theme.split(",").map((theme) => theme.trim())
            : []
        );
        console.log("fetchPlanner : ", response);
      } catch (e) {
        console.log("플래너 불러오는 중 에러", e);
      }
    };
    const fetchPlan = async () => {
      try {
        const response = await PlanningApi.getPlan(plannerId);
        setPlans(response);
        console.log("fetchPlan : ", response);
      } catch (e) {
        console.log("플랜 불러오는 중 에러", e);
      }
    };
    const fetchIsBookmarked = async () => {
      try {
        const response = await PlanningApi.getIsBookmarked(user?.id, plannerId);
        setIsBookmarked(response);
      } catch (e) {
        console.log("북마크 여부 조회 중 에러");
      }
    };
    const fetchChatMsg = async () => {
      try {
        const response = await PlanningApi.getChatMsgs(plannerId);
        const reversedResponse = [...response].reverse();
        setChatList(reversedResponse);
      } catch (e) {
        console.log("채팅 메시지 목록 불러오는 중 에러");
      }
    };
    fetchPlanner();
    fetchPlan();
    fetchIsBookmarked();
    fetchChatMsg();
    setSender(user?.nickname);
  }, [plannerId, user?.id, user?.nickname]);

  const fetchMember = async () => {
    try {
      const searchMemberRst = await AxiosApi.searchMember(
        searchState.submitUserKeyword,
        plannerId
      );
      setSearchState((prevState) => ({
        ...prevState,
        searchUsersRst: searchMemberRst,
      }));
    } catch (error) {
      console.error("멤버 검색 중 오류 발생: ", error);
    }
  };

  useEffect(() => {
    if (searchState.submitUserKeyword) {
      fetchMember();
    }
  }, [searchState.submitUserKeyword]);

  useEffect(() => {
    const planner = editPlannerInfo || plannerInfo;
    if (planner) {
      const areaName = areas.find((area) => area.code === planner.area)?.name;
      const subAreaName = areas
        .find((area) => area.code === planner.area)
        ?.subAreas.find((sub) => sub.code === planner.subArea)?.name;

      setAreaState({
        area: areaName || "",
        subArea: subAreaName || "",
      });
    }
  }, [plannerInfo, editPlannerInfo]);

  useEffect(() => {
    if (
      currentAddedPlace.content &&
      Object.keys(currentAddedPlace.content).length > 0
    ) {
      setEditPlans((prevPlans) => [...prevPlans, currentAddedPlace]);
      setCurrentAddedPlace({});
      setSelectedPlan({});
    }
  }, [currentAddedPlace]);

  useEffect(() => {
    setSearchState({ keyword: "", submittedKeyword: "" });
  }, [modals.addPlaceModal]);
  useEffect(() => {
    setSearchState({
      userKeyword: "",
      submitUserKeyword: "",
      searchUsersRst: [],
    });
  }, [modals.searchUser]);

  useEffect(() => {
    if (memoState.isOpened === false && isEditting) {
      setEditPlans(Object.values(groupPlans).flat());
    }
  }, [memoState]);

  if (plannerInfo) {
    return (
      <div>
        <Header />
        <MainContainer onClick={() => closeMemo()}>
          <MenuIcons
            plannerId={plannerId}
            plannerInfo={plannerInfo}
            isBookmarked={isBookmarked}
            setIsBookmarked={setIsBookmarked}
            isParticipant={isParticipant}
            setModals={setModals}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
            setPlans={setPlans}
            setIsEditting={setIsEditting}
          />
          <Info>
            <div
              className="info-background"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${
                  isEditting
                    ? editPlannerInfo?.thumbnail || plannerInfo?.thumbnail
                    : plannerInfo?.thumbnail
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "brightness(50%)  blur(3px)", // 배경 이미지 밝기 조정
                zIndex: 1,
              }}
            />
            <div className="planner-info-content">
              {isEditting ? (
                editor === user?.nickname ? (
                  <PlannerInfoEditComponent
                    ws={ws}
                    socketConnected={socketConnected}
                    plannerInfo={plannerInfo}
                    editPlannerInfo={editPlannerInfo}
                    setEditPlannerInfo={setEditPlannerInfo}
                    selectedThemes={selectedThemes}
                    setSelectedThemes={setSelectedThemes}
                    isEditting={isEditting}
                    plans={plans}
                    plannerId={plannerId}
                    sender={sender}
                    setIsLoading={setIsLoading}
                  />
                ) : editPlannerInfo !== null ? (
                  <>
                    <div className="planner-thumbnail">
                      <ProfileImg file={editPlannerInfo.thumbnail} />
                    </div>
                    <div>
                      <h1>{editPlannerInfo.title}</h1>
                      <h3>
                        <h3>{editPlannerInfo.theme}</h3>
                        {areaState.area} {areaState.subArea}
                        &nbsp;/&nbsp;&nbsp;
                        {editPlannerInfo.theme}
                      </h3>
                      <h3>
                        {new Date(
                          editPlannerInfo.startDate
                        ).toLocaleDateString()}
                        &nbsp;&nbsp;~&nbsp;&nbsp;
                        {new Date(editPlannerInfo.endDate).toLocaleDateString()}
                      </h3>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="planner-thumbnail">
                      <ProfileImg file={plannerInfo.thumbnail} />
                    </div>
                    <div>
                      <h1>{plannerInfo.title}</h1>
                      <h3>
                        {areaState.area} {areaState.subArea} &nbsp;/&nbsp;&nbsp;
                        {plannerInfo.theme}
                      </h3>
                      <h3>
                        {new Date(plannerInfo.startDate).toLocaleDateString()}
                        &nbsp;&nbsp;~&nbsp;&nbsp;
                        {new Date(plannerInfo.endDate).toLocaleDateString()}
                      </h3>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="planner-thumbnail">
                    <ProfileImg file={plannerInfo.thumbnail} />
                  </div>
                  <div>
                    <h1>{plannerInfo.title}</h1>
                    <h3>
                      {areaState.area} {areaState.subArea}
                    </h3>
                    <h3>
                      {plannerInfo.theme
                        .split(",")
                        .map((theme) => `#${theme.trim()}`)
                        .join(" ")}
                    </h3>
                    <h3>
                      {new Date(plannerInfo.startDate).toLocaleDateString()}
                      &nbsp;&nbsp;~&nbsp;&nbsp;
                      {new Date(plannerInfo.endDate).toLocaleDateString()}
                    </h3>
                  </div>
                </>
              )}

              {isChatOpen && (
                <ChatContainer>
                  <div className="chat-header">
                    <FaTimes className="close-chat" onClick={closeChat} />
                  </div>
                  <ChatMsgContainer
                    ref={ChatContainerRef}
                    className="chat-msg-container"
                  >
                    {chatList.map((chat, index) => (
                      <Message key={index} isSender={chat.sender === sender}>
                        <p className="id">{`${chat.sender}`}</p>
                        <p
                          className="talk"
                          dangerouslySetInnerHTML={{ __html: chat.message }}
                        />
                      </Message>
                    ))}
                  </ChatMsgContainer>

                  <div className="sendChat">
                    <textarea
                      id="chatTyping"
                      value={inputMsg ?? ""}
                      onChange={(e) => setInputMsg(e.target.value)}
                      onKeyDown={handleChatKeyDown}
                      style={{
                        height: `${Math.min(
                          90,
                          15 + inputMsg.split("\n").length * 15
                        )}px`,
                      }}
                    />
                    <button
                      onClick={handleChatButtonClick}
                      disabled={!inputMsg?.trim()}
                    >
                      <HiArrowCircleUp className="sendIcon" />
                    </button>
                  </div>
                </ChatContainer>
              )}
            </div>
            {!isEditting && (
              <PlannerOwner
                onClick={() => navigate(`/otheruser/${plannerInfo.ownerId}`)}
              >
                <UserProfile>
                  <ProfileImg file={`${plannerInfo.ownerProfileImg}`} />
                </UserProfile>
                <UserName>{plannerInfo.ownerNickname}</UserName>
              </PlannerOwner>
            )}
            {isParticipant && (
              <>
                {isEditting && editor === user?.nickname ? (
                  // 수정 완료 버튼
                  <Button
                    className="edit-button-complete"
                    onClick={() => handleOnClickEdit()}
                  >
                    편집 완료
                  </Button>
                ) : isEditting && editor && editor !== user?.nickname ? (
                  // 다른 사용자가 수정 중이라는 문구
                  <p className="editing-info">
                    <span>{editor}</span> 님이 수정 중입니다.
                  </p>
                ) : (
                  // 기본 편집 버튼
                  <Button
                    className="edit-button"
                    onClick={() => handleOnClickEdit()}
                  >
                    편집
                  </Button>
                )}
              </>
            )}
            <FaBars
              className="plans-toggle-icon"
              onClick={() => setIsPlanMenuToggleOpen(!isPlanMenuToggleOpen)}
            />
          </Info>
          <Users>
            {plannerInfo.participants &&
              plannerInfo.participants.map(
                (participant, index) =>
                  participant.state === "ACCEPT" && (
                    <UserProfile
                      key={index}
                      id={participant.id}
                      // nickname={participant.nickname}
                      // profileImg={participant.profileImg}
                      onClick={() =>
                        setModals((prevModals) => ({
                          ...prevModals,
                          userModal: true,
                        }))
                      }
                    >
                      <img
                        src={`${participant.memberProfileImg}`}
                        alt={`${participant.memberProfileImg}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </UserProfile>
                  )
              )}
          </Users>
          <ContentContainer>
            <PlansComponent
              isPlanMenuToggleOpen={isPlanMenuToggleOpen}
              socketConnected={socketConnected}
              ws={ws}
              plannerId={plannerId}
              sender={sender}
              travelInfo={travelInfo}
              setTravelInfo={setTravelInfo}
              groupPlans={groupPlans}
              setGroupPlans={setGroupPlans}
              setSelectedPlan={setSelectedPlan}
              setCurrentAddedPlace={setCurrentAddedPlace}
              memoState={memoState}
              setMemoState={setMemoState}
              plans={plans}
              editPlans={editPlans}
              setEditPlans={setEditPlans}
              plannerInfo={plannerInfo}
              editPlannerInfo={editPlannerInfo}
              setModals={setModals}
              isEditting={isEditting}
              setEditor={setEditor}
              editor={editor}
            />
            <KakaoMapContainer>
              <KakaoMap plans={groupPlans} date={travelInfo.clickedDate} />
            </KakaoMapContainer>
          </ContentContainer>
        </MainContainer>
        {modals.userModal && (
          <UserModal
            plannerInfo={plannerInfo}
            modals={modals}
            setModals={setModals}
          />
        )}
        {modals.addPlaceModal && (
          <AddPlaceModal
            modals={modals}
            setModals={setModals}
            searchState={searchState}
            setSearchState={setSearchState}
            setCurrentAddedPlace={setCurrentAddedPlace}
            // setPlans={setPlans}
          />
        )}
        {modals.searchUser && (
          <SearchUser
            modals={modals}
            setModals={setModals}
            searchState={searchState}
            setSearchState={setSearchState}
            plannerId={plannerId}
            fetchMember={fetchMember}
          />
        )}
        {modals.public && (
          <SetPublicModal
            modals={modals}
            setModals={setModals}
            plannerInfo={plannerInfo}
            setPlannerInfo={setPlannerInfo}
            plannerId={plannerId}
          />
        )}
        {modals.deletePlanning && (
          <DeletePlanning
            modals={modals}
            setModals={setModals}
            plannerInfo={plannerInfo}
            plannerId={plannerId}
          />
        )}
        {isLoading && (
          <Loading>
            <p>이미지 업로드 중입니다. 잠시만 기다려주세요...</p>
          </Loading>
        )}
        <Footer />
      </div>
    );
  } else {
    return (
      <>
        <Header />
        <Loading>
          <p>플래닝 정보를 불러오는 중입니다. 잠시만 기다려주세요...</p>
        </Loading>
        <Footer />
      </>
    );
  }
};
