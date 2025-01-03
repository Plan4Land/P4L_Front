export const UserMenu = ({ setSelectedMenu, selectedMenu }) => {
  const links = [
    "마이페이지",
    "내 플래닝",
    "좋아요 관광지",
    "좋아요 플래닝",
    "내 정보 수정",
  ];
  return (
    <>
      {links.map((label) => (
        <p
          key={label}
          onClick={() => setSelectedMenu(label)}
          className={selectedMenu === label ? "selected" : ""}
        >
          {label}
        </p>
      ))}
    </>
  );
};
