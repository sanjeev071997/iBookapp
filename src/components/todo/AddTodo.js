import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from "../../redux/features/alertSlice"
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom'
import { API } from '../../api'


const AddTodo = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");

    // add todo
    const handleTodo = async (e) => {
        const newTodo = {
            title,
            priority,
            username: user?.username,
            userId: user?._id,
        }
        e.preventDefault();
        try {
            dispatch(showLoading());
            const res = await axios.post(`${API}/api/v1/post/`,
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
        }
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>Add Todo</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title >Add Todo!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='needs-validation' onSubmit={handleTodo} >
                        <div className='form-group  mb-2'>
                            <label htmlFor='Priority' className=" form-label d-flex align-items-start justify-content-start  text-dark">Priority</label>
                            <select className="form-select" required aria-label="Default select example" onChange={(e) => setPriority(e.target.value)} >
                                <option selected>Select Todo Priority</option>
                                <option required value="High priority">High priority</option>
                                <option required value="Middle priority">Middle priority</option>
                                <option required value="Low priority">Low priority</option>
                            </select>
                        </div>
                        <div className='form-group was-validated  mb-2'>
                            <label htmlFor='Title' className=" form-label d-flex align-items-start justify-content-start  text-dark">Title</label>
                            <input
                                type='text'
                                name='title'
                                placeholder='title'
                                className="form-control"
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            
                        </div>
                        <Modal.Footer className='bg-light'>
                            <Button type="submit" variant="outline-secondary" > Add Todo </Button>
                            <Button variant="outline-danger" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddTodo