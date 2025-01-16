import { colors } from "../Style/GlobalStyle";
import styled from "styled-components";
import React from "react";

const StyledButton = styled.button`
  ${(props) => props.$margin && `margin: ${props.$margin};`}
  ${(props) => props.$width && `width: ${props.$width};`}
  ${(props) => props.$height && `height: ${props.$height};`}
  padding: ${(props) => props.padding || "10px 20px"};
  font-size: ${(props) => props.fontSize || "16px"};
  border: ${(props) => props.border || `1px solid ${colors.colorA}`};
  border-radius: ${(props) => props.borderRadius || "8px"};
  background-color: ${(props) => props.bgColor || colors.colorB};
  color: ${(props) => props.color || "white"};

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
  <Button
    onClick={onClick}
    {...props}
    bgColor="#c4c4c4"
    color="black"
    border="1px solid #6d6d6d"
  >
    {children}
  </Button>
);
const StyledToggleButton = styled.button`
  background-color: transparent;
  width: 20px !important;
  height: 20px !important;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${(props) => (props.isOpen ? colors.colorB : "#666")};
  transition: color 0.2s ease;
  &:hover {
    background-color: transparent !important;
  }
`;
export const ToggleButton = ({ isOpen, onToggle }) => {
  return (
    <StyledToggleButton
      StyledToggleButton
      onClick={onToggle}
      className="toggle-button"
    >
      {isOpen ? "▲" : "▼"}
    </StyledToggleButton>
  );
};
