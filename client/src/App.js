import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNav from "./components/TopNav";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

//component
import Home from "./page/booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import RoomsScreen from "./page/RoomScreen/RoomScreen";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/rooms" element={<RoomsScreen />} />

        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
