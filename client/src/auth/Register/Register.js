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

    const registerHandler = async (username, password) => {
        try {
            const res = await postRegister({ username, password });

            const data = res.data;

            if (res.status !== 200) {
                throw new Error(data.message || 'Something went wrong');
            }

            if (data.success) {
                dispatch(authActions.register());
                toast.success(data.message);
                navigate('/login');
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return <RegisterForm onRegister={registerHandler} />;
};

export default Regiter;
