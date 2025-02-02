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
import GuestRoute from "./Util/GuestRoute";
import { TourItemInfo } from "./Page/Item/TourItemInfo";
import KakaoRedirect from "./Page/signup/LoginRedirect/KakaoLoginRedirect";
import GoogleRedirect from "./Page/signup/LoginRedirect/GoogleLoginRedirect";
import NaverRedirect from "./Page/signup/LoginRedirect/NaverLoginRedirect";
import { Otheruser } from "./Page/User/Otheruser";
import { AdminPage } from "./Page/Admin/AdminPage";
import ExpressBus from "./Page/Traffic/ExpressBus";
import IntercityBus from "./Page/Traffic/IntercityBus";
import AdminLogin from "./Page/Admin/AdminLogin";
import { Layout } from "./Component/GlobalComponent";
import TrafficMain from "./Page/Traffic/TrafficMain";

function App() {
  return (
    <>
      <AuthProvider>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <Routes>
              {/* Layout 적용되는 페이지 */}
              <Route element={<Layout />}>
                <Route path="/" element={<Main />} />
                <Route path="/planning/:plannerId" element={<Planning />} />
                <Route path="/ktxInquiry" element={<KtxInquiry />} />
                <Route path="/tourlist" element={<TourList />} />
                <Route path="/tourItemInfo" element={<TourItemInfo />} />
                <Route path="/tourItemInfo/:id" element={<TourItemInfo />} />
                <Route path="/planninglist" element={<PlanningList />} />
                <Route path="/otheruser/:userId" element={<Otheruser />} />
                <Route path="/test" element={<Test />} />
                <Route path="/ExpressBus" element={<ExpressBus />} />
                <Route path="/IntercityBus" element={<IntercityBus />} />
                <Route path="/traffic" element={<TrafficMain />} />
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

                <Route
                  path="/login"
                  element={
                    <GuestRoute>
                      <Login />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <GuestRoute>
                      <Signup />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/signup/terms"
                  element={
                    <GuestRoute>
                      <TermsOfService />
                    </GuestRoute>
                  }
                />
              </Route>
              <Route
                path="/login/oauth/kakao"
                element={
                  <GuestRoute>
                    <KakaoRedirect />
                  </GuestRoute>
                }
              />
              <Route
                path="/login/oauth/google"
                element={
                  <GuestRoute>
                    <GoogleRedirect />
                  </GuestRoute>
                }
              />
              <Route
                path="/login/oauth/naver"
                element={
                  <GuestRoute>
                    <NaverRedirect />
                  </GuestRoute>
                }
              />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/management" element={<AdminPage />} />
            </Routes>
          </Router>
        </DndProvider>
      </AuthProvider>
    </>
  );
}

export default App;
