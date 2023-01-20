import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import UseGetData from '../../CustomHooks/UseGetData'
import "./Dashboard.css"

function Dashboard() {
  
  const {data: productsData} = UseGetData('products')
  
  const {data: usersData} = UseGetData('users')
  
  
  
  
  return (
    <section>
      <Container>
        <Row>
          
          <Col lg = "6">
            <div className='products__box'>
              <h5>Total Products</h5>
              <span>{productsData.length}</span>
            </div>
          </Col>
          
          <Col lg = "6">
            <div className='users__box'>
              <h5>Total Users</h5>
              <span>{usersData.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Dashboard