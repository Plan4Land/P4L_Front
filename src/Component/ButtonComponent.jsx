import { colors } from "../Style/GlobalStyle";
import styled from "styled-components";
import React from "react";

const StyledButton = styled.button`
  padding: ${(props) => props.padding || "10px 20px"};
  font-size: ${(props) => props.fontSize || "16px"};
  border: ${(props) => props.border || `1px solid ${colors.colorA}`};
  border-radius: ${(props) => props.borderRadius || "8px"};
  background-color: ${(props) => props.bgColor || colors.colorB};
  color: ${(props) => props.color || "white"};

  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

export const Button = ({
  children,
  onClick,
  bgColor,
  hoverBgColor,
  border,
  ...props
}) => (
  <StyledButton
    onClick={onClick}
    bgColor={bgColor}
    hoverBgColor={hoverBgColor}
    border={border}
    {...props}
  >
    {children}
  </StyledButton>
);

export const CancelButton = ({ onClick, children }) => (
  <Button
    onClick={onClick}
    bgColor="#c4c4c4"
    color="black"
    border="1px solid #6d6d6d"
  >
    {children}
  </Button>
);
