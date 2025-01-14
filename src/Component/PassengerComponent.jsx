import React, { useState } from "react";
import {
  PassModal,
  ModalOverlay,
  ModalCloseButton,
  ModalButton,
  ModalContent,
  PassengerRow,
  Label,
  CounterButton,
} from "../Style/TrafficStyle";

const PassengerComponent = () => {
  const [passengerCount, setPassengerCount] = useState({
    adult: 1, // Default to 1 adult
    child: 0,
    infant: 0,
    route: 0, // 경로
    severeDisability: 0, // 중증 장애인
    mildDisability: 0, // 경증 장애인
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTotalPassengers = (updatedCounts) =>
    Object.values(updatedCounts).reduce((sum, count) => sum + count, 0);

  const handleCountChange = (category, increment) => {
    setPassengerCount((prevState) => {
      const updatedCounts = {
        ...prevState,
        [category]: prevState[category] + increment,
      };

      const totalPassengers = getTotalPassengers(updatedCounts);
      if (totalPassengers > 9) {
        alert("최대 9명까지 선택할 수 있습니다.");
        return prevState;
      }

      return updatedCounts;
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <ModalOverlay onClick={toggleModal} />
      <PassModal >
        <ModalContent>
          <ModalCloseButton onClick={toggleModal}>X</ModalCloseButton>
          <h3>인원 선택</h3>
          <p>1~9명까지 선택 가능</p>
          <PassengerRow>
            <Label>어른</Label>
            <CounterButton
              onClick={() => handleCountChange("adult", -1)}
              disabled={passengerCount.adult <= 1}
            >
              -
            </CounterButton>
            <span>{passengerCount.adult}</span>
            <CounterButton
              onClick={() => handleCountChange("adult", 1)}
            >
              +
            </CounterButton>
          </PassengerRow>
          <PassengerRow>
            <Label>어린이</Label>
            <CounterButton
              onClick={() => handleCountChange("child", -1)}
              disabled={passengerCount.child <= 0}
            >
              -
            </CounterButton>
            <span>{passengerCount.child}</span>
            <CounterButton
              onClick={() => handleCountChange("child", 1)}
            >
              +
            </CounterButton>
          </PassengerRow>
          <PassengerRow>
            <Label>유아</Label>
            <CounterButton
              onClick={() => handleCountChange("infant", -1)}
              disabled={passengerCount.infant <= 0}
            >
              -
            </CounterButton>
            <span>{passengerCount.infant}</span>
            <CounterButton
              onClick={() => handleCountChange("infant", 1)}
            >
              +
            </CounterButton>
          </PassengerRow>
          <PassengerRow>
            <Label>경로</Label>
            <CounterButton
              onClick={() => handleCountChange("route", -1)}
              disabled={passengerCount.route <= 0}
            >
              -
            </CounterButton>
            <span>{passengerCount.route}</span>
            <CounterButton
              onClick={() => handleCountChange("route", 1)}
            >
              +
            </CounterButton>
          </PassengerRow>
          <PassengerRow>
            <Label>중증 장애인</Label>
            <CounterButton
              onClick={() => handleCountChange("severeDisability", -1)}
              disabled={passengerCount.severeDisability <= 0}
            >
              -
            </CounterButton>
            <span>{passengerCount.severeDisability}</span>
            <CounterButton
              onClick={() => handleCountChange("severeDisability", 1)}
            >
              +
            </CounterButton>
          </PassengerRow>
          <PassengerRow>
            <Label>경증 장애인</Label>
            <CounterButton
              onClick={() => handleCountChange("mildDisability", -1)}
              disabled={passengerCount.mildDisability <= 0}
            >
              -
            </CounterButton>
            <span>{passengerCount.mildDisability}</span>
            <CounterButton
              onClick={() => handleCountChange("mildDisability", 1)}
            >
              +
            </CounterButton>
          </PassengerRow>
          <ModalButton onClick={toggleModal}>적용</ModalButton>
        </ModalContent>
      </PassModal>
    </>
  );
};

export default PassengerComponent;
