import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { toast } from 'react-toastify'
import { Col, Container, Row } from 'reactstrap'
import UseGetData from '../../CustomHooks/UseGetData'
import { db } from '../../firebase.config'

function Users() {
  
  const {data: usersData, loading} = UseGetData("users")
  
  const deleteUser = async (id)=>{
    await deleteDoc(doc(db, 'users', id))
    toast.success("User Deleted Successfully")
  }
  
  return (
    <section>
        <Container>
          <Row>
            <Col lg="12">
                <h4 className='fw-bold'>Users</h4>
            </Col>
            <Col lg="12" className='pt-5'>
                <table className='table bordered text-center'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {
                      loading ? <h4 className='text-center py-5 fw-bold'>Loading...</h4> : usersData.map(user => (
                          <tr key={user.uid}>
                            <td>
                              <img src={user.photoURL} alt = {user.displayName}/>
                            </td>
                            
                            <td>{user.displayName}</td>
                            
                            <td>{user.email}</td>
                            
                            <td><button onClick={()=> deleteUser(user.uid)} className='btn btn-danger'>Delete</button></td>
                          </tr>
                      ))
                    }
                  </tbody>
                </table>
            </Col>
          </Row>
        </Container>
      </section>
  )
}

export default Users