import React, { useState, useEffect } from "react";
import { Center, Container, InputBox, Button } from "../../Style/UserInfoEditStyle";


const UserInfoValidate = () => {


  return (
    <Center>
      <Container>
      <h2 className="title">내 정보 수정</h2>

      <Button>회원 정보 수정</Button>

      <Button>비밀번호 변경</Button>

      <Button>회원 탈퇴</Button>
      </Container>
    </Center>
  );
};

export default UserInfoValidate;