import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Container, Row, Tabs, Tab, Card } from 'react-bootstrap'
import AddNodes from './AddNodes'
import EditNodes from './EditNodes'
import ViewNodes from './ViewNodes'
import DeleteNodes from './DeleteNodes'
import '../../pages/styles/NodesHeader.css'
import axios from 'axios';
import { message } from 'antd';
import { API } from '../../api'

const NodesHeader = () => {
  const [nodes, setNodes] = useState([])
  // eslint-disable-next-line
  const [data, setData] = useState([])

  // Get all Nodes list
  const getNodes = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/nodes/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setNodes(res.data.data)
        setData(res.data.data)
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error)
      message.error('Something Went Wrong')
    }
  };

  useEffect(() => {
    getNodes();
  }, [])

  const handleSearch = async (event) => {
    let key = event.target.value
    if (key) {
      let res = await axios.get(`${API}/api/v1/nodes/search/${key}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setNodes(res.data.data)
      };
    } else {
      setData()
    }
  };

  return (
    <Layout>
      <Container className="container mt-5 data-table-nodes" style={{minHeight:'100vh'}}>
        <Row className='justify-content-center container'>
          <input className=" form-control w-100" type="search" placeholder="Search here..." aria-label="Search" onChange={handleSearch} />
          <Tabs className='mb-1 p-0 mt-4' justify variant='pills' defaultActiveKey="tab-1" >
            <Tab eventKey="tab-1" title="All">
              <div className='row mt-4 '>
                {nodes && nodes.length > 0 ? nodes.sort((a, b) => a.title > b.title ? 1 : -1)
                  .map((nodes) => {
                    let date = new Date(nodes["createdAt"])
                    return (
                      <div className="col-xs-12 col-sm-6 col-md-4 py-2" key={nodes._id}>
                        <Card>
                          <Card.Body>
                            <Card.Title className="nodesTitle">{nodes.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted nodesDate">{date.toLocaleDateString()} </Card.Subtitle>
                            <Card.Text className="nodesDes"> {nodes.description} </Card.Text>
                            <div className='text-end'>
                              <ViewNodes nodes={nodes} />
                              <EditNodes nodes={nodes} />
                              <DeleteNodes nodes={nodes} />
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    )
                  }) : <div>No available nodes!</div>}
              </div>
            </Tab>
            <Tab eventKey="tab-2" title="Important">
              <div className='row mt-4 '>
                {nodes && nodes.length > 0 ? nodes.sort((a, b) => a.title > b.title ? 1 : -1)
                  .map((nodes) => {
                    let date = new Date(nodes["createdAt"])
                    return (
                    <>
                      {nodes.category === "Important" && (
                        <div className="col-xs-12 col-sm-6 col-md-4 py-2">
                          <Card>
                            <Card.Body>
                              <Card.Title className="nodesTitle">{nodes.title} </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted nodesDate">{date.toLocaleDateString()} </Card.Subtitle>
                              <Card.Text className="nodesDes"> {nodes.description} </Card.Text>
                              <div className='text-end'>
                                <ViewNodes nodes={nodes} />
                                <EditNodes nodes={nodes} />
                                <DeleteNodes nodes={nodes} />
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </>
                 )}) : <div>No available important nodes!</div>}
              </div>
            </Tab>
            <Tab eventKey="tab-3" title="Business">
              <div className='row mt-4 '>
                {nodes && nodes.length > 0 ? nodes.sort((a, b) => a.title > b.title ? 1 : -1)
                  .map((nodes) => {
                    let date = new Date(nodes["createdAt"])
                    return (
                    <>
                      {nodes.category === "Business" && (
                        <div className="col-xs-12 col-sm-6 col-md-4 py-2">
                          <Card>
                            <Card.Body>
                              <Card.Title className="nodesTitle">{nodes.title} </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted nodesDate">{date.toLocaleDateString()} </Card.Subtitle>
                              <Card.Text className="nodesDes"> {nodes.description} </Card.Text>
                              <div className='text-end'>
                                <ViewNodes nodes={nodes} />
                                <EditNodes nodes={nodes} />
                                <DeleteNodes nodes={nodes} />
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </>
                 )}) : <div>No available business nodes!</div>}
              </div>
            </Tab>
            <Tab eventKey="tab-4" title="Social">
              <div className='row mt-4 '>
                {nodes && nodes.length > 0 ? nodes.sort((a, b) => a.title > b.title ? 1 : -1)
                  .map((nodes) => {
                    let date = new Date(nodes["createdAt"])
                    return (
                    <>
                      {nodes.category === "Social" && (
                        <div className="col-xs-12 col-sm-6 col-md-4 py-2">
                          <Card>
                            <Card.Body>
                              <Card.Title className="nodesTitle">{nodes.title} </Card.Title>
                              <Card.Subtitle className="mb-2 text-muted nodesDate">{date.toLocaleDateString()} </Card.Subtitle>
                              <Card.Text className="nodesDes"> {nodes.description} </Card.Text>
                              <div className='text-end'>
                                <ViewNodes nodes={nodes} />
                                <EditNodes nodes={nodes} />
                                <DeleteNodes nodes={nodes} />
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </>
                  )}) : <div>No available social nodes!</div> }
              </div>
            </Tab>
            <div title={<AddNodes />}></div>
          </Tabs>
        </Row>
      </Container>
    </Layout>
  )
}

export default NodesHeader