import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const FindEmail = () => {
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");


  return(
    <SignupContainer>
      <h1 className="title">아이디 찾기</h1>
      
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
          type={"text"} 
          placeholder="전화번호 입력"
          value={inputPhone}
          onChange={(e) => handleInputChange(e, setInputPhone)}
        />
      </InputBox>

      <Button>
        아이디 찾기
      </Button>
    </SignupContainer>
  );
};
export default FindEmail;