import React, { useEffect } from 'react'
import { Navigate, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios'
import { setUser } from '../redux/features/userSlice';
import { API } from '../api'

const ProtectedRoute = ({ isAdmin, children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post(`${API}/api/v1/user/getUserData`,
        { token: localStorage.getItem('token') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      dispatch(hideLoading())
      if (res.data.success) {
        dispatch(setUser(res.data.data))
      } else {
        <Navigate to='/login' />
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear();
    };
  }
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  // Admin 
  if (isAdmin === true && user?.isAdmin !== true) {
    navigate('/login')
  } 
  
  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to='/login' />
  };

}

export default ProtectedRoute