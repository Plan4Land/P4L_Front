import {
  MainContainer,
  Info,
  Users,
  UserProfile,
  UserName,
  ContentContainer,
  MainPlanning,
  KakaoMapContainer,
} from "../../Style/PlanningStyled";
import { KakaoMap, SearchKakaoMap } from "../../Component/KakaoMapComponent";
import { useEffect, useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import { ProfileImg } from "../../Component/ProfileImg";
import { Button } from "../../Component/ButtonComponent";
import { Modal, CloseModal } from "../../Util/Modal";
import Thumbnail from "../../Img/planning_thumbnail.jpg";

export const Planning = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [currentAddedPlace, setCurrentAddedPlace] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [travelDays, setTravelDays] = useState("");
  const [arrowDirections, setArrowDirections] = useState([]);
  const [openDayToggle, setOpenDayToggle] = useState([]);

  useEffect(() => {
    if (currentAddedPlace && Object.keys(currentAddedPlace).length > 0) {
      setCurrentAddedPlace({}); // 초기화
    }
  }, [currentAddedPlace]);

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
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

  useEffect(() => {
    setSearchKeyword("");
  }, [isAddPlaceModalOpen]);

  useEffect(() => {
    setArrowDirections(Array(travelDays).fill("▼"));
    setOpenDayToggle(Array(travelDays).fill(false));
  }, [travelDays]);

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
        nickname: "Bob",
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
  const plans = [
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

  useEffect(() => {
    const startDate = new Date(plannerInfo.startDate);
    const endDate = new Date(plannerInfo.endDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const diffInDays = timeDiff / (1000 * 3600 * 24);
    setTravelDays(diffInDays + 1);
  }, [plannerInfo.startDate, plannerInfo.endDate]);

  return (
    <>
      <Header />
      <MainContainer>
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
            {[...Array(travelDays)].map((_, index) => (
              <>
                <div
                  key={index}
                  className="planning-day"
                  onClick={() => handleDayClick(index)}
                >
                  <span>{index + 1}일차</span>
                  <span className="arrow">{arrowDirections[index]}</span>
                </div>
                {openDayToggle[index] && (
                  <div className="day-toggle-container">
                    <div>이곳에 추가적인 내용을 입력하세요.</div>
                    <Button
                      className="add-place-button"
                      $margin={"1.5% 0"}
                      $width={"60%"}
                      $height={"30px"}
                      onClick={() => setIsAddPlaceModalOpen(true)}
                    >
                      + 장소 추가
                    </Button>
                  </div>
                )}
              </>
            ))}
          </MainPlanning>
          <KakaoMapContainer>
            <KakaoMap />
          </KakaoMapContainer>
        </ContentContainer>
      </MainContainer>
      {/* <MemoContainer>
        여기는 메모
        <KakaoEx></KakaoEx>
      </MemoContainer> */}
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
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={handleInputChange}
            style={{
              width: "90%",
              height: "25px",
              fontSize: "14px",
              margin: "25px auto 10px",
              padding: "3px",
            }}
          />
          <SearchKakaoMap
            searchKeyword={searchKeyword}
            setIsAddPlaceModalOpen={setIsAddPlaceModalOpen}
            setCurrentAddedPlace={setCurrentAddedPlace}
          />
        </CloseModal>
      )}
      <Footer />
    </>
  );
};
