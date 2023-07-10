import React, { useState, useEffect } from 'react'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo';
import axios from 'axios';
import { message } from 'antd';
import DeleteTodo from './DeleteTodo';
import Layout from '../Layout';
import { API } from '../../api';
import Table from 'react-bootstrap/Table';

const TodoHeader = () => {
  const [todo, setTodo] = useState([])
  // eslint-disable-next-line
  const [data, setData] = useState([])

  // Get all todo list
  const getTodo = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/post/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setTodo(res.data.data)
        setData(res.data.data)
      }
    } catch (error) {
      message.error(error)
      message.error('Something Went Wrong')
    }
  };

  useEffect(() => {
    getTodo();
  }, [])

  // Search todo list
  const handleSearch = async (event) => {
    let key = event.target.value
    if (key) {
      let res = await axios.get(`${API}/api/v1/post/search/${key}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setTodo(res.data.data)
        setData(res.data.data)
      };
    } else {
      setData()
    }
  };

  return (
    <>
      <Layout >
        <div className='container mt-4'>
          <div className="card-footer text-end p-2"><AddTodo /> </div>
          <input className=" form-control me-2 mb-4" type="search" placeholder="Search here..." aria-label="Search" onChange={handleSearch} />
          <div className='container card-body data-table' data-mdb-perfect-scrollbar="true"  >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Todo</th>
                  <th>Priority</th>
                  <th className='todo-date'>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todo && todo.length > 0 ? todo.sort((a, b) => a.priority > b.priority ? 1 : -1).map((todo, index) => {
                  let date = new Date(todo["createdAt"])
                  return (
                    <>
                      <tr key={todo.index + 1}>
                        <th> <span>{index + 1}</span></th>
                        <th>
                          {todo.complete ? <span>{todo.title}</span> : <span style={{ textDecoration: 'line-through', fontWeight: '500' }}>{todo.title}</span>}
                        </th>

                        <td className=''>
                          {todo.priority === 'High priority' && (
                            <span className="badge bg-danger">{todo.priority}</span>
                          )}

                          {todo.priority === 'Middle priority' && (
                            <span className="badge " style={{ background: '#20c997', }}>{todo.priority}</span>
                          )}

                          {todo.priority === 'Low priority' && (
                            <span className="badge " style={{ background: '#6f42c1 ', }}>{todo.priority}</span>
                          )}
                        </td>
                        <td className="todo-date">
                          <b > {date.toLocaleDateString()}</b>
                        </td>

                        <td className="d-inline-flex w-100">
                          <EditTodo todo={todo} />
                          <DeleteTodo todo={todo} />
                        </td>
                      </tr>
                    </>
                  )
                }) : <div className='mt-4'><b>No todo!</b> </div>
                }
              </tbody>
            </Table>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default TodoHeader