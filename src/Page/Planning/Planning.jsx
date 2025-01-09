import {
  MainContainer,
  Info,
  Users,
  UserProfile,
  UserName,
  ContentContainer,
  KakaoMapContainer,
  SearchInputContainer,
} from "../../Style/PlanningStyled";
import { KakaoMap, SearchKakaoMap } from "../../Component/KakaoMapComponent";
import { PlansComponent } from "../../Component/PlanningComponents/PlansComponent";
import { useEffect, useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import { ProfileImg } from "../../Component/ProfileImg";
import { Button } from "../../Component/ButtonComponent";
import { Modal, CloseModal } from "../../Util/Modal";
import PlanningApi from "../../Api/PlanningApi";
import { useParams } from "react-router-dom";
import { areas } from "../../Util/Common";
import LikePlanning from "../../Img/likePlanning.png";
import UnlikePlanning from "../../Img/unlikePlanning.png";

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
  const { plannerId } = useParams();
  const [plannerInfo, setPlannerInfo] = useState();
  const [areaState, setAreaState] = useState({
    area: "",
    subArea: "",
  });
  const [plans, setPlans] = useState([]);
  const [modals, setModals] = useState({
    userModal: false, // 초대된 users 모달 open 여부
    addPlaceModal: false, // 장소 추가 모달 open 여부
  });
  const [memoState, setMemoState] = useState({
    isClicked: [], // 메모마다 open 여부
    isOpened: false, // 현재 열린 메모가 있는지 여부
    updatedMemo: "", // 작성한 메모 내용
  });
  const [currentAddedPlace, setCurrentAddedPlace] = useState({}); // 검색에서 선택된 장소 정보
  const [searchState, setSearchState] = useState({
    keyword: "", // 실시간 입력한 키워드
    submittedKeyword: "", // 검색에 보낼 키워드
  });
  const [travelInfo, setTravelInfo] = useState({
    days: 0, // 여행 기간
    dates: [], // 여행 날짜들
    arrowDirections: [], // 토글 화살표 클릭 여부
    dayToggle: [], // 토글 열림 여부
  });
  const [groupPlans, setGroupPlans] = useState({}); // 계획 정렬
  const [selectedPlan, setSelectedPlan] = useState({}); // date, planIndex, plan
  const [isEditting, setIsEditting] = useState(true);

  useEffect(() => {
    if (Object.keys(currentAddedPlace).length > 0) {
      console.log(currentAddedPlace);
      setCurrentAddedPlace({});
    }
  }, [currentAddedPlace]);

  const handleInputChange = (e) =>
    setSearchState({ ...searchState, keyword: e.target.value });
  const handleSearch = () =>
    setSearchState({ ...searchState, submittedKeyword: searchState.keyword });
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

  useEffect(() => {
    const fetchPlanner = async () => {
      try {
        const response = await PlanningApi.getPlanning(plannerId);
        setPlannerInfo(response); // 데이터를 상태에 저장
        console.log(response);
      } catch (e) {
        console.log("플래너 불러오는 중 에러", e);
      }
    };

    fetchPlanner();
    setPlans(plansEx);
  }, [plannerId]);

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

  useEffect(
    () => setSearchState({ keyword: "", submittedKeyword: "" }),
    [modals.addPlaceModal]
  );
  if (plannerInfo) {
    return (
      <div>
        <Header />
        <MainContainer onClick={() => closeMemo()}>
          <Info>
            <ProfileImg
              file={plannerInfo.thumbnail}
              width={"250px"}
              height={"250px"}
            ></ProfileImg>
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
          </Info>
          <Users>
            <UserProfile>
              <ProfileImg file={plannerInfo.ownerProfileImg} />
            </UserProfile>
            <UserName>{plannerInfo.ownerNickname}</UserName>
            {plannerInfo.participants &&
              plannerInfo.participants.map((participant, index) => (
                <UserProfile
                  key={index}
                  id={participant.id}
                  nickname={participant.nickname}
                  profileImg={participant.profileImg}
                  onClick={() =>
                    setModals((prevModals) => ({
                      ...prevModals,
                      userModal: true,
                    }))
                  }
                >
                  <img
                    src={participant.profileImg}
                    alt="프로필 이미지"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </UserProfile>
              ))}
          </Users>
          <ContentContainer>
            <PlansComponent
              travelInfo={travelInfo}
              setTravelInfo={setTravelInfo}
              groupPlans={groupPlans}
              setGroupPlans={setGroupPlans}
              setSelectedPlan={setSelectedPlan}
              memoState={memoState}
              setMemoState={setMemoState}
              plansEx={plansEx}
              plans={plans}
              plannerInfo={plannerInfo}
              setModals={setModals}
              isEditting={isEditting}
            />
            <KakaoMapContainer>
              <KakaoMap />
            </KakaoMapContainer>
          </ContentContainer>
        </MainContainer>
        {modals.userModal && (
          <Modal
            isOpen={modals.userModal}
            onClose={() =>
              setModals((prevModals) => ({ ...prevModals, userModal: false }))
            }
            onConfirm={() => {
              setModals((prevModals) => ({ ...prevModals, userModal: false }));
            }}
          >
            <div>
              <h2>모달창입니댜</h2>
              <p>임시로 만들어논거에요</p>
            </div>
          </Modal>
        )}
        {modals.addPlaceModal && (
          <CloseModal
            isOpen={modals.addPlaceModal}
            onClose={() =>
              setModals((prevModals) => ({
                ...prevModals,
                addPlaceModal: false,
              }))
            }
            contentWidth="400px"
            contentHeight="500px"
          >
            <SearchInputContainer>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchState.keyword}
                onChange={handleInputChange}
                style={{
                  width: "80%",
                  height: "25px",
                  fontSize: "14px",
                  padding: "3px",
                }}
              />
              <Button
                $width={"60px"}
                $height={"35px"}
                fontSize={"14px"}
                padding={"10px 15px"}
                onClick={handleSearch}
              >
                검색
              </Button>
            </SearchInputContainer>
            <SearchKakaoMap
              searchKeyword={searchState.submittedKeyword}
              setModals={setModals}
              setCurrentAddedPlace={setCurrentAddedPlace}
            />
          </CloseModal>
        )}
        <Footer />
      </div>
    );
  }
};
