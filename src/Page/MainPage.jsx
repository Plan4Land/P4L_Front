import { Header, Footer } from "../Component/GlobalComponent";
import {
  MainBox,
  QuickSearch,
  RecommItem,
  RecommPlan,
  Festive,
} from "../Style/MainStyled";

export const Main = () => {
  return (
    <>
      <Header />
      <MainBox>
        <QuickSearch className="GridItem">빠른 검색</QuickSearch>
        <RecommItem className="GridItem">추천 관광지</RecommItem>
        <RecommPlan className="GridItem">추천 플래닝</RecommPlan>
        <Festive className="GridItem">축제</Festive>
      </MainBox>
      <Footer />
    </>
  );
};
