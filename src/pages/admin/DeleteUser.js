import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import { message } from 'antd'
import '../styles/DeleteTodo.css'
import { API } from '../../api'


const DeleteUser = ({ users }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    // eslint-disable-next-line 
    const [id, setId] = useState(users._id)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // admin delete user 
    const handleDelete = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.delete(`${API}/api/v1/admin/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error('Something Went Wrong')
        }
    }

    return (
        <>
            <span variant="primary" onClick={handleShow}>
                <i className="fas fa-trash-alt text-danger me-3" title='delete' style={{ cursor: 'pointer' }} ></i>
            </span>
            <Modal show={show} onHide={handleClose}>
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header flex-column">
                            <div className="icon-box">
                                <i className="material-icons">&#xE5CD;</i>
                            </div>
                            <h4 className="modal-title w-100">Are you sure?</h4>
                        </div>
                        <div className="modal-body">
                            <p>Do you really want to delete these records? This process cannot be undone.</p>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={handleClose} data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteUser