import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import "./Cart.css"
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/CommonSection/CommonSection"
import { motion } from 'framer-motion'
import {cartActions} from "../../Redux/Slices/CartSlice"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Cart() {
  
  const cartItems = useSelector(state => state.cart.cartItems)
  
  const tatalAmount = useSelector(state=> state.cart.totalAmount)
  
  const dispatch = useDispatch()
  
  const deleteItem = (id)=>{
    dispatch(cartActions.deleteItem(id))
  }
  
  return (
    <Helmet title = "Cart">
      <CommonSection title = "Cart"/>
      
      <section>
        <Container>
          <Row>
            <Col lg="9">
              
              {
                cartItems.length === 0 ? <h2 className='fs-4 text-center'>No Items Added To Cart</h2>
                :
                <table className='table bordered text-center'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {cartItems.map((item, index)=>(
                      <tr key={index}>
                        <td>
                          <img src={item.imgUrl} alt = {item.productName}/>
                        </td>
                        
                        <td>{item.productName}</td>
                        
                        <td>{item.price}</td>
                        
                        <td>{item.quantity}</td>
                        
                        <motion.td whileTap={{scale : 1.2}} onClick = {()=>deleteItem(item.id)}><i className='ri-delete-bin-line'></i></motion.td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
            </Col>
            
            <Col lg = "3">
              <div className='d-flex align-items-center justify-content-between'>
                <h6>Subtotal</h6>
                <span className='fs-4 fw-bold'>${tatalAmount}</span>
              </div>
              
              <p className='mt-2 fs-6'>Taxes and Shipping Will Calculate In Checkout</p>
              
              <button className='buy__btn w-100 mt-4'><Link to='/shop'>Continue Shopping</Link></button>
              
              <button className='buy__btn w-100 mt-3'><Link to='/checkout'>Checkout</Link></button>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Cart