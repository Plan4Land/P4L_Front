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

import { useState } from "react";
import { Button } from "../Component/ButtonComponent";

export const  AdminPage= () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [activeTab, setActiveTab] = useState("report");

  const handleLogin = (e) => {
    e.preventDefault();

    // 아이디와 비밀번호 검증 로직 임시 생성 => 관리자 일 경우만 로그인 되게 변경 해 주세요
    if (id === "admin" && password === "1234") {
      setIsLoggedIn(true); // 로그인 성공
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다."); // 로그인 실패
    }
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
      <div>
        <Button onClick={() => setActiveTab("report")}>신고 관리</Button>
        <Button onClick={() => setActiveTab("user")}>유저 목록</Button>
      </div>

      {activeTab === "report" && (
        <div>
          <h2>신고 관리</h2>
        </div>
      )}
      {activeTab === "user" && (
        <div>
          <h2>유저 목록</h2>
        </div>
      )}
    </div>
      )}
    </div>
  );
}
