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

  const billingReq = {
    storeId: process.env.REACT_APP_SHOP_ID,
    channelKey: process.env.REACT_APP_SHOP_CHANNEL,
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
    console.log("클릭 시작", billingReq.issueId)
    const rsp = await PortOne.requestIssueBillingKey(billingReq);
    if (rsp.code !== undefined) {
      return alert(rsp.message);
    }

    console.log("콘솔 ::::::::::::: ",rsp.message);

    // const response = await fetch(`${process.env.REACT_APP_IP}/billings`, {
    //   method: "POST",
    //   header: {"Content-Type": "application/json"},
    //   body: JSON.stringify({
    //     billingKey: rsp.code,
    //   }),
    // });
    //
    // if (!response.ok) throw new Error(`response: ${await response.json()}`);
  };

  // const response = await PortOne.requestPayment(membership)
  //     console.log(response)


  return (
    <>
      <Button onClick={onClickPay}>
        결제
      </Button>
    </>
  );
}

export default RequestPayment;