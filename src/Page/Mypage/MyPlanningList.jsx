import { Button } from "../../Component/ButtonComponent";
import { Link } from "react-router-dom";
import Modal from "../../Util/Modal";
import { useState } from "react";

export const MyPlanningList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitedPlannings, setInvitedPlannings] = useState([
    "여행 플래닝 1",
    "공연 플래닝 2",
    "모임 플래닝 3",
  ]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Link to={"/makeplanning"}>
        <Button>플래닝 만들기</Button>
      </Link>
      <Button onClick={openModal}>플래닝 초대 확인하기</Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>초대한 플래닝</h2>
        {invitedPlannings.length > 0 ? (
          <ul>
            {invitedPlannings.map((planning, index) => (
              <li key={index}>{planning}</li>
            ))}
          </ul>
        ) : (
          <p>초대된 플래닝이 없습니다.</p>
        )}
      </Modal>
    </>
  );
};

export default MyPlanningList;
