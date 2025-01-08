import React, { useState } from 'react';
import styled from 'styled-components';

// 스타일 정의
const SeatTypeSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
`;

const SeatTypeSelector = ({ onSeatTypeChange }) => {
  const [seatType, setSeatType] = useState('economy');

  const handleSeatTypeChange = (event) => {
    setSeatType(event.target.value);
    onSeatTypeChange(event.target.value);
  };

  return (
    <SeatTypeSelectorContainer>
      <Label>좌석유형 선택</Label>
      <Select value={seatType} onChange={handleSeatTypeChange}>
        <option value="economy">일반좌석</option>
        <option value="business">유아동반석</option>
        <option value="first">휠체어석</option>
        <option value="first">전동휠체어석</option>
        <option value="first">자전거석</option>
        <option value="first">2층석(ITX청춘)</option>
      </Select>
    </SeatTypeSelectorContainer>
  );
};

export default SeatTypeSelector;
