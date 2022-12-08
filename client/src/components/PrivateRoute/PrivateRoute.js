import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { isAuthenticated, token } = useSelector((state) => state.auth);

    const isLogin = isAuthenticated && token;

    return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
