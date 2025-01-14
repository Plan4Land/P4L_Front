import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Container, InputBox, Button } from "../../Style/UserInfoEditStyle";
import { useAuth } from "../../Context/AuthContext";
import AxiosApi from "../../Api/AxiosApi";
import { CheckModal } from "../../Util/Modal";


const UserDelete = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // 탈퇴 기능 구현
  const handleSubmit = async () => {
    const response = await AxiosApi.memberDelete(user.id);
    if(response.data) {
      const logout = await AxiosApi.logout(user.id);
      if(logout.data) {
        setIsModalOpen(true);
      }
    }
  }

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <Center>
      <Container>
        <h2 className="title">회원탈퇴</h2>

        내용보류

        <Button 
          className="red" 
          onClick={handleSubmit}
        >
          회원탈퇴
        </Button>

        <CheckModal 
          isOpen={isModalOpen} 
          onClose={closeModal}
        >
          <p>회원 탈퇴가 완료되었습니다.</p>
          <p>이용해주셔서 감사합니다.</p>
        </CheckModal>
      </Container>
    </Center>
  );
};
export default UserDelete;