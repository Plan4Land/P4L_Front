import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Planning } from "./Page/Planning/Planning";
import { Main } from "./Page/MainPage";
import { MakePlanning } from "./Page/Planning/MakePlanning";
import { Login } from "./Page/signup/Login";
import { Signup } from "./Page/signup/Signup";
import MyPageMain from "./Page/User/MyPageMain";
import KtxInquiry from "./Page/Traffic/KtxInquiry";
import { TourList } from "./Page/Item/TourList";
import { PlanningList } from "./Page/Item/PlanningList";
import { AuthProvider } from "./Context/AuthContext";
import TermsOfService from "./Page/signup/TermsOfService";
import RequestPayment from "./Page/Payment/RequestPayment";
import Test from "./Page/test";
import ProtectedRoute from "./Util/ProtectedRoute";
import { TourItemInfo } from "./Page/Item/TourItemInfo";
import { KakaoRedirect } from "./Component/KakaoLoginRedirect";
import { Otheruser } from "./Page/User/Otheruser";
import { AdminPage } from "./Page/AdminPage";

function App() {
  return (
    <>
      <AuthProvider>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <Routes>
              {/* 로그인 필요 없는 페이지 */}
              <Route path="/" element={<Main />} />
              <Route path="/planning/:plannerId" element={<Planning />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/oauth/kakao" element={<KakaoRedirect />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/ktxInquiry" element={<KtxInquiry />} />
              <Route path="/tourlist" element={<TourList />} />
              <Route path="/tourItemInfo" element={<TourItemInfo />} />
              <Route path="/tourItemInfo/:id" element={<TourItemInfo />} />
              <Route path="/planninglist" element={<PlanningList />} />
              <Route path="/signup/terms" element={<TermsOfService />} />
              <Route path="/otheruser/:userId" element={<Otheruser />} />
              <Route path="/test" element={<Test />} />
              <Route path="/Admin" element={<AdminPage />} />

              {/* 로그인 필요한 페이지 */}
              <Route
                path="/makePlanning"
                element={
                  <ProtectedRoute>
                    <MakePlanning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mypage"
                element={
                  <ProtectedRoute>
                    <MyPageMain />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </DndProvider>
      </AuthProvider>
    </>
  );
}

export default App;
