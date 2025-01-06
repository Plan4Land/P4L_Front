import { Header, Footer } from "../../Component/GlobalComponent";
import { UserMenu } from "../../Component/UserComponent";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MyPageMainContainer, UserInfo } from "../../Style/MyPageMainStyled";
import UserInfoEdit from "./UserInfoEdit";
import MyPlanningList from "./MyPlanningList";

export const MyPageMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // URL에서 menu 값을 가져옴
  const menuFromUrl = queryParams.get("menu");
  const [selectedMenu, setSelectedMenu] = useState(menuFromUrl || "");

  useEffect(() => {
    // URL이 변경되면 selectedMenu를 동기화
    setSelectedMenu(menuFromUrl || "");
  }, [menuFromUrl]);

  useEffect(() => {
    // selectedMenu가 변경되면 URL 업데이트
    if (selectedMenu) {
      navigate(`?menu=${selectedMenu}`, { replace: true });
    } else {
      navigate("/mypage", { replace: true });
    }
  }, [selectedMenu, navigate]);

  return (
    <>
      <Header />
      <MyPageMainContainer>
        <div className="menu">
          <UserMenu
            setSelectedMenu={setSelectedMenu}
            selectedMenu={selectedMenu}
          />
        </div>
        <div className="MyPageMenu">
          {!selectedMenu && (
            <UserInfo>
              <div className="ProfileImg">프로필 이미지</div>
              <div className="UserExplain">내 정보 설명설명</div>
            </UserInfo>
          )}
          {selectedMenu === "내 플래닝" && <MyPlanningList />}
          {selectedMenu === "좋아요 관광지"}
          {selectedMenu === "좋아요 플래닝"}
          {selectedMenu === "내 정보 수정" && <UserInfoEdit />}
        </div>
      </MyPageMainContainer>
      <Footer />
    </>
  );
};

export default MyPageMain;
