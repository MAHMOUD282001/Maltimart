import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import Helmet from '../../components/Helmet/Helmet'
import "./SignUp.css"
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.config'
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { storage } from '../../firebase.config'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import {toast} from "react-toastify"


function SignUp() {
  
  const [username, setUsername] = useState("")
  
  const [email, setEmail] = useState("")
  
  const [password, setPassword] = useState("")
  
  const [file, setFile] = useState("")
  
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  
  
  const signup = async (e)=>{
    e.preventDefault()
    
    setLoading(true)
    
    try{
      const userCarditional = await createUserWithEmailAndPassword(auth, email, password)
      
      const user = userCarditional.user
      
      console.log(user);
      
      const storageRef = ref(storage, `images/${Date.now() + username}`)
      
      const uploadTask = uploadBytesResumable(storageRef, file)
      
      uploadTask.on((error)=>{
        console.log(error.message)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadUrl)=>{
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadUrl,
          });
          
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadUrl,
          })
        })
      })
      
      setLoading(false)
      
      toast.success("Account Created")
      
      navigate("/login")
    }
    catch(error){
      setLoading(false)
      
      toast.error("Something Went Wrong")
    }
  }
  
  return (
    <Helmet title="Sign Up">
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
                  <h3 className='mb-4 fs-4 fw-bold'>Sign Up</h3>
                  
                  <Form className='auth__form' onSubmit={signup}>
                    
                    <FormGroup className='form__group'>
                      <input type= "text" placeholder='Enter Your User Name' value={username} onChange = {(e)=> setUsername(e.target.value)}/>
                    </FormGroup>
                    
                    <FormGroup className='form__group'>
                      <input type= "email" placeholder='Enter Your Email' value={email} onChange = {(e)=> setEmail(e.target.value)}/>
                    </FormGroup>
                    
                    <FormGroup className='form__group'>
                      <input type= "password" placeholder='Enter Your Password' value={password} onChange = {(e)=> setPassword(e.target.value)}/>
                    </FormGroup>
                    
                    <FormGroup className='form__group'>
                      <input type= "file" onChange = {(e)=> setFile(e.target.files[0])}/>
                    </FormGroup>
                    
                    <button type='submit' className='buy__btn auth__btn'>Create Account</button>
                    
                    <p>Already have an account? {" "} <Link to= "/login">Login</Link></p>
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

export default SignUp