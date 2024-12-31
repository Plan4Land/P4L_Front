import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Planning } from "./Page/Planning/Planning";
import { Main } from "./Page/MainPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/planning" element={<Planning />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
