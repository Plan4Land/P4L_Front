import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../Context/AuthContext";

const H4 = styled.h4`
  margin: 0;
`;
const P = styled.p`
  margin: 0;
  padding: 10px 30px;
`;

const Test = () => {
  const [userInfo, setUserInfo] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    setUserInfo(localStorage.getItem("user"));
  }, []);

  return (
    user && (
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
        <H4>멤버십 : JSON.parse(localStorage.getItem("user")).role</H4>
        <P>{JSON.parse(userInfo).role}</P>
        <p>refreshToken : {localStorage.getItem("refreshToken")}</p>
        <p>accessToken : {localStorage.getItem("accessToken")}</p>
        <br />
        <h3>useAuth</h3>
        <p>user.id : {user.id}</p>
        <p>user.nickname : {user.nickname}</p>
        <p>user.imgPath : {user.imgPath}</p>
        <p>user.role : {user.role}</p>
      </div>
    )
  );
};

export default Test;
