import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';
import { postLogin } from '../../services/apiServices';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginHandler = async (username, password) => {
        try {
            const options = {
                username,
                password,
            };

            const res = await postLogin(options);
            const data = res.data;

            if (res && data && data.success === true) {
                localStorage.setItem('user', JSON.stringify(data.user));
                dispatch(
                    authActions.login({
                        token: data.accessToken,
                        user: data.user,
                    }),
                );
                navigate('/');
                toast.success(data.message);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="login-container">
            <header className="header">
                <span>Don't have an account yet?</span>
                <button className="btn-signup" onClick={() => navigate('/register')}>
                    Sign up
                </button>
            </header>
            <LoginForm onLogin={loginHandler} />
        </div>
    );
};

export default Login;
