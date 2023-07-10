import React, { useState } from 'react'
import './styles/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { message } from 'antd';
import { API } from '../api';

const initialValues = {
    email: '',
    password: '',
}
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, setLogin] = useState(initialValues);
    const onChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    const handelLogin = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${API}/api/v1/user/login`, login)
            dispatch(hideLoading());
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                message.success(res.data.message);
                navigate('/')
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error('Something Went Wrong')
        }
    }
    return (
        <>
            <div className='wrapper d-flex align-items-center justify-content-center w-100 h-100vh'>
                <div className='register'>
                    <h2 className='mb-3'>Please login!</h2>
                    <form className='needs-validation' onSubmit={handelLogin}>
                        <div className='form-group was-validated  mb-2'>
                            <label htmlFor='email' className="form-label">Email</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                className="form-control"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title='must be in the following order: characters@characters.com (characters followed by an @ sign, followed by more characters, and then a "." After the "." sign, add at least 2 letters from a to z:'
                                onChange={(e) => onChange(e)}
                            />
                            <div className='invalid-feedback'>
                                Please Enter Your Valid Email
                            </div>
                        </div>
                        <div className='form-group was-validated mb-2'>
                            <label htmlFor='password' className="form-label">Password</label>
                            <input
                                type='password'
                                name='password'
                                placeholder='Password'
                                className="form-control"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                onChange={(e) => onChange(e)}
                            />
                            <div className='invalid-feedback'>
                                Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                            </div>
                        </div>
                        <Link to='/forgot-password' className='authLink text-end d-flex justify-content-end mb-2'>Forgot Password?</Link>
                        <button type='submit' className='register-btn btn btn-success w-100 mb-2'> <b>Log In</b></button>
                    </form>
                    <Link to='/register' className='authLink  text-center'> Not a user Sign Up?</Link>
                </div>
            </div>
        </>


    )
}

export default Login