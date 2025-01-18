/*
* 1. URL 직접 입력으로 접근 (보안을 위해 로그인 페이지 분리)
* 2. 관리자 비밀번호, ID 입력
* 3. 신고 관리, 유저 정지 관리
* 3-1. 유저 역할 ROLE_BANNED 추가 + 정지일(밴 날짜) 컬럼 추가
* 3-2. 밴 수동 관리 or 스케줄러로 정지일 지나면 자동 석방
*
*
* - 신고 내역 확인
* - 유저 검색
* - 유저 정지 / 해제
*
*
*
* */
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Button } from "../Component/ButtonComponent";
import AxiosApi from "../Api/AxiosApi";
import { Modal } from "../Util/Modal";

export const  AdminPage= () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [activeTab, setActiveTab] = useState("report");
  const [members, setMembers] = useState([]); // 전체 멤버 리스트 상태
  const [selectedMember, setSelectedMember] = useState(null); // 선택된 멤버 상세 정보
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); //

  const handleLogin = (e) => {
    e.preventDefault();
    // 아이디와 비밀번호 검증 로직 임시 생성 => 관리자 일 경우만 로그인 되게 변경 해 주세요
    if (id === "admin" && password === "1234") {
      setIsLoggedIn(true); // 로그인 성공
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다."); // 로그인 실패
    }
  };

  // 전체 멤버 리스트 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await AxiosApi.memberList();
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  // 멤버 클릭 시 상세정보 가져오기
  const handleMemberClick = async (userId) => {
    try {
      const response = await AxiosApi.memberInfo(userId);
      setSelectedMember(response.data);
      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      console.error("Error fetching member info:", error);
    }
  };
  // 계정 정지 버튼 핸들러
  const handleAccountBan = () => {
    setIsModalOpen(false); // 상세 정보 모달 닫기
    setIsConfirmModalOpen(true); // 확인 모달 열기
  };

  // 계정 정지 확인 핸들러
  const confirmAccountBan = () => {
    alert(`${selectedMember.name}님의 계정을 정지합니다.`);
    setIsConfirmModalOpen(false); // 확인 모달 닫기
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h1>관리자 로그인</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label>아이디:</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div>
              <label>비밀번호:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">로그인</button>
          </form>
        </div>
      ) : (
        <div>
      <h1>관리자 페이지</h1>
      {/* 탭 네비게이션 */}
      <div className="tabNav">
        <Button onClick={() => setActiveTab("report")}>신고 관리</Button>
        <Button onClick={() => setActiveTab("user")}>유저 목록</Button>
      </div>
{/* 신고 목록!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      {activeTab === "report" && (
        <div>
          <h2>신고 관리</h2>
        </div>
      )}
      {/* 유저 목록!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 모달창에서 상세정보 조회 및 계정 정지할지말지 넣어주세요 */}
      {/* 검색기능 지숙님이 하셨지 않나 어딨을까요 */}
      {activeTab === "user" && (
        <div className="userlist">
          <h2>유저 목록</h2>
        {members.map((member) => (
          <UserBox
            key={member.id}
            onClick={() => handleMemberClick(member.id)}
            style={{ cursor: "pointer" }}
          >
            {member.name} ({member.id})
          </UserBox>
        ))}
        </div>
      )}
      {isModalOpen && selectedMember && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleAccountBan}
              confirmText="계정 정지" // 버튼 텍스트 변경
            >
              <h2>멤버 상세 정보</h2>
              <p><strong>ID:</strong> {selectedMember.id}</p>
              <p><strong>이름:</strong> {selectedMember.name}</p>
              <p><strong>닉네임:</strong> {selectedMember.nickname}</p>
              <p><strong>이메일:</strong> {selectedMember.email}</p>
              <p><strong>프로필 이미지:</strong> {selectedMember.profileImg || "없음"}</p>
            </Modal>
          )}

          {/* 계정 정지 확인 모달 */}
          {isConfirmModalOpen && (
            <Modal
              isOpen={isConfirmModalOpen}
              onClose={() => setIsConfirmModalOpen(false)}
              onConfirm={confirmAccountBan}
              confirmText="정지하기"
              cancelText="취소"
            >
              <h3>{selectedMember.name}님의 계정을 정지시키겠습니까?</h3>
            </Modal>
          )}
    </div>
  
      )}
    </div>
  );
}

const UserBox = styled.div`
margin: 10px auto;
border: 1px solid black;
border-radius: 10px;
width: 70vw;
height: 100px;
`