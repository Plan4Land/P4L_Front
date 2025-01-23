import {
  MainContainer,
  Info,
  Users,
  UserProfile,
  UserName,
  ContentContainer,
  MainPlanning,
  KakaoMapContainer,
  SearchInputContainer,
  DayToggleContainer,
} from "../../Style/PlanningStyled";
import { KakaoMap, SearchKakaoMap } from "../../Component/KakaoMapComponent";
import { useEffect, useRef, useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import { ProfileImg } from "../../Component/PictureCommponent";
import { Button } from "../../Component/ButtonComponent";
import { Modal, CloseModal, DraggableModal } from "../../Util/Modal";
import MemoIcon from "../../Img/memo-icon.png";

const plannerInfo = {
  title: "떠나요~ 두리서~",
  thumbnail:
    "https://contentful.harrypotter.com/usf1vwtuqyxm/4dZqNX3cU4Vb65CHOUW5VH/1f754fdad963b35da285798b84b7b30b/HP-F2-chamber-of-secrets-chamber-door-snakes-harry-web-landscape?q=75&fm=webp&w=370&h=210&fit=fill",
  area: "전라남도",
  subArea: "보성군",
  themes: "가족,힐링,인생샷",
  startDate: "Fri Jan 10 2025 00:00:00 GMT+0900 (한국 표준시)",
  endDate: "Wed Jan 15 2025 00:00:00 GMT+0900 (한국 표준시)",
  owner: {
    id: "owner123",
    nickname: "위즐리",
    profileImg:
      "https://contentful.harrypotter.com/usf1vwtuqyxm/4l9s1Qk6QamXxv1nTQKRQ0/721b11680a7df8bd9a22c7c232fa8283/HP-F5-order-of-the-phoenix-ginny-fred-george-ron-posing-web-landscape?q=75&fm=webp&w=500",
  },
  participants: [
    {
      id: "participant1",
      nickname: "해그리드",
      profileImg:
        "https://contentful.harrypotter.com/usf1vwtuqyxm/6MYGoPvMPUJz2biUkBUyxJ/72829bf3386bb2e0046036c565d54813/hp-f1-philosophers-stone-hagrid-fang-outside-hagrids-hut-playing-flute-web-landscape.jpg?q=75&fm=webp&w=500",
    },
    {
      id: "participant2",
      nickname: "드래곤",
      profileImg:
        "https://contentful.harrypotter.com/usf1vwtuqyxm/3C3YOcwXaUFwUHSty4tarh/6ab72d65cba1452a4bd3270b5be625ec/HP-F4-goblet-of-fire-dragon-first-task-triwizard-tournament-hungarian-horntail-web-landscape?q=75&fm=jpg&w=380&h=285&fit=fill&f=top",
    },
    {
      id: "participant3",
      nickname: "그자",
      profileImg:
        "https://contentful.harrypotter.com/usf1vwtuqyxm/ULm0YI9QFofCv7v2Toy8W/3be6b983fc5c8197fabea4770f1a76de/HP-F7-deathly-hallows-part-one-voldemort-sitting-staring-web-landscape.jpg?q=75&fm=webp&w=370&h=210&fit=fill",
    },
  ],
};
const plansEx = [
  {
    id: 1,
    seq: 1,
    date: "2025-01-10T10:00:00", // 계획일 (ISO 8601 형식)
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
    date: "2025-01-10T12:00:00",
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
    date: "2025-01-10T14:00:00",
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
    date: "2025-01-11T16:00:00",
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
    date: "2025-01-11T18:00:00",
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
    date: "2025-01-11T20:00:00",
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
  const [plans, setPlans] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isMemoClicked, setIsMemoClicked] = useState([]);
  const [isCurrentMemoOpened, setIsCurrentMemoOpened] = useState(false);
  const [updatedMemo, setUpdatedMemo] = useState("");
  const [currentAddedPlace, setCurrentAddedPlace] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [travelDays, setTravelDays] = useState("");
  const [travelDates, setTravelDates] = useState([]);
  const [arrowDirections, setArrowDirections] = useState([]);
  const [openDayToggle, setOpenDayToggle] = useState([]);
  const [groupPlans, setGroupPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});
  const memoRef = useRef(null);

  useEffect(() => {
    if (currentAddedPlace && Object.keys(currentAddedPlace).length > 0) {
      console.log(currentAddedPlace);
      setCurrentAddedPlace({});
    }
  }, [currentAddedPlace]);

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    setSubmittedKeyword(searchKeyword);
  };
  const handleDayClick = (index) => {
    setArrowDirections((prevDirections) => {
      const newDirections = [...prevDirections];
      newDirections[index] = newDirections[index] === "▼" ? "▲" : "▼"; // 화살표 방향을 토글
      return newDirections;
    });
    setOpenDayToggle((prevDayToggle) => {
      const newDayToggle = [...prevDayToggle];
      newDayToggle[index] = !newDayToggle[index]; // 해당 인덱스 열림/닫힘 토글
      return newDayToggle;
    });
  };

  // 클릭한 메모 열고 닫기
  const handleMemoClick = (date, planIndex, plan) => {
    setIsMemoClicked((prevMemo) => ({
      ...prevMemo,
      [date]: {
        ...prevMemo[date],
        [planIndex]: !prevMemo[date]?.[planIndex],
      },
    }));
    setUpdatedMemo(plan.memo + "\n" || "");
    setIsCurrentMemoOpened(!isCurrentMemoOpened);
  };
  const CloseMemo = () => {
    if (selectedPlan.date !== undefined) {
      setIsMemoClicked((prevMemo) => ({
        ...prevMemo,
        [selectedPlan.date]: {
          ...prevMemo[selectedPlan.date],
          [selectedPlan.planIndex]:
            !prevMemo[selectedPlan.date]?.[selectedPlan.planIndex],
        },
      }));
    }
    setIsCurrentMemoOpened(false);
    setSelectedPlan({});
  };
  const handleUpdateMemo = (date, planIndex, updatedMemo) => {
    setGroupPlans((prevPlans) => {
      const updatedPlans = { ...prevPlans }; // 기존 그룹화된 상태 복사

      // 해당 날짜에 대한 계획들을 업데이트
      updatedPlans[date] = updatedPlans[date].map((plan, index) =>
        index === planIndex ? { ...plan, memo: updatedMemo } : plan
      );

      return updatedPlans; // 변경된 상태 반환
    });
  };
  const insertText = (newText, date, planIndex) => {
    setUpdatedMemo(newText);
    handleUpdateMemo(date, planIndex, newText);
  };

  useEffect(() => {
    setPlans(plansEx);
  }, []);

  useEffect(() => {
    setSearchKeyword("");
    setSubmittedKeyword("");
  }, [isAddPlaceModalOpen]);

  useEffect(() => {
    setArrowDirections(Array(travelDays).fill("▼"));
    setOpenDayToggle(Array(travelDays).fill(false));
    setIsMemoClicked(Array(travelDays).fill(false));
    setIsCurrentMemoOpened(false);
  }, [travelDays]);

  useEffect(() => {
    const startDate = new Date(plannerInfo.startDate);
    const endDate = new Date(plannerInfo.endDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const diffInDays = timeDiff / (1000 * 3600 * 24);
    setTravelDays(diffInDays + 1);

    const generateTravelDates = (start, end) => {
      const dates = [];
      let currentDate = new Date(start);
      let lastDate = new Date(end);
      currentDate.setDate(currentDate.getDate() + 1);
      lastDate.setDate(lastDate.getDate() + 1);
      while (currentDate <= lastDate) {
        dates.push(new Date(currentDate).toISOString().split("T")[0]); // YYYY-MM-DD 포맷
        // dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1); // 하루씩 증가
      }
      return dates;
    };
    const dates = generateTravelDates(
      plannerInfo.startDate,
      plannerInfo.endDate
    );
    setTravelDates(dates);

    const groupPlansByDate = () => {
      // 1. 날짜별로 그룹화
      const groupedPlans = plans.reduce((acc, plan) => {
        const dateKey = plan.date.split("T")[0]; // "2025-01-10" 형태로 날짜만 추출
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(plan);
        return acc;
      }, {});

      // 2. 각 날짜 그룹 내에서 seq 순으로 정렬
      Object.keys(groupedPlans).forEach((date) => {
        groupedPlans[date].sort((a, b) => a.seq - b.seq);
      });
      return groupedPlans;
    };
    const groupedPlans = groupPlansByDate();
    setGroupPlans(groupedPlans);
  }, [plannerInfo.startDate, plannerInfo.endDate, plans]);

  return (
    <div>
      <Header />
      <MainContainer onClick={() => CloseMemo()}>
        <Info>
          {/* <img src={Thumbnail} alt="" /> */}
          <ProfileImg
            file={plannerInfo.thumbnail}
            width={"250px"}
            height={"250px"}
          />
          <div>
            <h1>{plannerInfo.title}</h1>
            <h3>
              {plannerInfo.area} {plannerInfo.subArea} / {plannerInfo.themes}
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
            <ProfileImg file={plannerInfo.owner.profileImg} />
          </UserProfile>
          <UserName>{plannerInfo.owner.nickname}</UserName>
          {plannerInfo.participants.map((participant, index) => (
            <UserProfile
              key={index}
              id={participant.id}
              nickname={participant.nickname}
              profileImg={participant.profileImg}
              onClick={() => setIsUserModalOpen(true)}
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
          <MainPlanning>
            {travelDates.map((date, index) => (
              <>
                <div
                  key={index}
                  className="planning-day"
                  onClick={() => handleDayClick(index)}
                >
                  <span>{index + 1}일차</span>&nbsp;&nbsp;/&nbsp;&nbsp;
                  <span>{date}</span>
                  <span className="arrow">{arrowDirections[index]}</span>
                </div>
                {openDayToggle[index] && (
                  <DayToggleContainer>
                    {groupPlans[date]?.map((plan, planIndex) => (
                      <>
                        <div key={planIndex} className="plan-place-container">
                          <div className="plan-place">
                            <p className="place-name">{plan.spotName}</p>
                            <p className="place-category">{plan.category}</p>
                          </div>
                          <div className="memo-container">
                            <img
                              className="memo-icon"
                              src={MemoIcon}
                              alt="메모"
                              style={{
                                cursor: isCurrentMemoOpened
                                  ? "default"
                                  : "pointer",
                              }}
                              onClick={(e) => {
                                if (isCurrentMemoOpened) {
                                  e.stopPropagation();
                                  return;
                                }
                                setSelectedPlan({
                                  date: date,
                                  planIndex: planIndex,
                                  plan: plan,
                                });
                                handleMemoClick(date, planIndex, plan);
                                e.stopPropagation();
                              }}
                            />
                            {isMemoClicked[date]?.[planIndex] && (
                              <div className="memo-input" ref={memoRef}>
                                <textarea
                                  id="memo"
                                  value={updatedMemo}
                                  onChange={(e) =>
                                    insertText(e.target.value, date, planIndex)
                                  }
                                  onClick={(e) => {
                                    if (isCurrentMemoOpened) {
                                      e.stopPropagation();
                                      return;
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ))}

                    <Button
                      className="add-place-button"
                      $margin={"1.5% 0"}
                      $width={"60%"}
                      $height={"30px"}
                      onClick={() => {
                        setIsAddPlaceModalOpen(true);
                        console.log(plans);
                      }}
                    >
                      + 장소 추가
                    </Button>
                  </DayToggleContainer>
                )}
              </>
            ))}
          </MainPlanning>
          <KakaoMapContainer>
            <KakaoMap />
          </KakaoMapContainer>
        </ContentContainer>
      </MainContainer>
      {isUserModalOpen && (
        <Modal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
          onConfirm={() => {
            setIsUserModalOpen(false);
          }}
        >
          <div>
            <h2>모달창입니댜</h2>
            <p>임시로 만들어논거에요</p>
          </div>
        </Modal>
      )}
      {isAddPlaceModalOpen && (
        <CloseModal
          isOpen={isAddPlaceModalOpen}
          onClose={() => setIsAddPlaceModalOpen(false)}
          contentWidth="400px"
          contentHeight="500px"
        >
          <SearchInputContainer>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
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
            searchKeyword={submittedKeyword}
            setIsAddPlaceModalOpen={setIsAddPlaceModalOpen}
            setCurrentAddedPlace={setCurrentAddedPlace}
          />
        </CloseModal>
      )}
      <Footer />
    </div>
  );
};
