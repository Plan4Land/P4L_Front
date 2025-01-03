import React, { useState } from "react";
const UserInfoEdit = () => {
  const [name, setName] = useState("홍길동");
  const [email, setEmail] = useState("hong@example.com");

  const handleSave = () => {
    alert(`저장되었습니다: \n이름: ${name}\n이메일: ${email}`);
  };

  return (
    <>
      <h2>내 정보 수정</h2>
      <label htmlFor="name">이름</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSave}>저장하기</button>
    </>
  );
};

export default UserInfoEdit;
