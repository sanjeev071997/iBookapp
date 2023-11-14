import React, { useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { API } from '../api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

const Chatgpt = () => {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("");
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)  
    axios.post(`${API}/api/v1/user/chatgpt`, { prompt })
      .then((res) => {
        setResponse(res.data);
        setLoading(false)    
      })
      .catch((error) => {
        setLoading(false)   
        console.log(error);
      });
    setPrompt("");
    setMsg(prompt);
  }


  return (
    <Layout>
      <div className='container mt-5' style={{ minHeight: '100vh' }}>
        <h4>Ask a question</h4>
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3" >
            <Form.Control
              placeholder="Ask a question"
              aria-label="Ask a question"
              aria-describedby="basic-addon2"
              value={prompt}
              onChange={(e) => { setPrompt(e.target.value) }}
              required
            />
            <Button variant="outline-secondary" type='submit' id="button-addon2">
              <i className="fa-solid fa-paper-plane"></i>
            </Button>
          </InputGroup>
        </form>
        <div className='container '>
          <p className="mt-2 "   >
            <b className='' style={{ backgroundColor: " rgba(245, 245, 245, 0.829)" }}>{msg  }</b>
          </p>
          {loading ? (
              <Spinner animation="border" variant="success" />
          ): (
            <p className="mt-2 " >
            <d className=" " style={{ backgroundColor: "rgba(245, 245, 245, 0.829)" }}>{response ? response : `Ask me anything... 
            I have limitations and won't always get it right, but your feedback will help me improve. Not sure where to start? You can try: `}</d>  
            </p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Chatgpt