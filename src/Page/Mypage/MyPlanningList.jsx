import { Button, CancelButton } from "../../Component/ButtonComponent";
import { Link } from "react-router-dom";
import { Modal, CheckModal } from "../../Util/Modal";
import { useState } from "react";
import { InvitePlanning } from "../../Style/MyPlanningListStyled";

export const MyPlanningList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitedPlannings, setInvitedPlannings] = useState([
    { title: "전주 여행", owner: "aaa" },
    { title: "대전 여행", owner: "bbb" },
  ]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleApproval = (title, owner) => {
    console.log(`플래닝 "${title}"을(를) 승인했습니다.`);
    // 플래닝 승인
  };

  const handleRejection = (title, owner) => {
    console.log(`플래닝 "${title}"을(를) 거절했습니다.`);
    // 플래닝 거절
  };

  return (
    <>
      <Link to={"/makeplanning"}>
        <Button>플래닝 만들기</Button>
      </Link>
      <Button onClick={openModal}>플래닝 초대 확인하기</Button>

      <CheckModal isOpen={isModalOpen} onClose={closeModal}>
        <InvitePlanning>
          <h2>플래닝 초대</h2>
          {invitedPlannings.length > 0 ? (
            <div className="invited-planning-list">
              {invitedPlannings.map((planning, index) => (
                <div key={index} className="invited-planning-item">
                  <div className="planning-details">
                    <span className="label">플래닝: {planning.title}</span>{" "}
                    <br />
                    <span className="owner">
                      {planning.owner} 님이 초대하였습니다.
                    </span>
                  </div>
                  <div className="buttons">
                    <Button
                      onClick={() =>
                        handleApproval(planning.title, planning.owner)
                      }
                    >
                      승인
                    </Button>
                    <CancelButton
                      onClick={() =>
                        handleRejection(planning.title, planning.owner)
                      }
                    >
                      거절
                    </CancelButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>초대된 플래닝이 없습니다.</p>
          )}
        </InvitePlanning>
      </CheckModal>
    </>
  );
};

export default MyPlanningList;
