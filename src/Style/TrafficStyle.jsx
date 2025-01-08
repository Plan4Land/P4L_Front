import styled from "styled-components";

export const KtxContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export const StationGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const StationField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 300px;
`;

export const StationButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;

export const DateField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1;
  max-width: 480px;
  margin-top: 20px;
`;

export const DateButton = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;

export const DateModal = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  margin-left: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 350px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  flex-grow: 1;
`;

export const ModalItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  
  label {
    margin-right: 5px;
  }

  input, select {
    margin-left: 5px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
`;

export const ApplyButton = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

// PassengerSelector 스타일링 추가

export const PassengerSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const PassengerBox = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  &:hover {
    background-color: #ddd;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const ModalInput = styled.input`
  width: 60px;
  text-align: center;
`;

// export const ApplyModalButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   padding: 8px 16px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

export const SelectedCountText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

// 인원 선택 박스 및 모달 스타일링 추가
export const PassengerSelectorBox = styled.div`
  width: 200px;
  height: 40px;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
`;

export const PassengerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PassengerModalContent = styled.div`
  background: white;
  padding: 10px;
  border-radius: 8px;
  min-width: 300px;
`;

export const CloseButton = styled.button`
  background: #588398;
  border: none;
  padding: 10px;
  color: black;
  cursor: pointer;
`;
