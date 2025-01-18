import {
  MainContainer,
  Info,
  Users,
  UserProfile,
  UserName,
  ContentContainer,
  KakaoMapContainer,
} from "../../Style/PlanningStyled";
import { KakaoMap } from "../../Component/KakaoMapComponent";
import {
  PlannerInfoEditComponent,
  PlansComponent,
} from "../../Component/PlanningComponents/PlansComponent";
import { ChatComponent } from "../../Component/PlanningComponents/ChatComponent";
import { useEffect, useRef, useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import { ProfileImg } from "../../Component/ProfileImg";
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

// const plannerInfo = {
//   title: "떠나요~ 두리서~",
//   thumbnail:
//     "https://contentful.harrypotter.com/usf1vwtuqyxm/4dZqNX3cU4Vb65CHOUW5VH/1f754fdad963b35da285798b84b7b30b/HP-F2-chamber-of-secrets-chamber-door-snakes-harry-web-landscape?q=75&fm=webp&w=370&h=210&fit=fill",
//   area: "전라남도",
//   subArea: "보성군",
//   themes: "가족,힐링,인생샷",
//   startDate: "Fri Jan 10 2025 00:00:00 GMT+0900 (한국 표준시)",
//   endDate: "Wed Jan 15 2025 00:00:00 GMT+0900 (한국 표준시)",
//   owner: {
//     id: "owner123",
//     nickname: "위즐리",
//     profileImg:
//       "https://contentful.harrypotter.com/usf1vwtuqyxm/4l9s1Qk6QamXxv1nTQKRQ0/721b11680a7df8bd9a22c7c232fa8283/HP-F5-order-of-the-phoenix-ginny-fred-george-ron-posing-web-landscape?q=75&fm=webp&w=500",
//   },
//   participants: [
//     {
//       id: "participant1",
//       nickname: "해그리드",
//       profileImg:
//         "https://contentful.harrypotter.com/usf1vwtuqyxm/6MYGoPvMPUJz2biUkBUyxJ/72829bf3386bb2e0046036c565d54813/hp-f1-philosophers-stone-hagrid-fang-outside-hagrids-hut-playing-flute-web-landscape.jpg?q=75&fm=webp&w=500",
//     },
//     {
//       id: "participant2",
//       nickname: "드래곤",
//       profileImg:
//         "https://contentful.harrypotter.com/usf1vwtuqyxm/3C3YOcwXaUFwUHSty4tarh/6ab72d65cba1452a4bd3270b5be625ec/HP-F4-goblet-of-fire-dragon-first-task-triwizard-tournament-hungarian-horntail-web-landscape?q=75&fm=jpg&w=380&h=285&fit=fill&f=top",
//     },
//     {
//       id: "participant3",
//       nickname: "그자",
//       profileImg:
//         "https://contentful.harrypotter.com/usf1vwtuqyxm/ULm0YI9QFofCv7v2Toy8W/3be6b983fc5c8197fabea4770f1a76de/HP-F7-deathly-hallows-part-one-voldemort-sitting-staring-web-landscape.jpg?q=75&fm=webp&w=370&h=210&fit=fill",
//     },
//   ],
// };
const plansEx = [
  {
    id: 1,
    seq: 1,
    date: "2025-01-21T10:00:00", // 계획일 (ISO 8601 형식)
    spotName: "Namsan Tower",
    category: "관광명소",
    memo: "서울의 멋진 야경을 볼 수 있는 곳",
    latitude: "37.551229",
    longitude: "126.988205",
    planner: {
      id: 101,
      name: "John's Planner",
    },
  },
  {
    id: 2,
    seq: 2,
    date: "2025-01-21T12:00:00",
    spotName: "Gwangjang Market",
    category: "음식점",
    memo: "한국 전통 시장 탐방",
    latitude: "37.570379",
    longitude: "126.999017",
    planner: {
      id: 101,
      name: "John's Planner",
    },
  },
  {
    id: 3,
    seq: 3,
    date: "2025-01-21T14:00:00",
    spotName: "Bukchon Hanok Village",
    category: "문화체험",
    memo: "전통 한옥 체험",
    latitude: "37.582606",
    longitude: "126.986294",
    planner: {
      id: 101,
      name: "John's Planner",
    },
  },
  {
    id: 4,
    seq: 1,
    date: "2025-01-22T16:00:00",
    spotName: "Lotte World Tower",
    category: "쇼핑",
    memo: "서울의 고층 빌딩에서 쇼핑과 전망 즐기기",
    latitude: "37.512038",
    longitude: "127.102785",
    planner: {
      id: 101,
      name: "John's Planner",
    },
  },
  {
    id: 5,
    seq: 2,
    date: "2025-01-22T18:00:00",
    spotName: "Dongdaemun Design Plaza",
    category: "문화예술",
    memo: "현대적인 디자인과 전시 관람",
    latitude: "37.566295",
    longitude: "127.009669",
    planner: {
      id: 101,
      name: "John's Planner",
    },
  },
  {
    id: 6,
    seq: 3,
    date: "2025-01-22T20:00:00",
    spotName: "Han River Park",
    category: "야외활동",
    memo: "한강공원에서 자전거와 산책",
    latitude: "37.517236",
    longitude: "126.953104",
    planner: {
      id: 101,
      name: "John's Planner",
    },
  },
];

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
  const [plans, setPlans] = useState([]); ///////////////////////////////////////////
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
  const [isParticipant, setIsParticipant] = useState(false);

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
          plans: plans,
          isEditting: !isEditting,
        },
      };
    } else {
      // 편집 시작하면
      console.log("편집 시작", plannerInfo);
      setEditPlannerInfo(plannerInfo);
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
    if (ws.current) {
      ws.current.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        console.log("data ::::: ", data);
        if (
          data.type === "PLANNER" &&
          data.data?.plannerInfo?.[0] &&
          !_.isEqual(data.data.plannerInfo[0], editPlannerInfo)
        ) {
          setEditPlannerInfo(data.data.plannerInfo[0]);
          setReceivePlanner(data.data.plannerInfo[0]);
          setPlans(data.data.plans);
          setIsEditting(data.data.isEditting);
          setEditor(data.sender);
        } else if (data.type === "PLANNER") {
          setReceivePlanner(
            Array.isArray(data.data.plannerInfo) &&
              data.data.plannerInfo.length > 0
              ? data.data.plannerInfo[0]
              : data.data.plannerInfo
          );
          setPlans(data.data.plans);
          setIsEditting(data.data.isEditting);
          if (data.message === "편집완료") {
            setEditor(null);
            setEditPlannerInfo(null);
            setReceivePlanner(null);
          } else {
            setEditor(data.sender);
          }
        }
      };
    }
    console.log(editPlannerInfo);
  }, [socketConnected, editPlannerInfo]);

  // 웹 소켓 연결하기
  useEffect(() => {
    if (plannerInfo) {
      const participant =
        plannerInfo.ownerNickname === user.nickname ||
        plannerInfo.participants.some(
          (participant) =>
            participant.memberNickname === user.nickname &&
            participant.state === "ACCEPT"
        );

      setIsParticipant(participant);

      if (participant && !ws.current) {
        ws.current = new WebSocket("ws://localhost:8111/ws/planner");
        ws.current.onopen = () => {
          setSocketConnected(true);
          console.log("소켓 연결 완료");
        };
        ws.current.onmessage = (msg) => {
          const data = JSON.parse(msg.data);

          if (data.type === "PLANNER") {
            setIsEditting(data.data.isEditting);
            setEditor(data.sender);
          } else if (data.type === "ENTER") {
            console.log(`${data.sender} 님이 입장했습니다.`);
          }
        };
      }
    }

    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
        console.log("페이지 이동으로 인해 소켓 연결 종료");
      }
    };
  }, [plannerInfo, user.nickname]);

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
      console.log("입장 메시지 전송:", message);
    }
  }, [socketConnected, sender, plannerId]);

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const response = await PlanningApi.getPlanning(plannerId);
        setPlannerInfo(response); // 데이터를 상태에 저장
        setSelectedThemes(response.theme ? response.theme.split(",") : []);
        console.log("fetchPlanner : ", response);
      } catch (e) {
        console.log("플래너 불러오는 중 에러", e);
      }
    };
    const fetchIsBookmarked = async () => {
      try {
        const response = await PlanningApi.getIsBookmarked(user.id, plannerId);
        setIsBookmarked(response);
      } catch (e) {
        console.log("북마크 여부 조회 중 에러", e);
      }
    };
    const fetchChatMsg = async () => {
      try {
        const response = await PlanningApi.getChatMsgs(plannerId);
        setChatList(response);
        console.log("fetchChatMsg : ", response);
      } catch (e) {
        console.log("채팅 메시지 목록 불러오는 중 에러", e);
      }
    };
    fetchPlanner();
    fetchIsBookmarked();
    fetchChatMsg();
    setPlans(plansEx);
    setSender(user.nickname);
  }, [plannerId, user.id, user.nickname]);

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
    if (plannerInfo) {
      const areaName = areas.find(
        (area) => area.code === plannerInfo.area
      ).name;
      const subAreaName = areas
        .find((area) => area.code === plannerInfo.area)
        ?.subAreas.find((sub) => sub.code === plannerInfo.subArea)?.name;
      setAreaState({
        area: areaName || "",
        subArea: subAreaName || "",
      });
    }
  }, [plannerInfo]);

  useEffect(() => {
    if (
      currentAddedPlace.content &&
      Object.keys(currentAddedPlace.content).length > 0
    ) {
      setPlans((prevPlans) => [...prevPlans, currentAddedPlace]);
      console.log("이게 추가될 일정", currentAddedPlace);
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

  if (plannerInfo) {
    return (
      <div>
        <Header />
        <MainContainer onClick={() => closeMemo()}>
          <Info>
            {isEditting ? (
              editor === user.nickname ? (
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
                />
              ) : editPlannerInfo !== null ? (
                <>
                  <div className="planner-thumbnail">
                    <ProfileImg file={"/img/planning-pic/planningth1.jpg"} />
                  </div>
                  <div>
                    <h1>{editPlannerInfo.title}</h1>
                    <h3>
                      {areaState.area} {areaState.subArea} /{" "}
                      {editPlannerInfo.theme}
                    </h3>
                    <h3>
                      {new Date(editPlannerInfo.startDate).toLocaleDateString()}
                      &nbsp;&nbsp;~&nbsp;&nbsp;
                      {new Date(editPlannerInfo.endDate).toLocaleDateString()}
                    </h3>
                  </div>
                </>
              ) : (
                <>
                  <div className="planner-thumbnail">
                    <ProfileImg file={"/img/planning-pic/planningth1.jpg"} />
                  </div>
                  <div>
                    <h1>{plannerInfo.title}</h1>
                    <h3>
                      {areaState.area} {areaState.subArea} / {plannerInfo.theme}
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
                  <ProfileImg file={"/img/planning-pic/planningth1.jpg"} />
                </div>
                <div>
                  <h1>{plannerInfo.title}</h1>
                  <h3>
                    {areaState.area} {areaState.subArea} / {plannerInfo.theme}
                  </h3>
                  <h3>
                    {new Date(plannerInfo.startDate).toLocaleDateString()}
                    &nbsp;&nbsp;~&nbsp;&nbsp;
                    {new Date(plannerInfo.endDate).toLocaleDateString()}
                  </h3>
                </div>
              </>
            )}

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
            {isChatOpen && (
              <ChatComponent
                inputMsg={inputMsg}
                setInputMsg={setInputMsg}
                ws={ws}
                plannerId={plannerId}
                sender={sender}
                socketConnected={socketConnected}
                setSocketConnected={setSocketConnected}
                chatList={chatList}
                setChatList={setChatList}
              />
            )}
          </Info>

          <Users>
            <UserProfile
              onClick={() => navigate(`/otheruser/${plannerInfo.ownerId}`)}
            >
              <ProfileImg file={plannerInfo.ownerProfileImg} />
            </UserProfile>
            <UserName>{plannerInfo.ownerNickname}</UserName>
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
                        src={`/${participant.memberProfileImg}`}
                        alt={`/${participant.memberProfileImg}`}
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
            {isParticipant && (
              <>
                {isEditting && editor === user.nickname ? (
                  // 수정 완료 버튼
                  <Button
                    className="edit-button"
                    onClick={() => handleOnClickEdit()}
                  >
                    수정 완료
                  </Button>
                ) : isEditting && editor !== user.nickname ? (
                  // 다른 사용자가 수정 중이라는 문구
                  <p className="editing-info">{editor} 님이 수정 중입니다.</p>
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
          </Users>
          <ContentContainer>
            <PlansComponent
              travelInfo={travelInfo}
              setTravelInfo={setTravelInfo}
              groupPlans={groupPlans}
              setGroupPlans={setGroupPlans}
              setSelectedPlan={setSelectedPlan}
              setCurrentAddedPlace={setCurrentAddedPlace}
              memoState={memoState}
              setMemoState={setMemoState}
              plansEx={plansEx}
              plans={plans}
              plannerInfo={plannerInfo}
              setModals={setModals}
              isEditting={isEditting}
              setEditor={setEditor}
              editor={editor}
            />
            <KakaoMapContainer>
              <KakaoMap />
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
            setPlans={setPlans}
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
          />
        )}
        {modals.deletePlanning && (
          <DeletePlanning
            modals={modals}
            setModals={setModals}
            plannerInfo={plannerInfo}
          />
        )}
        <Footer />
      </div>
    );
  }
};
