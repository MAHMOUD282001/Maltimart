import React from 'react'
import { Col } from 'reactstrap'
import "./Product-card.css"
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../Redux/Slices/CartSlice'
import { ToastContainer, toast } from 'react-toastify';



function ProductCard({product}) {
  
  const dispatch = useDispatch()
  
  const addToCart = ()=>{
    dispatch(cartActions.addItem({
        id : product.id,
        productName : product.productName,
        imgUrl : product.imgUrl,
        price : product.price,
    }))
    
    toast.success("Product Added Successfully")
  }
  
  const navigate = useNavigate()
  
  const navigateToDetails = ()=>{
    navigate(`/shop/${product.id}`)
  }
  
  return (
    <Col lg = "3" md = "4" className='mb-2'>
        <div className='product__item'>
            <div className='product__img'>
                <motion.img whileHover={{scale: .9}} src={product.imgUrl} alt='Product Img' onClick={navigateToDetails}/>
            </div>
            
            <div className='p-2 product__info'>
                <h3 className='product__name'><Link to= {`/shop/${product.id}`}>{product.productName}</Link></h3>
                <span>{product.category}</span>
            </div>
            
            <div className='product__card-bottom d-flex align-items-center justify-content-between p-2'>
                <span className='price'>${product.price}</span>
                <motion.span whileTap={{scale: 1.2}} onClick = {addToCart}><i className='ri-add-line'></i></motion.span>
            </div>
        </div>
    </Col>
  )
}

export default ProductCard