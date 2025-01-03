import { Header, Footer } from "../../Component/GlobalComponent";
import { UserMenu } from "../../Component/UserComponent";
export const MyPageMain = () => {
  return (
    <>
      <Header />
      <UserMenu />
      <div className="UserMainInfo"></div>

      <Footer />
    </>
  );
};
export default MyPageMain;
