import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Planning } from "./Page/Planning/Planning";
import { Main } from "./Page/MainPage";
import { MakePlanning } from "./Page/Planning/MakePlanning";
import { Login } from "./Page/signup/Login";
import { Signup } from "./Page/signup/Signup";
import MyPageMain from "./Page/Mypage/MyPageMain";
import KtxInquiry from "./Page/Traffic/KtxInquiry";
import { TourList } from "./Page/Item/TourList";
import { PlanningList } from "./Page/Item/PlanningList";
import { AuthProvider } from "./Context/AuthContext";
import TermsOfService from "./Page/signup/TermsOfService";

function App() {
  return (
    <>
      <AuthProvider>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/makePlanning" element={<MakePlanning />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mypage" element={<MyPageMain />} />
              <Route path="/ktxInquiry" element={<KtxInquiry />} />
              <Route path="/tourlist" element={<TourList />} />
              <Route path="/tourlist/:areaCode" element={<TourList />} />
              <Route path="/planninglist" element={<PlanningList />} />
              <Route
                path="/planninglist/:areaCode"
                element={<PlanningList />}
              />
              <Route path="/signup/terms" element={<TermsOfService />} />
            </Routes>
          </Router>
        </DndProvider>
      </AuthProvider>
    </>
  );
}

export default App;
