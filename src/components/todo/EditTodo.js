import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import { message } from 'antd'
import { API } from '../../api'


const EditTodo = ({ todo }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [priority, setPriority] = useState(todo.priority);
    const [title, setTitle] = useState(todo.title);

    // Edit Todo
    const handleUpdate = async (e) => {
        const newTodo = {
            priority,
            title,
        }
        e.preventDefault();
        try {
            dispatch(showLoading());
            const res = await axios.put(`${API}/api/v1/post/${todo._id}`,
                newTodo,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
            };

        } catch (error) {
            dispatch(hideLoading());
            message.error('Something Went Wrong')
        }
    };

    // Complete Todo
    const handleDone = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const res = await axios.put(`${API}/api/v1/post/complete/${todo._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
            };

        } catch (error) {
            dispatch(hideLoading());
            message.error('Something Went Wrong')
        }
    };


    // Complete Undo
    const handleUndo = async (e) => {
        e.preventDefault();
        try {
            dispatch(showLoading());
            const res = await axios.put(`${API}/api/v1/post/undo/${todo._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
            };

        } catch (error) {
            dispatch(hideLoading());
            message.error('Something Went Wrong')
        }
    }

    return (
        <>
            {/* Complete Todo And Undo Todo */}
            {todo?.complete ? <span>
                <i className="fa-solid fa-circle-check text-success me-3" title='done' onClick={handleDone} style={{ cursor: 'pointer' }}></i>
            </span> : <span >
                <i className="fa-sharp fa-solid fa-rotate-left  me-3" title='undo' onClick={handleUndo} style={{ cursor: 'pointer', color: '#d63384' }}></i>
            </span>}

            {/* Edit Todo */}
            {todo?.complete ? <span variant="primary " onClick={handleShow}>
                <i className="fa-solid fa-square-pen me-3" title='edit' style={{ cursor: 'pointer', color: '#0d6efd' }}></i>
            </span> : <span></span>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title >Edit Todo!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='needs-validation' onSubmit={handleUpdate}  >
                        <div className='form-group was-validated  mb-2'>
                            <label htmlFor='Priority' required className=" form-label d-flex align-items-start justify-content-start  text-dark">Priority</label>
                            <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)} >
                                <option>High priority</option>
                                <option>Middle priority</option>
                                <option>Low priority</option>
                            </select>
                            <label htmlFor='Title' className=" form-label d-flex align-items-start justify-content-start  text-dark">Title</label>
                            <input
                                type='text'
                                name='title'
                                placeholder='title'
                                className="form-control"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <Modal.Footer className='bg-light'>
                            <Button type='submit' variant="outline-secondary">Edit Todo</Button>
                            <Button variant="outline-danger" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default EditTodo