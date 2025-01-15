import * as PortOne from "@portone/browser-sdk/v2";
import {Button} from "../../Component/ButtonComponent";
import {useEffect, useState} from "react";
import {InputBox} from "../../Style/UserInfoEditStyle";
import styled from "styled-components";

export const AnimatedInput = styled.div`
    max-height: ${({visible}) => (visible ? "500px" : "0")}; /* 처음 높이를 두 배 높이로 설정 */
    overflow: hidden; /* 내용이 넘치지 않도록 숨기기 */
    transition: max-height 0.5s ease-in-out; /* 부드럽게 접히고 펴지는 트랜지션 */
    opacity: ${({visible}) => (visible ? 1 : 0)};
    transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;
`;


export const BoxContainer = styled.div`
    display: grid;
    grid-template-rows: auto 1fr; /* 2개의 열을 생성: 1:1 비율 */
    grid-template-columns: 1fr;
    grid-gap: 20px; /* 각 그리드 요소 사이의 간격 */
    justify-items: center; /* 그리드 요소들을 가운데 정렬 */
    align-items: center; /* 그리드 요소들을 수직 가운데 정렬 */
    margin-top: 40px;
    padding: 10px;
    border: black solid 1px;

    &.button-box {
        grid-row: 1;
        justify-self: center;
        align-self: start;
    }

    &.input-container {
        grid-row: 2;
        justify-self: center;
        align-self: center;

    }
`;


const RequestPayment = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [paySelect, setPaySelect] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const info = localStorage.getItem("user")
    setUserInfo(JSON.parse(info))
  }, []);

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };


  const randomId = () => {
    return [...crypto.getRandomValues(new Uint32Array(2))]
      .map((word) => word.toString(16).padStart(8, "0"))
      .join("")
  }
  const kgCardBillingReq = {
    storeId: process.env.REACT_APP_SHOP_ID,
    channelKey: process.env.REACT_APP_CHANNEL_KG,
    billingKeyMethod: "CARD",
    issueName: "멤버십 정기 결제 PLAN4LAND",
    issueId: randomId(),
    displayAmount: 1,
    currency: "KRW",
    customer: {
      customerId: userInfo?.id || "",
      email: userEmail,
      phoneNumber: userPhone,
      fullName: userName,
    },
    offerPeriod: {
      interval: `${1}m`
    },
    popup: {
      center: true,
    },
    bypass: {
      smartro_v2: {
        SkinColor: "PURPLE",
        IsPwdPass: "Y"
      }
    }
  }

  const kakaoBillingReq = {
    storeId: process.env.REACT_APP_SHOP_ID,
    channelKey: process.env.REACT_APP_CHANNEL_KAKAOPAY,
    billingKeyMethod: "EASY_PAY",
    issueName: "멤버십 정기 결제 PLAN4LAND",
    issueId: randomId(),
    displayAmount: 1,
    currency: "KRW",
    customer: {
      customerId: userInfo.id,
    },
    offerPeriod: {
      interval: `${30}d`
    },
    popup: {
      center: true,
    },
    easyPay: {
      easyPayProvider: "KAKAOPAY"
    },
  }


  const onClickPay = async (req) => {
    const now = new Date();
    console.log(req.customer.customerId)

    // expire_date는 31일 23시간 뒤
    const expireDate = new Date(now);
    expireDate.setDate(expireDate.getDate() + 31);
    expireDate.setHours(23, 0, 0, 0);

    // payment_date는 31일 뒤
    const paymentDate = new Date(now);
    paymentDate.setDate(paymentDate.getDate() + 31);
    paymentDate.setHours(0, 0, 0, 0);

    console.log("클릭 시작", req.issueId)
    const rsp = await PortOne.requestIssueBillingKey(req);
    if (rsp.code !== undefined) {
      return alert(rsp.message);
    }


    const newMembershipRsp = await fetch('http://localhost:5000/pay/new-membership',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: req.customer.customerId,
          billingKey: rsp.billingKey,
          payType: paySelect,
          payId: req.issueId,
          payTime: now.toISOString(),
          expireDate: expireDate.toISOString(),
          paymentDate: paymentDate.toISOString(),
        })
      })

    console.log(newMembershipRsp)
  };


  return (
    <BoxContainer>
      <div className="button-box">
        <Button onClick={() => setPaySelect('kakao')}>
          카카오페이 </Button>
        <Button
          onClick={() => setPaySelect('card')}>
          신용카드
        </Button>
      </div>
      <div id={"input-container"}>
        <AnimatedInput visible={paySelect === "card"}>
          <>
            <InputBox>
              <div className="inputBox">
                <input type="text"
                       placeholder="이메일을 입력 해 주세요"
                       value={userEmail}
                       onChange={(e) => handleInputChange(e, setUserEmail)}/>
              </div>
            </InputBox>
            <InputBox>
              <div className="inputBox">
                <input type="text"
                       placeholder="이름을 입력 해 주세요"
                       value={userName}
                       onChange={(e) => handleInputChange(e, setUserName)}/>
              </div>
            </InputBox>
            <InputBox>
              <div className="inputBox">
                <input type="text"
                       placeholder="전화번호를 입력 해 주세요"
                       value={userPhone}
                       onChange={(e) => handleInputChange(e, setUserPhone)}/>
              </div>
            </InputBox>
          </>
        </AnimatedInput>
        <Button onClick={() => onClickPay(paySelect)}>
          결제
        </Button>
      </div>
    </BoxContainer>
  )
    ;
}

export default RequestPayment;