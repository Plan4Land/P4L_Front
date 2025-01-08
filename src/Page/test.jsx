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
  return (
    <div>
      <p>{localStorage.getItem("user")}</p>
      <H4>아이디 : JSON.parse(localStorage.getItem("user")).id</H4>
      <P>{JSON.parse(localStorage.getItem("user")).id}</P>
      <H4>이름 : JSON.parse(localStorage.getItem("user")).name</H4>
      <P>{JSON.parse(localStorage.getItem("user")).name}</P>
      <H4>닉네임 : JSON.parse(localStorage.getItem("user")).nickname</H4>
      <P>{JSON.parse(localStorage.getItem("user")).nickname}</P>
      <H4>프로필 이미지 : JSON.parse(localStorage.getItem("user")).imgPath</H4>
      <P>{JSON.parse(localStorage.getItem("user")).imgPath}</P>
    </div>
  );
};

export default Test;
