import React, { useState } from "react";
import { ModalHeader, ModalContent, ModalFooter, ApplyButton, ModalItem } from "../Style/TrafficStyle"; // 경로 수정

const DateComponent = ({ onApply, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12");

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleApply = () => {
    onApply(selectedDate, selectedTime);
  };

  return (
    <div>
      <ModalHeader>
        <h3>날짜와 시간 선택</h3>
      </ModalHeader>

      <ModalContent>
        <ModalItem>
          <label>날짜 :</label>
          <input
            type="date"
            value={selectedDate.toISOString().substring(0, 10)} // 날짜 형식을 맞추기 위해 ISO 8601 형식 사용
            onChange={handleDateChange}
          />
        </ModalItem>

        <ModalItem>
          <label>시간 :</label>
          <select value={selectedTime} onChange={handleTimeChange}>
            {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={hour}>{`${hour}시`}</option>
            ))}
          </select>
        </ModalItem>
      </ModalContent>

      <ModalFooter>
        <ApplyButton onClick={handleApply}>적용</ApplyButton>
      </ModalFooter>
    </div>
  );
};

export default DateComponent;