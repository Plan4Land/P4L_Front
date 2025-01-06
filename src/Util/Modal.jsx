import React from "react";
import styled from "styled-components";
import { Button, CancelButton } from "../Component/ButtonComponent";
import { IoClose } from "react-icons/io5";

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

const CloseModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
`;

const CloseButton = styled.div`
  display: flex;
  position: absolute;
  top: 2%;
  right: 2%;
  padding: 5px;
  cursor: pointer;
  svg {
    width: 1em;
    height: 1em;
  }
`;

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  buttonProps,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {children} {/* 자식 요소로 전달된 내용 */}
        <Button onClick={onConfirm} {...buttonProps}>
          확인
        </Button>
        <CancelButton onClick={onClose}>취소</CancelButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export const CheckModal = ({ isOpen, onClose, children, buttonProps }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {children} {/* 자식 요소로 전달된 내용 */}
        <Button onClick={onClose} {...buttonProps}>
          확인
        </Button>
      </ModalContent>
    </ModalBackdrop>
  );
};

export const CloseModal = ({
  isOpen,
  onClose,
  children,
  contentWidth,
  contentHeight,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <CloseModalContent width={contentWidth} height={contentHeight}>
        {children}
        <CloseButton onClick={onClose}>
          <IoClose />
        </CloseButton>
      </CloseModalContent>
    </ModalBackdrop>
  );
};
