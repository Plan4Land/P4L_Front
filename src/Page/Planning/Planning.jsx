import {
  MainContainer,
  Info,
  Users,
  UserProfile,
  UserName,
  ContentContainer,
  MainPlanning,
  KakaoMapContainer,
  ModalOverlay,
  ModalContainer,
} from "../../Style/PlanningStyled";
import { KakaoMap, KakaoEx } from "../../Component/KakaoMapComponent";
import { useEffect, useState } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import { ProfileImg } from "../../Component/ProfileImg";
import Thumbnail from "../../Img/planning_thumbnail.jpg";

export const Planning = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [travelDays, setTravelDays] = useState("");
  const [arrowDirections, setArrowDirections] = useState(
    Array(travelDays).fill("▼")
  );
  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const toggleArrow = (index) => {
    setArrowDirections((prevDirections) => {
      const newDirections = [...prevDirections];
      newDirections[index] = newDirections[index] === "▲" ? "▼" : "▲"; // 화살표 방향을 토글
      return newDirections;
    });
  };

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
              <div key={index} className="planning-day">
                <span>{index + 1}일차</span>
                <span className="arrow">▲▼</span>
              </div>
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
        <ModalOverlay>
          <ModalContainer>
            <h2>모달창입니댜</h2>
            <p>임시로 만들어논거에요</p>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={handleInputChange}
              style={{
                width: "300px",
                height: "40px",
                fontSize: "16px",
                marginBottom: "20px",
                padding: "5px",
              }}
            />
            <button onClick={() => setIsUserModalOpen(false)}>확인</button>
          </ModalContainer>
        </ModalOverlay>
      )}
      <Footer />
    </>
  );
};
