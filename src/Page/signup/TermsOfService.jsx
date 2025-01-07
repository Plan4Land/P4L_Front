import { useState, useRef } from "react";
import { Header, Footer } from "../../Component/GlobalComponent";
import {
  Center,
  SignupContainer,
  InputBox,
  Button,
} from "../../Component/SignupComponent";

export const TermsOfService = () => {
  return (
    <>
      <Header />
      <Center>
        <SignupContainer>
          <div className="terms-container">
            <div className="terms-label">
              <div className="iconBox-left"></div>
              <div className="inputBox">전체 동의하기</div>
            </div>
          </div>
        </SignupContainer>
      </Center>
      <Footer />
    </>
  );
};
export default TermsOfService;
