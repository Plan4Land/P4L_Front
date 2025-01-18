import React, { useState } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { Button, CancelButton } from "../Component/ButtonComponent";
import { IoClose } from "react-icons/io5";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  display: flex;
  flex-direction: column;
  .buttons{
    flex-direction: row;
  }
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
  min-height: ${({ minHeight }) => minHeight || "auto"};
`;

const CloseButton = styled.div`
  display: flex;
  position: absolute;
  top: 2%;
  right: 2%;
  padding: 5px;
  cursor: pointer;
  svg {
    width: 1.2em;
    height: 1.2em;
  }
`;

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  confirmText = "확인", // 기본값: "확인"
  cancelText = "취소", // 기본값: "취소"
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {children} {/* 자식 요소로 전달된 내용 */}
        <div className="buttons">
        <Button onClick={onConfirm}>{confirmText}</Button> {/* 확인 버튼 텍스트 변경 가능 */}
        <CancelButton onClick={onClose}>{cancelText}</CancelButton> {/* 취소 버튼 텍스트 변경 가능 */}
        </div>
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
  minHeight,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <CloseModalContent
        width={contentWidth}
        height={contentHeight}
        minHeight={minHeight}
      >
        {children}
        <CloseButton onClick={onClose}>
          <IoClose />
        </CloseButton>
      </CloseModalContent>
    </ModalBackdrop>
  );
};

///////////////// 메모장으로 쓰려고 만든 모달(드래그 가능)
const MemoModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const MemoModalContent = styled.div`
  position: absolute;
  width: ${(props) => props.width || "400px"};
  height: ${(props) => props.height || "300px"};
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  cursor: move;
`;

export const DraggableModal = ({
  isOpen,
  onClose,
  children,
  contentWidth,
  contentHeight,
}) => {
  const [position, setPosition] = useState({ top: 100, left: 100 });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "modal",
    item: { position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      setPosition((prevPos) => ({
        top: prevPos.top + delta.y,
        left: prevPos.left + delta.x,
      }));
    },
  }));

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <MemoModalContent
        ref={drag}
        width={contentWidth}
        height={contentHeight}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          opacity: isDragging ? 0.5 : 1,
        }}
        onClick={(e) => e.stopPropagation()} // 모달 바깥 클릭 시 모달 닫히지 않도록 함
      >
        {children}
        <CloseButton onClick={onClose}>
          <IoClose />
        </CloseButton>
      </MemoModalContent>
    </ModalBackdrop>
  );
};
