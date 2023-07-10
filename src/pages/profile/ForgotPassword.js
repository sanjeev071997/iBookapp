import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice'
import axios from 'axios';
import { message } from 'antd';
import { API } from '../../api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState([])

    const handelSubmit = async(e) => {
     e.preventDefault();
     try {
        const formData = {
            email,
        }
        dispatch(showLoading())
        const res = await axios.post(`${API}/api/v1/user/forgot-password`, formData )
        dispatch(hideLoading())
      
        if (res.data.success) {
            message.success(res.data.message)
            navigate('/login')
          }else {
            message.error(res.data.message)
          }
     } catch (error) {
        dispatch(hideLoading())
        message.error('Something went wrong')
     }
    }
  return (
    <>
    <div className='wrapper  d-flex align-items-center justify-content-center w-100 h-100vh'>
            <div className='register'>
                <h2 className='mb-3'>Forgot Password!</h2>
                <form className='needs-validation' onSubmit={handelSubmit}>
                    <div className='form-group was-validated  mb-2'>
                        <label htmlFor='email' className="form-label">Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='invalid-feedback'>
                            Please Enter Your Valid Email
                        </div>
                    </div>
                    <button type='submit' className='register-btn btn btn-success w-100 mb-2 mt-2'> <b>Send Email</b></button>
                </form>
                <Link to='/register' className='authLink  text-center'> Not a user Sign Up?</Link>
            </div>
        </div>
    </>
  )
}

export default ForgotPassword