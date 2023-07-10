import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import Profile from '../pages/profile/Profile';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { message } from 'antd';
import axios from 'axios';
import { API } from '../api';
import Footer from './Footer';
import { adminMenu, userMenu } from '../Data/NavbarMenu'

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)

  // Navbar Menu user and admin 
  
  const NavbarMenu = user?.isAdmin ? adminMenu : userMenu

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPassword, setShowPassword] = useState(false);

  const handleClosePassword = () => setShowPassword(false);
  const handleShowPassword = () => setShowPassword(true);

  const id = user?._id
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Edit Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profile = {
        username,
        email
      }
      dispatch(showLoading())
      const res = await axios.put(`${API}/api/v1/user/${id}`, profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        window.location.reload('/')
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error('Something Went Wrong')
    }
  }


  // logout User
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await axios.get(`${API}/api/v1/user/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        message.success('Login Successfully!');
        window.location.reload('/login')
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error('Something Went Wrong')
    }
  };

  // handle Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const updatePassword = {
        oldPassword,
        newPassword,
        confirmPassword
      }
      dispatch(showLoading())
      const res = await axios.put(`${API}/api/v1/user/change-password/${id}`, updatePassword, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message)
      } else (
        message.error(res.data.message)
      )
    } catch (error) {
      dispatch(hideLoading());
      message.error('Something Went Wrong')
    }
  }
  return (
    <>
      <nav className="container navbar navbar-expand-lg navbar">
        <div className="container-fluid ">
          <NavLink className="navbar-brand mb-2" to="/"  ><b>iBook App</b></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {NavbarMenu.map((menu) => {
                return (
                  <>
                    <li className="nav-item" key={menu.id}>
                      <NavLink className="nav-link tobNav" aria-current="page" to={menu.path}>{menu.name}</NavLink>
                    </li>
                  </>
                )
              })}

            </ul>
            <form className="d-inline-flex">
              <ul className='navbar-nav  mb-2 mb-lg-0 me-3'>
                <li className="nav-item dropdown">
                  <li className="nav-item dropdown">
                    <Link className="nav-link tobNav dropdown-toggle" href='#Profile' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {user?.username}
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item"> <Profile /> </Link></li>
                      <li>
                        <Link className="dropdown-item" >
                          <span variant="primary" onClick={handleShow}>
                            Edit Profile
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item">
                          <span variant="primary" onClick={handleShowPassword}>
                            Change Password
                          </span>
                        </Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item " aria-current="page" onClick={handleLogout}>Logout</Link></li>
                    </ul>
                  </li>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
      {/* Edit Profile */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className='bg-light'>
          <Modal.Title>Edit Profile!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form layout='vertical' className='needs-validation' onSubmit={handleSubmit}>
            <div className='form-group was-validated  mb-2'>
              <label htmlFor='text' className=" form-label d-flex align-items-start justify-content-start  text-dark">Name</label>
              <input
                type='text'
                name='username'
                placeholder='username'
                className="form-control"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group was-validated mb-2">
              <label htmlFor='email' className=" form-label d-flex align-items-start justify-content-start  text-dark">Email</label>
              <input
                type='email'
                name='email'
                placeholder='email'
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='invalid-feedback'>
                Please Enter Your Valid Email
              </div>
            </div>
            <div className="form-group was-validated mb-2">
              <label htmlFor='email' className=" form-label d-flex align-items-start justify-content-start  text-dark"><b>Joined On </b></label>
              <p>{new Date(user?.createdAt).toDateString()}</p>
            </div>
            <Modal.Footer className='bg-light'>
              <Button type='submit' variant="outline-secondary"> Update Profile </Button>
              <Button type='button' variant="outline-danger" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      {/* Change Password */}
      <Modal show={showPassword} onHide={handleClosePassword}>
        <Modal.Header closeButton className='bg-light'>
          <Modal.Title >Change Password!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='needs-validation' onSubmit={handleChangePassword}  >
            <div className='form-group was-validated  mb-2'>
              <label htmlFor='oldPassword' className=" form-label d-flex align-items-start justify-content-start  text-dark">Old Password</label>
              <input
                type='password'
                name='oldPassword'
                placeholder='Old Password'
                className="form-control"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group was-validated mb-2">
              <label htmlFor='newPassword' className=" form-label d-flex align-items-start justify-content-start  text-dark">New Password</label>
              <input
                type='password'
                name='newPassword'
                placeholder='New Password'
                className="form-control"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className='invalid-feedback'>
                Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
              </div>

            </div>

            <div className="form-group was-validated mb-2">
              <label htmlFor='confirmPassword' className=" form-label d-flex align-items-start justify-content-start  text-dark">Confirm Password</label>
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
            <Modal.Footer className='bg-light'>
              <Button type="submit" variant="outline-secondary"> Update Password</Button>
              <Button variant="outline-danger" onClick={handleClosePassword}>Close</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>

      </Modal>

      <div className='body'>{children}</div>

      <Footer />

    </>
  )
}

export default Layout