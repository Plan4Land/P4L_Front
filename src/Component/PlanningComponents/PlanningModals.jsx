import { useAuth } from "../../Context/AuthContext";
import {
  UserProfile,
  ParticipantsContainer,
  SearchedUserContainer,
  SearchedUserHr,
  SearchSelectMenuContainer,
  SearchMemberContainer,
  SearchInputContainer,
  SearchBookmarkContainer,
} from "../../Style/PlanningStyled";
import { CloseModal, Modal } from "../../Util/Modal";
import { Button } from "../ButtonComponent";
import { colors } from "../../Style/GlobalStyle";
import { SearchKakaoMap } from "../KakaoMapComponent";
import { SearchTourItem } from "../ItemListComponent";
import { ProfileImg } from "../PictureCommponent";
import PlanningApi from "../../Api/PlanningApi";
import { BookmarkedSpotsApi } from "../../Api/ItemApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

// 플래닝에 초대 수락한 회원들 모달창
export const UserModal = ({
  plannerInfo,
  setPlannerInfo,
  modals,
  setModals,
  plannerId,
  isParticipant,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDeleteParticipants = async (memberId, plannerId) => {
    await PlanningApi.rejectInvitation(memberId, plannerId);
    const updatedParticipants = plannerInfo.participants.filter(
      (participant) => participant.id !== memberId
    );

    setPlannerInfo((prevState) => ({
      ...prevState,
      participants: updatedParticipants,
    }));
  };

  return (
    <CloseModal
      isOpen={modals.userModal}
      onClose={() =>
        setModals((prevModals) => ({ ...prevModals, userModal: false }))
      }
      contentWidth="300px"
      contentHeight="400px"
    >
      <ParticipantsContainer>
        {plannerInfo.participants
          .filter((participant) => participant.state === "ACCEPT")
          .map((participant, index) => (
            <div
              className="participants-profile"
              key={index}
              id={participant.id}
              // nickname={participant.nickname}
              // profileImg={`/${participant.memberProfileImg}`}
              // onClick={() => navigate(`/otheruser/${participant.id}`)}
            >
              <div className="participantsInfo">
                <img
                  src={`${participant.memberProfileImg}`}
                  alt="Profile"
                  onClick={() => navigate(`/otheruser/${participant.id}`)}
                />
                <p onClick={() => navigate(`/otheruser/${participant.id}`)}>
                  {participant.memberNickname}
                </p>
              </div>
              {isParticipant &&
                plannerInfo.ownerNickname === user?.nickname && (
                  <Button
                    className="deleteMember"
                    $width={"55px"}
                    $height={"30px"}
                    fontSize={"13px"}
                    padding={"7px 10px"}
                    onClick={() =>
                      handleDeleteParticipants(participant.id, plannerId)
                    }
                  >
                    삭제
                  </Button>
                )}
            </div>
          ))}
      </ParticipantsContainer>
    </CloseModal>
  );
};

// 장소추가버튼으로 장소 검색하는 모달창
export const AddPlaceModal = ({
  modals,
  setModals,
  searchState,
  setSearchState,
  setCurrentAddedPlace,
  // setPlans,
}) => {
  const { user } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("장소 검색");
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState([]);

  const handleKeywordInputChange = (e) =>
    setSearchState({ ...searchState, keyword: e.target.value });

  const handleKeywordSearch = () =>
    setSearchState({ ...searchState, submittedKeyword: searchState.keyword });

  useEffect(() => {
    setSearchState({
      ...searchState,
      keyword: "",
      submittedKeyword: "",
    });

    if (selectedMenu === "북마크 관광지") {
      const getBookmaredTourList = async () => {
        const response = await BookmarkedSpotsApi.getBookmarkedSpots(
          user.id,
          0,
          100
        );
        setBookmarkedPlaces((prevPlaces) => [
          ...prevPlaces,
          ...response.content, // response가 배열일 경우
        ]);
        console.log(response.content);
      };

      getBookmaredTourList();
    } else {
      setBookmarkedPlaces([]);
    }
  }, [selectedMenu]);
  return (
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
      mediaWidth768="300px"
      mediaHeight768="400px"
    >
      <SearchSelectMenuContainer>
        <span
          className={`menu-item ${
            selectedMenu === "장소 검색" ? "selected-menu" : ""
          }`}
          onClick={() => setSelectedMenu("장소 검색")}
        >
          장소 검색
        </span>
        <span className="bar">|</span>
        <span
          className={`menu-item ${
            selectedMenu === "북마크 관광지" ? "selected-menu" : ""
          }`}
          onClick={() => setSelectedMenu("북마크 관광지")}
        >
          북마크 관광지
        </span>
      </SearchSelectMenuContainer>
      <SearchInputContainer>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchState.keyword}
          onChange={handleKeywordInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleKeywordSearch();
            }
          }}
        />
        <FaSearch className="searchIcon" onClick={handleKeywordSearch} />
      </SearchInputContainer>
      {selectedMenu === "장소 검색" ? (
        <>
          <SearchKakaoMap
            searchKeyword={searchState.submittedKeyword}
            setModals={setModals}
            setCurrentAddedPlace={setCurrentAddedPlace}
            // setPlans={setPlans}
          />
        </>
      ) : (
        <div>
          <SearchBookmarkContainer>
            {bookmarkedPlaces.length > 0 ? (
              bookmarkedPlaces
                .filter(
                  (place) =>
                    place.title.includes(searchState.submittedKeyword) || // 이름으로 검색
                    place.addr1.includes(searchState.submittedKeyword) // 주소로 검색
                )
                .map((place, index) => (
                  <SearchTourItem
                    key={index}
                    data={place}
                    width={"98%"}
                    height={"70px"}
                    margin={"10px 0"}
                    setCurrentAddedPlace={setCurrentAddedPlace}
                    setModals={setModals}
                  />
                ))
            ) : (
              <p>북마크된 장소가 없습니다.</p> // 북마크된 장소가 없을 때 표시할 메시지
            )}
          </SearchBookmarkContainer>
        </div>
      )}
    </CloseModal>
  );
};

// 멤버 초대 모달창
export const SearchUser = ({
  modals,
  setModals,
  searchState,
  setSearchState,
  plannerId,
  fetchMember,
}) => {
  const { user } = useAuth();

  const handleUserKeywordInputChange = (e) =>
    setSearchState({
      ...searchState,
      userKeyword: e.target.value.replace(/^\s+/, ""),
    });

  const handleUserSearch = () => {
    setSearchState({
      ...searchState,
      submitUserKeyword: searchState.userKeyword,
    });
  };

  const handleInviteUser = async (memberId) => {
    await PlanningApi.inviteMember(memberId, plannerId);
    await fetchMember();
  };

  const handleCancelInvite = async (memberId) => {
    await PlanningApi.rejectInvitation(memberId, plannerId);
    await fetchMember();
  };

  return (
    <CloseModal
      isOpen={modals.searchUser}
      onClose={() =>
        setModals((prevModals) => ({
          ...prevModals,
          searchUser: false,
        }))
      }
      contentWidth="400px"
      contentHeight="500px"
      mediaWidth768="300px"
      mediaHeight768="400px"
      mediaWidth400="270px"
      mediaHeight400="350px"
    >
      <SearchMemberContainer>
        <SearchInputContainer>
          <input
            type="text"
            placeholder="아이디/닉네임 입력"
            value={searchState.userKeyword}
            onChange={handleUserKeywordInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleUserSearch();
              }
            }}
          />
          <FaSearch className="searchIcon" onClick={handleUserSearch} />
        </SearchInputContainer>
        <div className="searched-users-container">
          {searchState.searchUsersRst &&
          searchState.searchUsersRst.length > 0 ? (
            searchState.searchUsersRst
              .filter((member) => member.id !== user.id)
              .map((member) => (
                <div key={member.id}>
                  <SearchedUserContainer>
                    <ProfileImg
                      file={member.imgPath}
                      width={"50px"}
                      height={"50px"}
                    />
                    <div className="searched-user-info">
                      <p className="searched-nickname">{member.nickname}</p>
                      <p className="searched-id">{member.id}</p>
                    </div>
                    <Button
                      className="searched-user-invite"
                      $width={"90px"}
                      $height={"35px"}
                      fontSize={"13px"}
                      padding={"7px 10px"}
                      bgcolor={
                        member.state === "WAIT" ? "#FF6F61" : colors.colorC
                      }
                      color={"black"}
                      border={"none"}
                      onClick={() => {
                        if (member.state === "WAIT") {
                          handleCancelInvite(member.id); // 초대 취소 로직
                        } else {
                          handleInviteUser(member.id); // 초대 하기 로직
                        }
                      }}
                      disabled={member.state === "ACCEPT"}
                    >
                      {member.state === "WAIT"
                        ? "초대 취소"
                        : member.state === "ACCEPT"
                        ? "수락 완료"
                        : "초대 하기"}
                    </Button>
                  </SearchedUserContainer>
                  <SearchedUserHr />
                </div>
              ))
          ) : (
            <p>
              {searchState.searchUsersRst?.length === 0
                ? "검색된 회원이 없습니다."
                : ""}
            </p>
          )}
        </div>
      </SearchMemberContainer>
    </CloseModal>
  );
};

// 공개 or 비공개
export const SetPublicModal = ({
  modals,
  setModals,
  plannerInfo,
  setPlannerInfo,
  plannerId,
}) => {
  const handleIsPublicConfirm = async () => {
    const response = await PlanningApi.editIsPublic(
      plannerId,
      !plannerInfo.public
    );
    setPlannerInfo(response);
    setModals((prev) => ({ ...prev, public: false }));
  };

  return (
    <Modal
      isOpen={modals.public}
      onClose={() => setModals((prev) => ({ ...prev, public: false }))}
      onConfirm={() => handleIsPublicConfirm()}
    >
      <p>
        {plannerInfo.public === true ? "비공개" : "공개"}로 전환하시겠습니까?
      </p>
    </Modal>
  );
};

// 플래닝 삭제 or 나가기
export const DeletePlanning = ({
  modals,
  setModals,
  plannerInfo,
  plannerId,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDeleteConfirm = async () => {
    if (plannerInfo.ownerNickname === user.nickname) {
      await PlanningApi.deletePlanning(plannerId, user.id);
    } else {
      await PlanningApi.leavePlanning(plannerId, user.id);
    }

    setModals((prev) => ({ ...prev, deletePlanning: false }));
    navigate("/planninglist?pageSize=10");
  };

  return (
    <Modal
      isOpen={modals.deletePlanning}
      onClose={() => setModals((prev) => ({ ...prev, deletePlanning: false }))}
      onConfirm={() => {
        handleDeleteConfirm();
      }}
    >
      {plannerInfo.ownerNickname === user.nickname ? (
        <p>플래닝을 삭제하시겠습니까?</p>
      ) : (
        <p>플래닝을 나가시겠습니까?</p>
      )}
    </Modal>
  );
};

// // 페이지 Unload 전 모달창
// export const BeforeUnload = ({
//   modals,
//   setModals,
//   acceptUnload,
//   setAcceptUnload,
// }) => {
//   const handleOnConfirm = () => {
//     if (acceptUnload) {
//       setAcceptUnload(); // 저장된 작업 실행
//     }
//     setModals((prev) => ({ ...prev, beforeUnload: false }));
//   };
//   const handleOnClose = () => {
//     setAcceptUnload(null);
//     setModals((prev) => ({ ...prev, beforeUnload: false }));
//   };
//   return (
//     <Modal
//       isOpen={modals.beforeUnload}
//       onClose={() => handleOnClose()}
//       onConfirm={() => handleOnConfirm()}
//     >
//       <p>변경사항이 저장되지 않을 수 있습니다. 괜찮으신가요?</p>
//     </Modal>
//   );
// };
