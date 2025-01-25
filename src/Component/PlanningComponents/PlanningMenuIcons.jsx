import { AiOutlineMessage } from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { LuUserRoundPlus } from "react-icons/lu";
import { BiLock, BiLockOpen, BiTrash } from "react-icons/bi";
import PlanningApi from "../../Api/PlanningApi";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const MenuIcons = ({
  plannerId,
  plannerInfo,
  setPlannerInfo,
  isBookmarked,
  setIsBookmarked,
  isParticipant,
  setModals,
  isChatOpen,
  setIsChatOpen,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookmarked = async () => {
    console.log("북마크 상태 : ", isBookmarked);
    if (isBookmarked && user) {
      await PlanningApi.deleteBookmarked(user.id, plannerId);
      setPlannerInfo((prevInfo) => ({
        ...prevInfo,
        bookmarkCount: prevInfo.bookmarkCount - 1,
      }));
    } else if (user) {
      await PlanningApi.putBookmarked(user.id, plannerId);
      setPlannerInfo((prevInfo) => ({
        ...prevInfo,
        bookmarkCount: prevInfo.bookmarkCount + 1,
      }));
    } else {
      navigate("/login");
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="menu-icons">
      {isBookmarked ? (
        <FaBookmark
          className="menu-icon"
          title="북마크"
          onClick={() => handleBookmarked()}
        />
      ) : (
        <FaRegBookmark
          className="menu-icon"
          title="북마크"
          onClick={() => handleBookmarked()}
        />
      )}
      {isParticipant && (
        <>
          {plannerInfo.ownerNickname === user.nickname && (
            <>
              {/* 사용자 추가 아이콘 */}
              <LuUserRoundPlus
                className="menu-icon"
                title="사용자 추가"
                onClick={() =>
                  setModals((prevModals) => ({
                    ...prevModals,
                    searchUser: true,
                  }))
                }
              />

              {/* 공개/비공개 설정 아이콘 */}
              {plannerInfo.public ? (
                <BiLockOpen
                  className="menu-icon"
                  title="공개/비공개"
                  onClick={() =>
                    setModals((prevModals) => ({
                      ...prevModals,
                      public: true,
                    }))
                  }
                />
              ) : (
                <BiLock
                  className="menu-icon"
                  title="공개/비공개"
                  onClick={() =>
                    setModals((prevModals) => ({
                      ...prevModals,
                      public: true,
                    }))
                  }
                />
              )}
            </>
          )}
          <BiTrash
            className="menu-icon"
            title="플래닝 삭제"
            onClick={() =>
              setModals((prev) => ({
                ...prev,
                deletePlanning: true,
              }))
            }
          />
          <AiOutlineMessage
            className="menu-icon"
            title="채팅"
            onClick={() => setIsChatOpen(!isChatOpen)}
          />
        </>
      )}
    </div>
  );
};
