import { useNavigate } from "react-router-dom";
import { UserMenuContainer } from "../Style/UserComponentStyled";

export const UserMenu = ({ setSelectedMenu, selectedMenu }) => {
  const navigate = useNavigate();
  const links = ["좋아요 관광지", "좋아요 플래닝", "내 정보 수정", "멤버십"];

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
