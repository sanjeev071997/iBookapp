import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice'
import axios from 'axios';
import { message } from 'antd';
import { API } from '../../api';


const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const [password, setPassword] = useState([])
    const [confirmPassword, setConfirmPassword] = useState([])

    const handelSubmit = async(e) => {
        e.preventDefault();
        const token = params.token 
        const formData = {
            password,
            confirmPassword
        }
        
        try {
            dispatch(showLoading())
            const res = await axios.post(`${API}/api/v1/user/reset-password/${token}`,formData)
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/login')
              }else {
                message.error(res.data.message)
              }
        } catch (error) {
            dispatch(hideLoading());
            message.error('Something went wrong')
        }
    }
  return (
    <>
    <div className='wrapper  d-flex align-items-center justify-content-center w-100 h-100vh'>
            <div className='register'>
                <h2 className='mb-3'>Reset Password!</h2>
                <form className='needs-validation' onSubmit={handelSubmit}>
                    <div className='form-group was-validated mb-2'>
                        <label htmlFor='password' className="form-label">New Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='New Password'
                            className="form-control"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='invalid-feedback'>
                            Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                        </div>
                    </div>

                    <div className='form-group was-validated mb-2'>
                        <label htmlFor='confirmPassword' className="form-label">Confirm Password</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            className="form-control"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            
                        />
                        <div className='invalid-feedback'>
                            Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                        </div>
                    </div>
                    <button type='submit' className='register-btn btn btn-success w-100 mb-2 mt-2'><b>Reset Password</b> </button>
                </form>
                <Link to='/register' className='authLink  text-center'> Not a user Sign Up?</Link>
            </div>
        </div>
    </>
  )
}

export default ResetPassword