import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../Api/AxiosApi";
// component
import { useAuth } from "../../Context/AuthContext";
import { Center, Container, InputBox } from "../../Style/UserInfoEditStyle";
import { Button } from "../../Component/ButtonComponent";
import { CheckModal } from "../../Util/Modal";
// icon
import { IoIosArrowBack } from "react-icons/io";

import { GoCheckCircle } from "react-icons/go";

const UserDelete = () => {
  const { user, logout } = useAuth();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // 정보 가져오기
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await AxiosApi.memberInfo(user.id);
        setUserId(response.data.id);
        setEmail(response.data.email);
        setRole(response.data.role);
        console.log(response.data);
      } catch (error) {
        console.error("Error during getUserInfo: ", error);
      }
    };
    getUserInfo();
  }, []);

  // 탈퇴 기능 구현
  const handleSubmit = async () => {
    if (!isChecked) {
      setIsModalOpen(true);
      return;
    } else {
      const response = await AxiosApi.memberDelete(user.id);
      if(response.data) {
        const logout = await AxiosApi.logout(user.id);
        if(logout) {
          setIsModalOpen(true);
        }
      }
    }
    
  }

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    if (isChecked) {
      logout();
      navigate("/login");
    }
  };

  const handleBack = () => {
    window.location.reload();
  }

  const handleAgree = () => {
    setIsChecked((prev) => !prev);
  }

  return (
    <Center>
      <Container>
        <h2 className="title">회원탈퇴</h2>

        <div className="delete-header">
          <h2>탈퇴 안내</h2>
          <p>회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</p>
        </div>
        <div className="delete-content">
          <p className="dropout">
            사용하고 계신 아이디(<span className="span1">{userId}</span>)와 이메일(<span className="span1">{email}</span>)은 탈퇴할 경우 재사용 및 복구가 불가능합니다.
          </p>
          <p className="dropout-dsc">
            <span className="span2">탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가</span>하오니 신중하게 선택하시기 바랍니다.
          </p>

          <p className="dropout">
            탈퇴 후에도 게시판형 서비스에 등록한 게시물은 그대로 남아 있습니다.
          </p>
          <p className="dropout-dsc">
            플래닝에 올린 게시글 및 댓글은 탈퇴 시 자동 삭제되지 않고 그대로 남아 있습니다.<br />
            삭제를 원하는 게시글이 있다면 <span className="span2">반드시 탈퇴 전 비공개 처리하거나 삭제하시기 바랍니다.</span><br />
            탈퇴 후에는 본인 여부와 상관없이 게시글을 임의로 삭제해드릴 수 없습니다.
          </p>

          <p className="dropout">
            이용중인 멤버십은 자동으로 만료됩니다.
          </p>
          <p className="dropout-dsc">
            멤버십 이용 중 탈퇴하시는 경우, <span className="span2">남은 이용 기간이 있더라도 환불은 불가</span>합니다.<br />
            서비스 정책에 따라 탈퇴 시 남은 멤버십 기간에 대한 보상이나 환불 처리는 제공되지 않으니, 탈퇴 전 신중하게 검토해 주시기 바랍니다.
          </p>
          <hr />
          <div className="agreeBox">
            탈퇴 후에는 아이디 <span className="span1">{userId}</span> 로 다시 가입할 수 없으며 아이디와 데이터는 복구할 수 없습니다.<br />
            게시판형 서비스에 남아 있는 게시글은 탈퇴 후 삭제할 수 없습니다.<br />
            또한, 이용중인 멤버십은 자동으로 만료됩니다.
          </div>
          <div 
            className="agreeBtn"
            onClick={handleAgree}
          >
            <div 
              className={
                isChecked 
                ? "iconBox-left checked" 
                : "iconBox-left"}
            >
              <GoCheckCircle />
            </div>
            <strong>
              안내 사항을 모두 확인하였으며, 이에 동의합니다.
            </strong>
          </div>
        </div>

        <Button 
          bgcolor={"rgb(255, 0, 0)"}
          hoverBgColor={"rgb(220, 0, 0)"}
          border={"1px solid rgb(220, 0, 0)"}
          onClick={handleSubmit}
        >
          회원탈퇴
        </Button>

        <CheckModal 
          isOpen={isModalOpen} 
          onClose={closeModal}
        >
          {isChecked 
            ? <>
              <p>회원 탈퇴가 완료되었습니다.</p>
              <p>이용해주셔서 감사합니다.</p>
            </>
            : <p>약관에 동의해주세요.</p>
          }
        </CheckModal>

        <button 
          className="back-button"
          onClick={handleBack}
        >
          <IoIosArrowBack />
        </button>
      </Container>
    </Center>
  );
};
export default UserDelete;