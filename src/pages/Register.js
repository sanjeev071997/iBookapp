import React, { useState } from 'react'
import './styles/Register.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { message } from 'antd';
import { API } from '../api';

const initialValues = {
    username: '',
    email: '',
    password: '',
}

const Register = () => {
    const dispatch = useDispatch();
    const [signup, setSignup] = useState(initialValues);
    const onChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const handelRegister = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`${API}/api/v1/user/register`, signup)
            dispatch(hideLoading());
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                message.success(res.data.message);
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
            <div className='register '>
                <h2 className='mb-3'>Please sign up!</h2>
                <form className='needs-validation' onSubmit={handelRegister} >
                    <div className='form-group was-validated mb-2'>
                        <label htmlFor='username' className="form-label">Username</label>
                        <input
                            name='username'
                            type='username'
                            placeholder='Username'
                            className="form-control"
                            onChange={(e) => onChange(e)}
                        />
                        <div className='invalid-feedback'>
                            Please Enter Your Username
                        </div>
                    </div>
                    <div className='form-group was-validated  mb-2'>
                        <label htmlFor='email' className="form-label">Email</label>
                        <input
                            name='email'
                            type='email'
                            placeholder='Email'
                            className="form-control"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title='must be in the following order: characters@characters.com (characters followed by an @ sign, followed by more characters, and then a "." After the "." sign, add at least 2 letters from a to z:'
                            onChange={(e) => onChange(e)}
                        />
                        <div className='invalid-feedback' style={{ cursor: 'pointer' }}>
                        Please Enter Your Valid Email
                        </div>
                    </div>
                    <div className='form-group was-validated mb-2'>
                        <label htmlFor='password' className="form-label">Password</label>
                        <input
                            name='password'
                            type='password'
                            placeholder='Password'
                            className="form-control mb-2"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            onChange={(e) => onChange(e)}
                        />
                        <div className='invalid-feedback'>
                        Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters
                        </div>
                    </div>
                    <button type='submit' className='register-btn  btn btn-success w-100  mt-2 mb-2'> <b>Sign Up </b></button>
                </form>
                <Link to='/login' className='authLink text-center'>Do you have an account?</Link>
            </div>
        </div>
    
        </>
        
    )
}

export default Register