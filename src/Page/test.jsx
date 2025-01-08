import React, { useEffect, useState } from "react";
import styled from "styled-components";

const H4 = styled.h4`
  margin: 0;
`;
const P = styled.p`
  margin: 0;
  padding: 10px 30px;
`;

const Test = () => {
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    setUserInfo(localStorage.getItem("user"));
  }, []);

  return (
    userInfo && (
      <div>
        <p>{userInfo}</p>
        <H4>아이디 : JSON.parse(localStorage.getItem("user")).id</H4>
        <P>{JSON.parse(userInfo).id}</P>
        <H4>이름 : JSON.parse(localStorage.getItem("user")).name</H4>
        <P>{JSON.parse(userInfo).name}</P>
        <H4>닉네임 : JSON.parse(localStorage.getItem("user")).nickname</H4>
        <P>{JSON.parse(userInfo).nickname}</P>
        <H4>
          프로필 이미지 : JSON.parse(localStorage.getItem("user")).imgPath
        </H4>
        <P>{JSON.parse(userInfo).imgPath}</P>
      </div>
    )
  );
};

export default Test;
