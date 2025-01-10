import * as PortOne from "@portone/browser-sdk/v2";
import {Button} from "../../Component/ButtonComponent";
import {useEffect, useState} from "react";
import {useAuth} from "../../Context/AuthContext";
import {InputBox} from "../../Style/UserInfoEditStyle";
//yarn add @portone/browser-sdk

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
      customerId: userInfo.id,
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
    <>
      <Button onClick={() => setPaySelect('kakao')}>
        카카오페이
      </Button>
      <Button onClick={() => setPaySelect('card')}>
        신용카드
      </Button>
      {paySelect === "kakao" ?
        <Button onClick={() => onClickPay(kakaoBillingReq)}>
          결제
        </Button>
        :
        <>
          <InputBox>
            <div className="inputBox">
              <input
                type="text"
                placeholder="이메일을 입력 해 주세요"
                value={userEmail}
                onChange={(e) => handleInputChange(e, setUserEmail)}
              />
            </div>
          </InputBox>

          <InputBox>
            <div className="inputBox">
              <input
                type="text"
                placeholder="이름 입력 해 주세요"
                value={userName}
                onChange={(e) => handleInputChange(e, setUserName)}
              />
            </div>
          </InputBox>

          <InputBox>
            <div className="inputBox">
              <input
                type="text"
                placeholder="전화번호를 입력 해 주세요"
                value={userPhone}
                onChange={(e) => handleInputChange(e, setUserPhone)}
              />
            </div>
          </InputBox>

          <Button onClick={() => onClickPay(kgCardBillingReq)}>
            결제
          </Button>
        </>
      }


    </>
  )
    ;
}

export default RequestPayment;