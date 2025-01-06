import React from "react";
import styled from "styled-components";
import { Button, CancelButton } from "../Component/ButtonComponent";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

export const Modal = ({ isOpen, onClose, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {children} {/* 자식 요소로 전달된 내용 */}
        <Button onClick={onConfirm}>확인</Button>
        <CancelButton onClick={onClose}>취소</CancelButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export const CheckModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {children} {/* 자식 요소로 전달된 내용 */}
        <Button onClick={onClose}>확인</Button>
      </ModalContent>
    </ModalBackdrop>
  );
};
