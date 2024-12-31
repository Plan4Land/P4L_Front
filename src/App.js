import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Planning } from "./Page/Planning/Planning";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/planning" element={<Planning />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
