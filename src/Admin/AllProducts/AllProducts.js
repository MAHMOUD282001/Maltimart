import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { toast } from 'react-toastify'
import { Col, Container, Row } from 'reactstrap'
import UseGetData from '../../CustomHooks/UseGetData'
import { db } from '../../firebase.config'

function AllProducts() {
  
  const {data: productsData, loading} = UseGetData('products')
  
  console.log(productsData);
  
  const deleteProduct = async (id)=>{
    await deleteDoc(doc(db, 'products', id))
    toast.success("Product Deleted Successfully")
  }
  
  return (
    <section>
        <Container>
          <Row>
            <Col lg="12">
                <table className='table bordered text-center'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {
                      loading ? <h4 className='text-center py-5 fw-bold'>Loading...</h4> :productsData.map(item => (
                          <tr key={item.id}>
                            <td>
                              <img src={item.imgUrl} alt = {item.productName}/>
                            </td>
                            
                            <td>{item.productName}</td>
                            
                            <td>{item.category}</td>
                            
                            <td>{item.price}</td>
                            
                            <td><button onClick={()=> deleteProduct(item.id)} className='btn btn-danger'>Delete</button></td>
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

export default AllProducts