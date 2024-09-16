import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Components/ExtraPractice/Login";
import { Registration } from "./Components/ExtraPractice/Registration";
import { LoginSignup } from "./Components/LoginSignup/LoginSignup";
import { Home } from "./Components/ExtraPractice/Home";

function App() {
  return (
    <div>
      {/* <LoginSignup /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
