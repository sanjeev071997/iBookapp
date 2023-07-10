import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ViewNodes = ({nodes}) => {
    const [show, setShow] = useState(false);
    // eslint-disable-next-line
    const [date, setDate] = useState([new Date(nodes?.createdAt).toLocaleDateString()]);
    // eslint-disable-next-line
    const [time, setTime] = useState([new Date(nodes?.createdAt).toLocaleTimeString()]);
    // eslint-disable-next-line
    const [category, setCategory] = useState([nodes?.category]);
    // eslint-disable-next-line
    const [title, setTitle] = useState([nodes?.title]);
    // eslint-disable-next-line
    const [description, setDescription] = useState([nodes?.description]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
        <span onClick={handleShow}>
                <i className="fa-regular fa-eye text-info me-3" data-mdb-toggle="tooltip" title='view' style={{ cursor: 'pointer' }}></i>
            </span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title >Your Nodes!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="form-label d-flex align-items-end justify-content-end">
                        <b className="badge"style={{  background:'#6f42c1 ', }} >{date} & {time}</b>
                    </h6>
                    <b><label htmlFor='Title' className="form-label d-flex align-items-start justify-content-start  text-dark">Category</label></b>
                    <p className="form-label text-start " style={{ color: '#d63384'}}><b>{category}</b></p>

                    <b><label htmlFor='Title' className="form-label d-flex align-items-start justify-content-start  text-dark">Title</label></b>
                    <p className="form-label text-start  text-dark">{title}</p>

                    <b><label htmlFor='Description' className="form-label d-flex align-items-start justify-content-start  text-dark">Description</label></b>
                    <p className="form-label text-start text-dark">{description}</p>
                </Modal.Body>
                <Modal.Footer className='bg-light'>
                    <Button variant="outline-danger" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
    </>
  )
}

export default ViewNodes