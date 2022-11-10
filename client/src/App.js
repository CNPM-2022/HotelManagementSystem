import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

//component
import Home from './page/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './page/UserProfile/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import RoomsScreen from './page/RoomScreen/RoomScreen';
import DetailRoom from './page/DetailRoom/DetailRoom';
import Booking from './page/Booking/Booking';
import NotFound from './components/NotFound/NotFound';
import DefaultLayout from './layouts/DefaultLayout';
import Admin from './page/Admin/Admin';
import AdminDashBoard from './page/Admin/Content/DashBoard';
import ManageUser from './page/Admin/Content/User/ManageUser';

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                >
                    <Route exact path="/rooms" element={<RoomsScreen />} />
                    <Route exact path="/room/:id" element={<DetailRoom />} />
                </Route>

                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />

                <Route exact path="/" element={<PrivateRoute />}>
                    <Route exact path="/dashboard" element={<Dashboard />} />
                    <Route exact path="/roombook/:id/:fromdate/:todate" element={<Booking />} />

                    <Route exact path="/admins" element={<Admin />}>
                        <Route index element={<AdminDashBoard />} />
                        <Route path="/admins/manage-users" element={<ManageUser />} />
                    </Route>
                </Route>

                <Route exact path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
