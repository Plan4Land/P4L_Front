import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../Style/GlobalStyle";

export const UserMenu = ({ setSelectedMenu, selectedMenu }) => {
  const navigate = useNavigate();
  const links = [
    "내 플래닝",
    "북마크 관광지",
    "북마크 플래닝",
    "내 정보 수정",
    // "멤버십",
  ];

  return (
    <UserMenuContainer>
      <p
        onClick={() => {
          setSelectedMenu("");
          navigate("/mypage");
        }}
        className={!selectedMenu ? "selected" : ""}
      >
        마이페이지
      </p>
      {links.map((label) => (
        <p
          key={label}
          onClick={() => setSelectedMenu(label)}
          className={selectedMenu === label ? "selected" : ""}
        >
          {label}
        </p>
      ))}
    </UserMenuContainer>
  );
};

const UserMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  p {
    margin: 10px 0;
    cursor: pointer;
    font-size: 16px;
    color: #555;
    transition: all 0.3s ease;

    &.selected {
      color: ${colors.colorA}; /* 선택된 상태의 색상 */
      font-weight: bold;
    }

    &:hover {
      opacity: 0.7;
    }
  }
`;
