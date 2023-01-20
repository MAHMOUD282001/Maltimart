import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import Helmet from '../../components/Helmet/Helmet'
import "./Login.css"
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'


function Login() {
  
  const [email, setEmail] = useState("")
  
  const [password, setPassword] = useState("")
  
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  
  
  const login = async (e)=>{
    e.preventDefault()
    
    setLoading(true)
    
    try{
      const userCarditional = await signInWithEmailAndPassword(auth, email, password)
      
      const user = userCarditional.user
      
      console.log(user);
      
      
      setLoading(false)
      
      toast.success("Successfully Logged in")
      
      navigate("/checkout")
    }
    catch(error){
      setLoading(false)
      
      toast.error(error.message)
    }
  }
  
  return (
    <Helmet title="Login">
    <section>
        <Container>
          <Row>
              {
              loading ? (
                <Col lg = "12" className='text-center'><h5 className='fw-bold'>Loading...</h5></Col>
              )
              :
              (
                <Col lg = "6" className='m-auto text-center'>
                  <h3 className='mb-4 fs-4 fw-bold'>Login</h3>
                  
                  <Form className='auth__form' onSubmit={login}>
                    
                    <FormGroup className='form__group'>
                      <input type= "email" placeholder='Enter Your Email' value={email} onChange = {(e)=> setEmail(e.target.value)}/>
                    </FormGroup>
                    
                    <FormGroup className='form__group'>
                      <input type= "password" placeholder='Enter Your Password' value={password} onChange = {(e)=> setPassword(e.target.value)}/>
                    </FormGroup>
                    
                    <button type='submit' className='buy__btn auth__btn'>Login</button>
                    
                    <p>Don't have an account? {" "} <Link to= "/signup">Create an account</Link></p>
                  </Form>
                </Col>
              )
              }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login