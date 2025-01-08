import React, { useState, useEffect } from "react";
import { PassengerSelectorWrapper, PassengerBox, ModalInput, ApplyModalButton, SelectedCountText } from "../Style/TrafficStyle";

const PassengerSelector = ({ onPassengerChange }) => {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [elderly, setElderly] = useState(0);
  const [severeDisability, setSevereDisability] = useState(0);
  const [mildDisability, setMildDisability] = useState(0);

  useEffect(() => {
    onPassengerChange(adult, child, infant, elderly, severeDisability, mildDisability);
  }, [adult, child, infant, elderly, severeDisability, mildDisability, onPassengerChange]);

  const handleChange = (type, value) => {
    switch (type) {
      case "adult":
        setAdult(value);
        break;
      case "child":
        setChild(value);
        break;
      case "infant":
        setInfant(value);
        break;
      case "elderly":
        setElderly(value);
        break;
      case "severeDisability":
        setSevereDisability(value);
        break;
      case "mildDisability":
        setMildDisability(value);
        break;
      default:
        break;
    }
  };

  return (
    <PassengerSelectorWrapper>
      <div>
        <label>어른:</label>
        <ModalInput
          type="number"
          value={adult}
          onChange={(e) => handleChange("adult", parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>어린이:</label>
        <ModalInput
          type="number"
          value={child}
          onChange={(e) => handleChange("child", parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>유아:</label>
        <ModalInput
          type="number"
          value={infant}
          onChange={(e) => handleChange("infant", parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>경로:</label>
        <ModalInput
          type="number"
          value={elderly}
          onChange={(e) => handleChange("elderly", parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>중증장애인:</label>
        <ModalInput
          type="number"
          value={severeDisability}
          onChange={(e) => handleChange("severeDisability", parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>경증장애인:</label>
        <ModalInput
          type="number"
          value={mildDisability}
          onChange={(e) => handleChange("mildDisability", parseInt(e.target.value))}
        />
      </div>
      <SelectedCountText>
        총 인원: {adult + child + infant + elderly + severeDisability + mildDisability}
      </SelectedCountText>
    </PassengerSelectorWrapper>
  );
};

export default PassengerSelector;
