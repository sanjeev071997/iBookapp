import React, { useState } from 'react'
import Layout from '../components/Layout'
import './styles/Contact.css'
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { message } from 'antd';
import axios from 'axios';
import { API } from '../api';

const Contact = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
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
        userName: user.username,
        userEmail: user.email,
      }
      dispatch(showLoading())
      const res = await axios.post(`${API}/api/v1/user/contact`, newMsg, {
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

  }
  return (
    <Layout>
      <div className="container contact-container" style={{minHeight:'100vh'}}>
        <div className="row contact-row">
          <div className="col-md-7">
            <h4>Get in touch</h4>
            <form className='needs-validation' onSubmit={handleEmail}>
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
                className='register-btn btn btn-success 
              mb-3'> <b>Send Message</b>
              </button>
            </form>
          </div>

          <div className="col-md-5 ">
            <h4>Contact us</h4><hr />
            <div className="mt-4">
              <div className="d-flex">
                <i className="bi bi-geo-alt-fill"></i>
                <p ><i className="fa-solid fa-location-dot"></i> 03 Udaipurwati, jhunjhunu</p>
              </div><hr />
              <div className="d-flex">
                <i className="bi bi-telephone-fill"></i>
                <p><i class="fa-solid fa-phone-volume"></i> +91 7734904014</p>
              </div><hr />
              <div className="d-flex">
                <i className="bi bi-envelope-fill"></i>
                <p><i class="fa-solid fa-envelope"></i>officalsanjeevkumar@gmail.com</p>
              </div><hr />
              <div className="d-flex">
                <p><i className="fa-solid fa-earth-americas"></i>
                  <a href='http://sanjeevkumarsk.web.app/' target='_blank' rel="noreferrer">  website
                  </a></p>
              </div><hr />
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Contact