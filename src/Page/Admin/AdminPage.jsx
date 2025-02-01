import styled from "styled-components";
import {useEffect, useState} from "react";
import {Button} from "../../Component/ButtonComponent";
import {Modal} from "../../Util/Modal";
import AdminApi from "../../Api/AdminApi";
import {FaSearch} from "react-icons/fa";
import {SearchSt} from "../../Style/ItemListStyled";
import {Pagination} from "../../Component/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
// 게시글 목록 불러와서 삭제하기
// 정지 유저 풀어주기
// 관리자 토큰으로 로그인하기
// 유저 상세정보 모달 -> 바로 볼 수 있게
// 신고도 검색 기능?


export const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("report");
  const [members, setMembers] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [reportCount, setReportCount] = useState(0); // 신고 횟수 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [banDays, setBanDays] = useState(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [banReason, setBanReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      currentPage: searchParams.get("currentPage") || 0,
      pageSize: searchParams.get("pageSize") || 20,
      select: searchParams.get("select") || "",
      keyword: searchParams.get("keyword") || ""
    }
  });
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = () => {
    updateFilters("keyword", searchKeyword);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if(activeTab === "report") {
          const data = await AdminApi.loadReports(filters);
          setReports(data.content);
          setTotalPages(data.totalPages);
        }else if(activeTab === "user") {
          const data = await AdminApi.userSearch(filters);
          setMembers(data.content); // 배열 형식으로 설정
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [filters]);

  const memberCategory = [
    {name: '전체', value: ''},
    {name: '아이디', value: 'id'},
    {name: '닉네임', value: 'nickname'},
    {name: '이름', value: 'name'},
    {name: '이메일', value: 'email'},
  ];

  const reportsCategory = [
    {name: '전체', value: ''},
    {name: '대기', value: 'WAIT'},
    {name: '거절', value: 'REJECT'},
    {name: '승인', value: 'ACCEPT'},
  ]

  const clearFilters = () => {
    setFilters({
      currentPage: 0,
      pageSize: 20,
      select: "",
      keyword: ""
    })
    navigate("/management");
  }

  const updateFilters = (key, value) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [key]: value,
        currentPage: key === "currentPage" ? value : 0,
      };
      const searchParams = new URLSearchParams(newFilters);
      navigate(`/management?${searchParams.toString()}`, {replace: true});
      return newFilters;
    });
  };

  const handlePageChange = (newPage) => {
    updateFilters("currentPage", newPage);
  }

  const handleReportTabClick = async () => {
    setActiveTab("report");
    if (reports.length === 0) { // 중복 호출 방지
      try {
        setSearchKeyword("");
        clearFilters();
        const data = await AdminApi.loadReports();
        setReports(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
  };

  const handleUserTabClick = async () => {
    setActiveTab("user");
    if (members.length === 0) { // 중복 호출 방지
      try {
        setSearchKeyword("");
        clearFilters();
        const data = await AdminApi.userSearch();
        console.log(data);
        setMembers(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && activeTab === "user") {
      handleSearch();
    }else if (e.key === "Enter" && activeTab === "reports") {
      handleReportSearch();
    }
  };

  const handleReportSearch = () => {
    updateFilters("keyword", searchKeyword);
  }

  const handleReportReject = async (reportId) => {
    try {
      console.log(reportId);
      const response = await AdminApi.reportReject(reportId);
      setReports(reports.map(report =>
        report.id === reportId ? {...report, state: "REJECT"} : report));
      console.log(response.data)
      setIsReportModalOpen(false);
      setSelectedReport(null);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handleReportAccept = async (reportId, userId, day, reason) => {
    try {
      const response = await AdminApi.reportAccept(reportId, userId, day, reason);
      setReports(reports.map(report =>
        report.id === reportId ? {...report, state: "ACCEPT"} : report));
      console.log(response.data)
      setIsReportModalOpen(false);
      setSelectedReport(null);
      setBanDays(0);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handleReportSelected = (e) => {
    setSelectedReport(e);
    setIsReportModalOpen(true);
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
      await AdminApi.userBan(selectedMember.id, banDays, banReason);
      alert(`${selectedMember.name}님의 계정을 정지합니다.`);
      setIsConfirmModalOpen(false);
      setMembers(members.map(member => member.id === selectedMember.id ? {
        ...member,
        role: "ROLE_BANNED"
      } : member));
    } catch (error) {
      console.error("Error banning member:", error);
    }
  };

  const handlePlannerClick = async () => {
    setActiveTab("planner");
  }

  return (
    <div>
      <div>
        <h1>관리자 페이지</h1>
        <div className="tabNav">
          <Button onClick={handleReportTabClick}>신고 관리</Button>
          <Button onClick={handleUserTabClick}>유저 목록</Button>
          <Button onClick={handlePlannerClick}>플래너 목록</Button>
        </div>
        {activeTab === "report" && (
          <div>
            <h2>신고 관리</h2>
            <SearchSt>
              <div className="search-wrapper">
                <select
                  value={filters.select}
                  onChange={(e) => updateFilters("select", e.target.value)}
                >
                  {reportsCategory.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="search"
                  placeholder="신고 검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="search-button" onClick={handleReportSearch}>
                  <FaSearch/> {/* 검색 아이콘 */}
                </button>
              </div>
            </SearchSt>
            {reports.map((report) => (
              <ReportBox key={report.id}>
                <p>
                  <strong>신고자 ID:</strong> {report.reporter.id}
                </p>
                <p>
                  <strong>피신고자 ID:</strong> {report.reported.id}
                </p>
                <p>
                  <strong>내용:</strong> {report.content}
                </p>
                <Button
                  onClick={() =>
                    report.state === "WAIT" && handleReportSelected(report)
                  }
                  bgColor={
                    report.state === "WAIT"
                      ? "gray"
                      : report.state === "ACCEPT"
                      ? "green"
                      : "red"
                  }
                >
                  {report.state}
                </Button>
              </ReportBox>
            ))}
          </div>
        )}
        {activeTab === "user" && (
          <div className="userlist">
            <h2>유저 목록</h2>
            <SearchSt>
              <div className="search-wrapper">
                <select
                  value={filters.select}
                  onChange={(e) => updateFilters("select", e.target.value)}
                >
                  {memberCategory.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  className="search"
                  placeholder="유저 검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)} // 검색어 업데이트
                  onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
                />
                <button className="search-button" onClick={handleSearch}>
                  <FaSearch /> {/* 검색 아이콘 */}
                </button>
              </div>
            </SearchSt>
            {members.map((member) => (
              <UserBox
                key={member.id}
                onClick={() => handleMemberClick(member.id)}
                style={{ cursor: "pointer" }}
              >
                {member.nickname} ({member.id})
              </UserBox>
            ))}
          </div>
        )}
        {activeTab === "planner" && <></>}
        {isModalOpen && selectedMember && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleAccountBan}
            confirmText="계정 정지"
          >
            <h2>멤버 상세 정보</h2>
            <p>
              <strong>ID:</strong> {selectedMember.id}
            </p>
            <p>
              <strong>이름:</strong> {selectedMember.name}
            </p>
            <p>
              <strong>닉네임:</strong> {selectedMember.nickname}
            </p>
            <p>
              <strong>이메일:</strong> {selectedMember.email}
            </p>
            <p>
              <strong>프로필 이미지:</strong> {selectedMember.imgPath || "없음"}
            </p>
            <p>
              <strong>신고 횟수:</strong> {reportCount}
            </p>
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
            정지일 입력
            <input onChange={(e) => setBanDays(e.target.value)}/>
            
            정지 사유 입력
            <input onChange={(e) => setBanReason(e.target.value)} />
            <h3>{selectedMember.name}님의 계정을 정지시키겠습니까?</h3>
          </Modal>
        )}
        {isReportModalOpen && (
          <Modal
            isOpen={isReportModalOpen}
            onClose={() => handleReportReject(selectedReport.id)}
            onConfirm={async () => {
              setLoading(true);
              await handleReportAccept(
                selectedReport.id,
                selectedReport.reported.id,
                banDays,
                banReason
              );
              setLoading(false);
            }}
            confirmText={loading ? "처리 중..." : "승인"}
            cancelText="거절"
          >
            정지일 입력
            <input
              type="text"
              value={banDays}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[1-9][0-9]*$/.test(value) || value === "") {
                  setBanDays(value);
                }
              }}
              placeholder="숫자만 입력"
            />
            정지 사유 입력
            <input
              type="text"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="사유를 입력하세요"
            />
            <Button onClick={() => setIsReportModalOpen(false)}>취소</Button>
          </Modal>
        )}
        <Pagination
          currentPage={filters.currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
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
