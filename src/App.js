import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Planning } from "./Page/Planning/Planning";
import { Main } from "./Page/MainPage";
import { MakePlanning } from "./Page/Planning/MakePlanning";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/makePlanning" element={<MakePlanning />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
