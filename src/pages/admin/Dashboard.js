import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { API } from '../../api'
import axios from 'axios'
import { message } from 'antd'
import Table from 'react-bootstrap/Table';
import DeleteUser from './DeleteUser'
import { Chart } from "react-google-charts";

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [todo, setTodo] = useState([])
  const [contact, setContact] = useState([])
  const [nodes, setNodes] = useState([])
  // eslint-disable-next-line
  const [search, setSearch] = useState([])
  const [user, setUser] = useState([])

  const getUser = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/admin/all/data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setUsers(res.data.user)
        setUser(res.data.user)
        setSearch(res.data.user)
        setTodo(res.data.todo)
        setNodes(res.data.node)
        setContact(res.data.contact)
      }
    } catch (error) {
      message.error('Something Went Wrong')
    }
  };

  useEffect(() => {
    getUser();
  }, [])


  const handleSearch = async (event) => {
    let key = event.target.value
    if (key) {
      let res = await axios.get(`${API}/api/v1/admin/search/${key}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setUsers(res.data.data)
        setSearch(res.data.user)

      };
    } else {
      setSearch()
    }
  };

  // User Data Chart
  const data = [
    ["Task", "Hours per Day"],
    ["User", user?.length],
    ["Todo", todo?.length],
    ["Nodes", nodes?.length],
    ["Contact", contact?.length], // CSS-style declaration
  ];
  const options = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
  };


  return (
    <Layout>
      <div className='container mt-5'>
        <h4>Dashboard</h4>
        <div className="row mb-12">
          <div className="col-xl-3 col-sm-3 py-2 dashboard-top-card  ">
            <div className="card  ">
              <div className="card-body  ">
                <h3 style={{ fontWeight: 'bold' }}>Users </h3>
                <h4 style={{ fontSize: '40px' }}>{user?.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-3 py-2 dashboard-top-card">
            <div className="card   ">
              <div className="card-body ">
                <h3 style={{ fontWeight: 'bold' }}>Todo</h3>
                <h4 style={{ fontSize: '40px' }}>{todo?.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-3 py-2 dashboard-top-card  ">
            <div className="card  ">
              <div className="card-body  ">
                <h3 style={{ fontWeight: 'bold' }}>Nodes </h3>
                <h4 style={{ fontSize: '40px' }}>{nodes?.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-3 py-2 dashboard-top-card">
            <div className="card  ">
              <div className="card-body ">
                <h3 style={{ fontWeight: 'bold' }}>Contact</h3>
                <h4 style={{ fontSize: '40px' }}>{contact?.length}</h4>
              </div>
            </div>
          </div>
        </div>
        <h4 className="mt-5">Users Data Chart</h4>
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
          style={{ cursor: "pointer" }}
        />
        <h4 className="">All Users List</h4>
        <input className="form-control me-2 mt-4" type="search" placeholder="Search here..." aria-label="Search" onChange={handleSearch} />
        <div className='container mt-4 card-body data-table' data-mdb-perfect-scrollbar="true"  >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users && users.length > 0 ? users?.map((users, index) => {
                  let date = new Date(users["createdAt"])
                  return (
                    <>
                      <tr>
                        <th><span>{index + 1}</span></th>
                        <td> {users.username} </td>
                        <td> {users.email} </td>
                        <td>
                          {users.isAdmin ? <span className="badge bg-info text-dark" >Admin</span> : <span className="badge bg-success">User</span>}
                        </td>
                        <td>{date.toLocaleDateString()} </td>
                        <td>
                          <DeleteUser users={users} />
                        </td>
                      </tr>
                    </>
                  )
                }) : <p className=''> <b>No available users!</b> </p>
              }
            </tbody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard