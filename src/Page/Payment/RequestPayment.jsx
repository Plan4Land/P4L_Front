import * as PortOne from "@portone/browser-sdk/v2";
import {Button} from "../../Component/ButtonComponent";
import {useState} from "react";
//yarn add @portone/browser-sdk

const RequestPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState({
    status: "IDLE",
  })

  const randomId = () =>{
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
      customerId: "testCustomerId",
      email: "test@test.com",
      phoneNumber: "010-1234-5678",
      fullName:"홍길동"
    },
    offerPeriod:{
      interval: `${1}m`
    },
    popup:{
      center:true,
    },
    bypass:{
      smartro_v2:{
        SkinColor:"PURPLE",
        IsPwdPass:"Y"
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
      customerId: "testCustomerId",
    },
    offerPeriod:{
      interval: `${31}d`
    },
    popup:{
      center:true,
    },
    easyPay: {
      easyPayProvider:"KAKAOPAY"
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

    console.log("콘솔 ::::::::::::: ",rsp.billingKey);

  };



  return (
    <>
      <Button onClick={onClickPay}>
        결제
      </Button>
    </>
  );
}

export default RequestPayment;