import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../../Component/GlobalComponent";
import {
  Center,
  SignupContainer,
  InputBox,
  Button,
  Terms
} from "../../Component/SignupComponents/SignupComponent";

// icon
import { GoCheckCircle } from "react-icons/go";

export const TermsOfService = () => {
  const [isCheckedTotal, setIsCheckedTotal] = useState(false);
  const [isCheckedFst, setIsCheckedFst] = useState(false);
  const [isCheckedScd, setIsCheckedScd] = useState(false);

  const navigate = useNavigate();

  // 전체 동의 버튼
  const handleClickTotal = () => {
    setIsCheckedTotal((prev) => !prev);
    if(!isCheckedTotal) {
      setIsCheckedFst(true);
      setIsCheckedScd(true);
    } else {
      setIsCheckedFst(false);
      setIsCheckedScd(false);
    }
  }

  // 이용약관 버튼
  const handleClickFst = () => {
    setIsCheckedFst((prev) => !prev);
  }

  // 개인정보 수집 버튼
  const handleClickScd = () => {
    setIsCheckedScd((prev) => !prev);
  }

  const isButtonOn = isCheckedFst && isCheckedScd;

  return (
    <>
      <Header />
      <Center>
        <SignupContainer>
          <Terms>
            <div 
              className="terms-label"
              onClick={handleClickTotal}
            >
              <div 
                className={
                  isCheckedTotal 
                  ? "iconBox-left checked" 
                  : "iconBox-left"}
              >
              <GoCheckCircle />
              </div>
              <div className="inputBox-big">전체 동의하기</div>
            </div>
          </Terms>
          <Terms>
            <div 
              className="terms-label"
              onClick={handleClickFst}
            >
              <div 
                className={
                  isCheckedFst 
                  ? "iconBox-left checked" 
                  : "iconBox-left"}
              >
                <GoCheckCircle />
              </div>
              <div className="inputBox">PLAN4LAND 이용약관</div>
            </div>
            <div className="terms-content">
              <h3>PLAN4LAND 이용약관</h3>
              <p>
                이 약관은 PLAN4LAND(이하 "당사")가 제공하는 여행 정보 서비스(이하 "서비스")를 사용할 때 필요한 기본 규칙을 정리한 내용입니다. 서비스를 사용하시기 전에 꼭 읽어봐 주세요. 약관에 동의하지 않으신다면 서비스를 이용하실 수 없습니다.
              </p>
              <h4>제1조 (목적)</h4>
              <p>
                이 약관은 당사가 제공하는 서비스의 이용 조건과 절차, 그리고 당사와 사용자 간의 권리와 책임을 정하는 것을 목적으로 합니다.
              </p>
              <h4>제2조 (정의)</h4>
              <p>
                1. "서비스"는 당사가 제공하는 여행 정보 플랫폼을 뜻합니다.
              </p>
              <p>
                2. "이용자"는 이 약관에 동의하고 서비스를 사용하는 개인이나 단체를 말합니다.
              </p>
              <h4>제3조 (약관의 게시 및 변경)</h4>
              <p>
                1. 이 약관은 서비스 화면이나 연결된 페이지에 게시됩니다.
              </p>
              <p>
                2. 필요할 경우, 관련 법령을 위반하지 않는 범위에서 약관이 변경될 수 있습니다. 변경된 내용은 서비스 내 공지하거나 개별적으로 알려드립니다.
              </p>
              <p>
                3. 변경된 약관에 동의하지 않으시면 서비스 이용을 중단하고 회원 탈퇴를 하실 수 있습니다.
              </p>
              <h4>제4조 (서비스의 제공 및 변경)</h4>
              <p>
                1. 당사는 여행 정보와 관련된 다양한 서비스를 제공합니다.
              </p>
              <p>
                2. 서비스 품질 향상이나 운영상 필요한 경우, 서비스의 일부가 변경될 수 있으며, 이 경우 미리 공지해 드립니다.
              </p>
              <h4>제5조 (서비스 이용 제한)</h4>
              <p>
                1. 이용자는 법령과 이 약관을 준수하며 아래와 같은 행동을 하지 말아야 합니다:
              </p>
              <li>
                다른 사람의 개인정보를 도용하는 행위
              </li>
              <li>
                서비스 운영을 방해하는 행위
              </li>
              <li>
                법에 어긋나는 불법적인 목적의 사용
              </li>
              <p>
                2. 위와 같은 행위가 발생할 경우, 당사는 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.
              </p>
              <h4>제6조 (개인정보 보호)</h4>
              <p>
                1. 당사는 최소한의 개인정보만 수집하며, 이를 안전하게 관리합니다.
              </p>
              <p>
                2. 개인정보 보호와 관련된 자세한 내용은 "개인정보처리방침"에서 확인하실 수 있습니다.
              </p>
              <h4>제7조 (환불 정책)</h4>
              <p>
                본 서비스는 정보 제공을 목적으로 하며, 유료 서비스의 경우 원칙적으로 환불되지 않습니다. 다만, 관련 법령에 따라 환불이 필요한 경우에는 이를 따릅니다.
              </p>
              <h4>제8조 (책임의 제한)</h4>
              <p>
                1. 당사는 이용자가 제공받은 정보를 바탕으로 내린 판단이나 행동에 대해 책임지지 않습니다.
              </p>
              <p>
                2. 고의나 중대한 과실이 없는 한, 당사는 서비스 제공과 관련된 책임을 면합니다.
              </p>
              <h4>제9조 (준거법 및 관할)</h4>
              <p>
                이 약관은 대한민국 법률을 따르며, 분쟁이 발생할 경우 당사 본사가 위치한 지역의 법원이 관할권을 가집니다.
              </p>
              <h4>부칙</h4>
              <p>
                1. 이 약관은 2025년 1월 7일부터 적용됩니다.
              </p>
              <p>
                2. 약관에 명시되지 않은 사항은 관련 법령이나 일반적인 상관례를 따릅니다.
              </p>
            </div>
          </Terms>
          <Terms>
            <div 
              className="terms-label"
              onClick={handleClickScd}
            >
              <div 
                className={
                  isCheckedScd 
                  ? "iconBox-left checked" 
                  : "iconBox-left"}
              >
                <GoCheckCircle />
              </div>
              <div className="inputBox">개인정보 수집 및 이용</div>
            </div>
            <div className="terms-content">
              일단 내용 보류
            </div>
          </Terms>
          <Button 
            onClick={()=>navigate("/signup")}
            disabled={!isButtonOn}
          >
            다음
          </Button>
        </SignupContainer>
      </Center>
      <Footer />
    </>
  );
};
export default TermsOfService;
