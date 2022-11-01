import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

//component
import Landing from './page/LandingPage/Landing';
import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import Dashboard from './user/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import RoomsScreen from './page/RoomScreen/RoomScreen';
import DetailRoom from './page/DetailRoom/DetailRoom';
import Booking from './page/Booking/Booking';
import Navbar from './components/Navbar/Navbar';
import Nav from './components/Navbar/Nav';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Nav />
            <ToastContainer />
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/rooms" element={<RoomsScreen />} />
                <Route exact path="/room/:id" element={<DetailRoom />} />

                <Route exact path="/" element={<PrivateRoute />}>
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/roombook/:id/:fromdate/:todate" element={<Booking />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
