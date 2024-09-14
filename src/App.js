import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { Apply, Apply2 } from "./Components/ExtraPractice/Apply";
import { Registration } from "./Components/ExtraPractice/Registration";
import { Homes } from "./Components/ExtraPractice/Homes";

function App() {
  return (
    <div>
      {/* <Apply2 /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Apply />} />
          <Route path="/homes" element={<Homes />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
