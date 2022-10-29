import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNav from "./components/TopNav";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
