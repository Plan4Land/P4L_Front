import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const FindPw = () => {
  const [inputName, setInputName] = useState("");



  return(
  <SignupContainer>
    <h1 className="title">비밀번호 찾기</h1>
    
    <InputBox>
      <div>아이콘</div>
      <input
        type="text" 
        placeholder="이름 입력"
        value={inputName}
        onChange={(e) => handleInputChange(e, setInputName)}
      />
    </InputBox>

    <InputBox>
      <div>아이콘</div>
      <input
        type={"email"} 
        placeholder="이메일 입력"
        value={inputEmail}
        onChange={(e) => handleInputChange(e, setInputEmail)}
      />
    </InputBox>

    <Button>
      아이디 찾기
    </Button>
  </SignupContainer>
  );
};
export default FindPw;