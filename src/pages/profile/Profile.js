import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { user } = useSelector(state => state.user)

    return (
        <>
            <span variant="primary" onClick={handleShow}>
                My Profile
            </span>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title >My Profile!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6><b>Name</b></h6>
                    <p>{user?.username}</p>
                    <h6><b>Email</b></h6>
                    <p>{user?.email}</p>
                    <h6><b>Joined On </b></h6>
                    <p>{new Date(user?.createdAt).toDateString()}</p>
                </Modal.Body>
                <Modal.Footer className='bg-light'>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Profile
