import styled from "styled-components";

// 전체 박스
export const KtxInquiryWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

export const KtxInquiryBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  max-width: 800px;
  margin-bottom: 20px;
`;

// input 박스
export const InputBox = styled.div`
  display: flex;
  align-items: center; /* 모든 요소를 수직 가운데 정렬 */
  justify-content: space-between;
  width: 80%;
  max-width: 800px;
  margin-bottom: 20px;
  gap: 10px; /* 요소 간의 간격 */
  height: 50px; /* 고정된 높이 */
`;

export const PassBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  width: 30%;
  margin-bottom: 20px; /* 추가 간격 */
  margin-right: 295px;

  .input-with-icon {
    display: flex;
    align-items: center;
    width: 100%;

    input {
      width: calc(100% - 40px);
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .search-btn {
      width: 32px;
      height: 32px;
      margin-left: 8px;
      padding: 0;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }
`;

// 각 역 박스 스타일
export const StationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || "center"}; /* 정렬 옵션 추가 */
  flex: 1;
  position: relative;

  .input-with-icon {
    display: flex;
    align-items: center;
    width: 100%;

    input {
      width: calc(100% - 40px);
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .search-btn {
      width: 32px;
      height: 32px;
      margin-left: 8px;
      padding: 0;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }
`;

export const InputWithIcon = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

export const SearchBtn = styled.button`
  margin-left: 10px;
  background: none;
  border: 1px solid #ccc;
  padding: 5px;
  cursor: pointer;
`;

// 날짜 박스 스타일
export const DateBox = styled.div`
  width: 80%;
  max-width: 776px;
  margin-top: 20px;
  margin-bottom: 20px; /* 인원 선택과의 간격 추가 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 */

  label {
    margin-bottom: 5px;
    text-align: left; /* 텍스트 왼쪽 정렬 */
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const DateModal = styled.div`
  position: absolute;
  top: 210px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  width: 80%; /* DateBox와 동일한 너비 설정 */
  max-width: 800px; /* DateBox와 동일한 최대 너비 설정 */
  max-height: 500px;
  overflow-y: auto;
`;

export const CalendarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;

  h3 {
    text-align: center;
    margin-bottom: 10px;
  }

  .react-calendar {
    border: none; /* 테두리 제거 */
    width: 100%; /* 가로 크기 맞춤 */
    background: none; /* 배경 제거 */
    box-shadow: none; /* 그림자 제거 */
  }

  .react-calendar__tile--active {
    background: #4caf50; /* 선택된 날짜 색상 */
    color: white;
  }
`;

export const TimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .time-selector {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .time-slot {
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    min-width: 60px;
  }
  .time-slot.selected {
    background-color: #4caf50;
    color: white;
  }
  .arrow {
    font-size: 20px;
    cursor: pointer;
    padding: 5px 10px;
    border: none;
    background-color: #f1f1f1;
    border-radius: 5px;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  .arrow.left {
    margin-right: 10px;
  }
  .arrow.right {
    margin-left: 10px;
  }
`;

// 새로 추가된 스타일
export const SelectedTimeMessage = styled.div`
  margin-bottom: 10px; /* 시간 영역 위쪽 여백 */
  font-size: 14px;
  color: #333;
  text-align: center; /* 중앙 정렬 */
`;

export const ApplyButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px; /* 하단 여백 */
  display: block; /* 전체 너비 */
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
`;

export const Calendar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .month {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
  }

  .month div {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const TimeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

// 모달 박스 크기 수정
export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 80%;
  max-width: 800px;
  height: auto;
  max-height: 600px;
  overflow-y: auto;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 8px;
  max-height: 300px;
  overflow-y: auto;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// 모달 스타일
export const Modal = styled.div`
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const SelectBox = styled.div`
  background: #f1f1f1;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  margin: 10px 0;
  width: 100%;
  max-width: 200px;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  position: relative;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

// 역 목록
export const StationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

export const StationItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const RegionListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  .arrow {
    font-size: 20px;
    cursor: pointer;
    padding: 5px 10px;
    border: none;
    background-color: #f1f1f1;
    border-radius: 5px;
    margin: 0 10px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const RegionList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const RegionButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;

export const ArrowButton = styled.button`
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  background-color: #f1f1f1;
  border-radius: 5px;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;



export const SwapButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px; /* 버튼 크기 */
  height: 35px; /* 버튼 크기 */
  font-size: 16px;
  border: none;
  border-radius: 50%; /* 동그랗게 */
  cursor: pointer;

  /* 스왑 버튼의 위치 조정 */
  position: relative;
  top: 18px; /* 버튼을 아래로 이동 */
`;

export const SelectBoxWrapper = styled.div`
  margin-top: 10px; /* 출발역 선택 박스 밑에 일정 · 인원 선택이 오도록 간격 조정 */
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  width: 100%;
  transform: translateX(-18.7%); /* 중앙에서 왼쪽으로 약간 이동 */
`;

export const CheckBoxLabel = styled.label`
  font-size: 16px;
  margin-left: 10px; /* 왕복 체크박스와 텍스트 간 간격 */
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;  /* 체크박스를 세로로 정렬 */
`;

// 인원 선택 관련 스타일
export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;  /* 위치를 상대적으로 설정하여 자식 모달 박스 위치 설정 */
`;

export const SelectLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

export const PassModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  width: 90%;
  max-width: 400px;
  padding: 20px;
`;

export const ModalButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

export const PassengerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Label = styled.span`
  flex: 1;
  text-align: left;
`;

export const CounterButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;