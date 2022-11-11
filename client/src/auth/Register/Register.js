import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import './Register.scss';

//import toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postRegister } from '../../services/apiServices';

const Regiter = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerHandler = async (userInfor) => {

        const { userName, name, email, phone, password } = userInfor;

        try {
            const res = await postRegister({
                username: userName,
                email: email,
                Name: name,
                phoneNumber: phone,
                password,
            });

            const data = res.data;

            if (res.status !== 200) {
                throw new Error(res.message || 'Something went wrong');
            }

            if (data.success) {
                dispatch(authActions.register());
                toast.success(data.message);
                navigate('/login');
            }
            else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="register-container">
            <header className="header">
                <span>Already have an account?</span>
                <button onClick={() => navigate('/login')}>Log in</button>
            </header>
            <RegisterForm onRegister={registerHandler} />
        </div>
    );
};

export default Regiter;
