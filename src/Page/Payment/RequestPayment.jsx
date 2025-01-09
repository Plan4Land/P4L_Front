import * as PortOne from "@portone/browser-sdk/v2";
import {Button} from "../../Component/ButtonComponent";
import {useState} from "react";
import {useAuth} from "../../Context/AuthContext";
import {Footer, Header} from "../../Component/GlobalComponent";
import {InputBox} from "../../Style/UserInfoEditStyle";
//yarn add @portone/browser-sdk

const RequestPayment = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [paySelect, setPaySelect] = useState("");
  const user = useAuth();

  const payList = ['kakao', 'card']

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const [paymentStatus, setPaymentStatus] = useState({
    status: "IDLE",
  })

  const randomId = () => {
    return [...crypto.getRandomValues(new Uint32Array(2))]
      .map((word) => word.toString(16).padStart(8, "0"))
      .join("")
  }
  const kgCardBillingReq = {
    storeId: process.env.REACT_APP_SHOP_ID,
    channelKey: process.env.REACT_APP_CHANNEL_KG,
    billingKeyMethod: "CARD",
    issueName: "멤버십 정기 결제",
    issueId: randomId(),
    displayAmount: 1,
    currency: "KRW",
    customer: {
      customerId: user.id,
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
    issueName: "멤버십 정기 결제",
    issueId: randomId(),
    displayAmount: 1,
    currency: "KRW",
    customer: {
      customerId: user.id,
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

  const membership = {
    storeId: process.env.REACT_APP_SHOP_ID,
    channelKey: process.env.REACT_APP_SHOP_CHANNEL,
    paymentId: "testpay1",
    orderName: "testorder",
    totalAmount: 4900,
    currency: "CURRENCY_KRW",
    payMethod: "EASY_PAY",
  }

  const onClickPayment = () => {
    setPaymentStatus({status: "PENDING"})
  }


  const onClickPay = async () => {
    console.log("클릭 시작", kakaoBillingReq.issueId)
    const rsp = await PortOne.requestIssueBillingKey(kakaoBillingReq);
    if (rsp.code !== undefined) {
      return alert(rsp.message);
    }
  };


  return (
    <>
      <Button onClick={()=>setPaySelect('kakao')}>
        카카오페이
      </Button>
      <Button onClick={()=>setPaySelect('card')}>
        신용카드
      </Button>
      {paySelect === "kakao" ? "" :
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
        </>
      }

      <Button onClick={onClickPay}>
        결제
      </Button>
    </>
  )
    ;
}

export default RequestPayment;