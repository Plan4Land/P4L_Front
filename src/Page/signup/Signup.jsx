import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header, Footer } from "../../Component/GlobalComponent";
import { Center, SignupContainer, InputBox, Button } from "../../Component/SignupComponent";

// icon
import { VscAccount } from "react-icons/vsc";


export const Signup = () => {
  // input
  const [inputUserId, setInputUserId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPwCheck, setInputPwCheck] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  
  // message
  const [idMsg, setIdMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwCheckMsg, setPwCheckMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");


  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <>
      <Header />
      <Center>
        <SignupContainer>
          <h1 className="title">회원가입</h1>
          <div className="input-container">
            <div className="textMessage">{idMsg}</div>
            <InputBox>
            <div className="iconBox-left"><VscAccount /></div>
              <div className="inputBox">
                <input
                  type="text" 
                  placeholder="아이디 입력"
                  value={inputUserId}
                  onChange={(e) => handleInputChange(e, setInputUserId)}
                />
              </div>
            </InputBox>
          </div>
        </SignupContainer>
      </Center>
      <Footer />
    </>
  );
};
export default Signup;