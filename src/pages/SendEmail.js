import React, { useState } from 'react';
import Layout from '../components/Layout'
import './styles/SendEmail.css'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { message } from 'antd';
import axios from 'axios';
import { API } from '../api';

const SendEmail = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [subject, setSubject] = useState([]);
    const [newMessage, setNewMessage] = useState([]);

    const handleEmail = async (e) => {
        e.preventDefault();
        try {
            const newMsg = {
                name,
                email,
                subject,
                newMessage,
            }
            dispatch(showLoading())
            const res = await axios.post(`${API}/api/v1/user/send-email`, newMsg, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error('Something Went Wrong')
        }
    };

    
    return (
        <Layout>
            <>
                <div className="container email-container" style={{minHeight:'100vh'}}>
                    <div className="row email-row">
                        <div className="col-md-12">
                            <h4>Send Email</h4>
                            <form className='needs-validation' onSubmit={handleEmail} >
                                <div className='mb-3'>
                                    <label htmlFor='text' className="form-label">Name</label>
                                    <input
                                        type='text'
                                        name='name'
                                        placeholder='Enter your name'
                                        className="form-control"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='email' className="form-label">Email</label>
                                    <input
                                        type='email'
                                        name='email'
                                        placeholder='Enter your email'
                                        className="form-control"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='text' className="form-label">Subject</label>
                                    <input
                                        type='text'
                                        name='subject'
                                        placeholder='Enter your subject'
                                        className="form-control"
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='text' className="form-label">Message</label>
                                    <textarea
                                        type='text'
                                        rows='3'
                                        name='message'
                                        placeholder='Message here...'
                                        className="form-control"
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='register-btn btn btn-success mb-3'>
                                    <b>Send Email</b>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>

        </Layout>

    )
}

export default SendEmail