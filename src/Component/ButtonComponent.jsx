import { colors } from "../Style/GlobalStyle";
import styled, { css, keyframes } from "styled-components";
import React from "react";
import { GlobalFont } from "../Style/GlobalStyle";

const StyledButton = styled.button`
  ${(props) => props.$margin && `margin: ${props.$margin};`}
  ${(props) => props.$width && `width: ${props.$width};`}
  ${(props) => props.$height && `height: ${props.$height};`}
  padding: ${(props) => props.padding || "10px 20px"};
  font-size: ${(props) => props.fontSize || "16px"};
  border: ${(props) => props.border || `none`};
  border-radius: ${(props) => props.borderRadius || "8px"};
  background-color: ${(props) => props.bgColor || colors.colorB};
  color: ${(props) => props.color || "white"};
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.hoverBgColor};
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }

  &.active {
    background-color: #c1b0b0;
  }
`;

export const Button = ({
  children,
  onClick,
  bgcolor,
  hoverBgColor,
  border,
  ...props
}) => (
  <StyledButton
    onClick={onClick}
    bgColor={bgcolor}
    hoverBgColor={hoverBgColor}
    border={border}
    {...props}
  >
    {children}
  </StyledButton>
);

export const CancelButton = ({ onClick, children, ...props }) => (
  <Button onClick={onClick} {...props} bgColor="#c4c4c4" color="black">
    {children}
  </Button>
);

export const ScrollBar = css`
  /* 전체 스크롤바 영역 스타일 */
  &::-webkit-scrollbar {
    width: 6px; /* 스크롤바 두께 */
    height: 6px; /* 가로 스크롤바 두께 */
  }

  /* 스크롤바 트랙(배경) 스타일 */
  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* 연한 배경색 */
    border-radius: 10px; /* 부드러운 모서리 */
  }

  /* 스크롤바 핸들(움직이는 부분) 스타일 */
  &::-webkit-scrollbar-thumb {
    background: ${colors.colorC};
    border-radius: 10px; /* 핸들의 모서리 둥글게 */
  }

  /* 스크롤바 핸들에 마우스를 올렸을 때 */
  &::-webkit-scrollbar-thumb:hover {
    background: rgb(80, 156, 189);
  }
`;

const rotateHalfClockwise = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const StyledToggleButton = styled.button`
  background-color: transparent;
  width: 20px !important;
  height: 20px !important;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${(props) => (props.isOpen ? colors.colorB : "#666")};
  transition: color 0.2s ease;
  .icon {
    display: inline-block;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease;
    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
`;

export const ToggleButton = ({ isOpen, onToggle }) => {
  return (
    <StyledToggleButton
      isOpen={isOpen}
      onClick={onToggle}
      className="toggle-button"
    >
      <span className="icon">{isOpen ? "▼" : "▼"}</span>
    </StyledToggleButton>
  );
};

const SectionContainer = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px 0 10px 5px;
  border-bottom: 1px solid #ddd;
`;

const SectionContent = styled.div`
  overflow: hidden;
  transition: max-height 0.3s linear;
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
`;

const SectionPlanContent = styled.div`
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(-10px)"};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

export const ToggleSection = ({ title, isOpen, onToggle, children }) => {
  return (
    <SectionContainer>
      <SectionTitle className="title-font">
        {title}
        <ToggleButton isOpen={isOpen} onToggle={onToggle} />
      </SectionTitle>
      <SectionContent isOpen={isOpen}>{children}</SectionContent>
    </SectionContainer>
  );
};

export const PlanToggleSection = ({ isOpen, children }) => {
  return (
    <SectionContainer>
      <SectionPlanContent isOpen={isOpen}>{children}</SectionPlanContent>
    </SectionContainer>
  );
};
