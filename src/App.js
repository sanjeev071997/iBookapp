import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Spinner from './components/Spinner';
import Register from './pages/Register';
import Login from './pages/Login';
import TodoHeader from './components/todo/TodoHeader';
import NodesHeader from './components/nodes/NodesHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPassword from './pages/profile/ForgotPassword';
import ResetPassword from './pages/profile/ResetPassword';
import Error404 from './pages/Error404';
import Contact from './pages/Contact';
import SendEmail from './pages/SendEmail';
import Dashboard from './pages/admin/Dashboard';

const App = () => {

  const { loading } = useSelector(state => state.alerts)

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>

            <Route path='/'
              element={
                <ProtectedRoute>
                  <TodoHeader />
                </ProtectedRoute>
              } />

            <Route path='/nodes'
              element={
                <ProtectedRoute>
                  <NodesHeader />
                </ProtectedRoute>
              } />

            <Route path='/contact'
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />

            <Route path='/email'
              element={
                <ProtectedRoute>
                  <SendEmail />
                </ProtectedRoute>
              } />

            <Route path='/dashboard'
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              } />


            <Route path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />

            <Route path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />


            <Route path='/forgot-password'
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } />

            <Route path='/reset-password/:token'
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              } />

            <Route path='*'
              element={
                <Error404 />
              }
            />
          </Routes>
        )}
      </BrowserRouter>

    </>
  )
}

export default App
