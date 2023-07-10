import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import { message } from 'antd'
import { API } from '../../api'

 

const EditNodes = ({nodes}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [category, setCategory] = useState(nodes?.category);
    const [title, setTitle] = useState(nodes?.title);
    const [description, setDescription] = useState(nodes?.description);

    const handleUpdate = async (e) => {
        const newNodes = {
            category,
            title,
            description,
        }
        e.preventDefault();
        try {
            dispatch(showLoading());
            const res = await axios.put(`${API}/api/v1/nodes/${nodes._id}`,
                newNodes,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/nodes')
            };

        } catch (error) {
            dispatch(hideLoading());
            message.error('Something Went Wrong')
        }
    }


    return (
        <>
            <span  onClick={handleShow}>
                <i className="fa-solid fa-square-pen me-3  me-3" title='edit' style={{ cursor: 'pointer', color: '#0d6efd'}}></i>
            </span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title >Edit Nodes!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='needs-validation' onSubmit={handleUpdate} >
                        <div className='form-group  mb-2'>
                            <label htmlFor='Category' className=" form-label d-flex align-items-start justify-content-start  text-dark">Category</label>
                            <select className="form-select" required aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option required value="All">All</option>
                                <option required value="Important">Important</option>
                                <option required value="Business">Business</option>
                                <option required value="Social">Social</option>
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
                                maxLength={50}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group was-validated mb-2">
                            <label htmlFor='Description' className="form-label d-flex align-items-start justify-content-start  text-dark">Description</label>
                            <textarea
                                name='description'
                                placeholder='description'
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <Modal.Footer className='bg-light'>
                            <Button type="submit" variant="outline-secondary"> Edit Node </Button>
                            <Button variant="outline-danger" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditNodes