import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from "../../redux/features/alertSlice"
import { message } from 'antd';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { API } from '../../api'


const AddNodes = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleNodes = async (e) => {
    
    const newNodes = {
        title,
        description,
        category,
        username: user?.username,
        userId: user?._id,
    }
    e.preventDefault();

    try {
        dispatch(showLoading());
        const res = await axios.post(`${API}/api/v1/nodes/`,
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
    <div variant="outline-primary" onClick={handleShow}>Add Nodes</div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title >Add Nodes!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='needs-validation' onSubmit={handleNodes} >
                        <div className='form-group was-validated mb-2'>
                            <label htmlFor='Category' className=" form-label d-flex align-items-start justify-content-start  text-dark">Category</label>
                            <select className="form-select" required aria-label="Default select example" onChange={(e) => setCategory(e.target.value)} >
                            <option required selected>Select Nodes Category</option>
                                <option value="All">All</option>
                                <option value="Important">Important</option>
                                <option value="Business">Business</option>
                                <option value="Social">Social</option>
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
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <Modal.Footer className='bg-light'>
                            <Button type="submit" variant="outline-secondary" > Add Node </Button>
                            <Button variant="outline-danger" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
    </>
  )
}

export default AddNodes