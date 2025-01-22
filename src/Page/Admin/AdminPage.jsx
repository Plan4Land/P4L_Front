import styled from "styled-components";
import { useState } from "react";
import { Button } from "../../Component/ButtonComponent";
import { Modal } from "../../Util/Modal";
import AdminApi from "../../Api/AdminApi";

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("report");
  const [members, setMembers] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [reportCount, setReportCount] = useState(0); // 신고 횟수 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleUserTabClick = async () => {
    setActiveTab("user");
    if (members.length === 0) { // 중복 호출 방지
      try {
        const data = await AdminApi.userSearch();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
  };

  const handleReportTabClick = async () => {
    setActiveTab("report");
    if (reports.length === 0) { // 중복 호출 방지
      try {
        const data = await AdminApi.loadReports();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
  };

  // 멤버 클릭 시 저장된 상세정보 사용 및 신고 횟수 가져오기
  const handleMemberClick = async (userId) => {
    const member = members.find((member) => member.id === userId);
    if (member) {
      setSelectedMember(member);
      try {
        const count = await AdminApi.reportCount(userId);
        setReportCount(count);
      } catch (error) {
        console.error("Error fetching report count:", error);
      }
      setIsModalOpen(true);
    } else {
      console.error("Member not found");
    }
  };

  const handleAccountBan = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const confirmAccountBan = async () => {
    try {
      await AdminApi.banUser(selectedMember.id, { role: "ROLE_BANNED", banDate: new Date() });
      alert(`${selectedMember.name}님의 계정을 정지합니다.`);
      setIsConfirmModalOpen(false);
      setMembers(members.map(member => member.id === selectedMember.id ? { ...member, role: "ROLE_BANNED", banDate: new Date() } : member));
    } catch (error) {
      console.error("Error banning member:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>관리자 페이지</h1>
        <div className="tabNav">
          <Button onClick={handleReportTabClick}>신고 관리</Button>
          <Button onClick={handleUserTabClick}>유저 목록</Button>
        </div>
        {activeTab === "report" && (
          <div>
            <h2>신고 관리</h2>
            {reports.map((report) => (
              <ReportBox key={report.id}>
                <p><strong>신고 ID:</strong> {report.id}</p>
                <p><strong>내용:</strong> {report.content}</p>
              </ReportBox>
            ))}
          </div>
        )}
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
            confirmText="계정 정지"
          >
            <h2>멤버 상세 정보</h2>
            <p><strong>ID:</strong> {selectedMember.id}</p>
            <p><strong>이름:</strong> {selectedMember.name}</p>
            <p><strong>닉네임:</strong> {selectedMember.nickname}</p>
            <p><strong>이메일:</strong> {selectedMember.email}</p>
            <p><strong>프로필 이미지:</strong> {selectedMember.imgPath || "없음"}</p>
            <p><strong>신고 횟수:</strong> {reportCount}</p> {/* 신고 횟수 표시 */}
          </Modal>
        )}
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
    </div>
  );
};

const UserBox = styled.div`
    margin: 10px auto;
    border: 1px solid black;
    border-radius: 10px;
    width: 70vw;
    height: 100px;
`;

const ReportBox = styled.div`
  margin: 10px auto;
  border: 1px solid black;
  border-radius: 10px;
  width: 70vw;
  padding: 10px;
`;
