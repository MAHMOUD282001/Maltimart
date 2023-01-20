import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Col, Container, Row } from 'reactstrap'
import Helmet from "../../components/Helmet/Helmet"
import CommonSection from "../../components/UI/CommonSection/CommonSection"
// import products from "../../assets/data/products"
import "./ProductDetails.css"
import { motion } from 'framer-motion'
import ProductList from '../../components/UI/ProductList/ProductList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../Redux/Slices/CartSlice'
import { toast } from 'react-toastify'
import { db } from "../../firebase.config"
import { doc, getDoc } from "firebase/firestore"
import UseGetData from '../../CustomHooks/UseGetData'

 

function ProductDetails() {
  
  const dispatch = useDispatch()
  
  const [product, setProduct] = useState({})
  
  let reviewUser = useRef('')
  
  let reviewMsg = useRef('')
  
  let [tab, setTab] = useState('desc')
  
  let [rating, setRating] = useState(null)
  
  const {id} = useParams()
  
  // const product = products.find(product => product.id === id)
  
  const {data: products} = UseGetData("products")
  
  const docRef = doc(db, 'products', id)
  
  useEffect(()=>{
    const getProduct = async ()=>{
      const docSnap = await getDoc(docRef)
      
      if(docSnap.exists()){
        setProduct(docSnap.data())
      }
      
      else{
        console.log("No Product!");
      }
    }
    
    getProduct()
  },[])
  
  const {imgUrl, productName, price, 
  // avgRating, reviews, 
  description, category, shortDesc} = product
  
  
  let relatedProducts = products.filter(item => item.category === category)
  
  const submitHandler = (e) =>{
    e.preventDefault()
    
    const reviewUserName = reviewUser.current.value
    
    const reviewUserMsg = reviewMsg.current.value
    
    const reviewObj = {
      userName : reviewUserName,
      text : reviewUserMsg,
      rating
    }
    
    console.log(reviewObj)
    
    toast.success("Review Submitted")
  }
  
  const addToCart = () =>{
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price
    }))
    
    toast.success("Product Added Successfully")
  }
  
  useEffect(()=>{
    window.scroll(0, 0)
  }, [product])
  
  return (
    <Helmet title={productName}>
      <CommonSection title={productName}/>
      
      
      <section className='pt-0'>
        <Container>
          <Row className=''>
            <Col lg = "6">
              <img src={imgUrl} alt = "Product"/>
            </Col>
            
            <Col lg = "6">
              <div className='product__details'>
                <h2>{productName}</h2>
                <div className='product__rating d-flex align-items-center gap-5 mb-3'>
                  <div>
                    <span>
                      <i className='ri-star-s-fill'></i>
                    </span>
                    
                    <span>
                      <i className='ri-star-s-fill'></i>
                    </span>
                    
                    <span>
                      <i className='ri-star-s-fill'></i>
                    </span>
                    
                    <span>
                      <i className='ri-star-s-fill'></i>
                    </span>
                    
                    <span>
                      <i className='ri-star-half-s-fill'></i>
                    </span>
                  </div>                
                  <p>
                      {/* (<span>{avgRating}</span>ratings)*/}
                      
                  </p>
                </div>
                
                <div className='d-flex align-items-center gap-5'>
                  <span className='product__price'>${price}</span>
                  
                  <span>Category: {category}</span>
                </div>
                
                <p className='mt-3'>{shortDesc}</p>
              
              <motion.button whileTap={{scale : 1.2}} className='buy__btn' onClick={addToCart}>Add To Cart</motion.button>
            </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section>
        <Container>
          <Row>
            <Col lg = "12">
              <div className='tab__wrapper d-flex align-items-center gap-5'>
                <h6 className= {`${tab === 'desc' ? 'active__tab' : ''}`} onClick = {()=> setTab('desc')}>Description</h6>
                <h6 className= {`${tab === 'rev' ? 'active__tab' : ''}`} onClick = {()=> setTab('rev')}>Reviews</h6>
              </div>
              
              {tab === 'desc' ? (
                <div className='tab__content mt-5'>{description}</div>
              )
              :
              <div className='product__review mt-5'>
                <div className='review__wrapper'>
                  {/* <ul>
                    {
                      reviews.map((review, index) => (
                        <li key={index} className = "mb-4">
                          <h6>John Doe</h6>
                          <span>{review.rating} (rating)</span>
                          <p>{review.text}</p>
                        </li>
                      ))
                    }
                  </ul> */}
                  
                  <div className='review__form'>
                    <h4>Leave Your Experiance</h4>
                    
                    <form onSubmit={submitHandler}>
                      <div className='form__group'>
                        <input type= "text" required placeholder='Enter Your Name' ref={reviewUser}/>
                      </div>
                      
                      <div className='form__group d-flex align-content-center gap-5 rating__group'>
                        <motion.span whileTap={{scale : 1.2}} onClick={()=>setRating(1)}>
                          1<i className='ri-star-s-fill'></i>
                        </motion.span>
                        
                        <motion.span whileTap={{scale : 1.2}} onClick={()=>setRating(2)}>
                          2<i className='ri-star-s-fill'></i>
                        </motion.span>
                        
                        <motion.span whileTap={{scale : 1.2}} onClick={()=>setRating(3)}>
                          3<i className='ri-star-s-fill'></i>
                        </motion.span>
                        
                        <motion.span whileTap={{scale : 1.2}} onClick={()=>setRating(4)}>
                          4<i className='ri-star-s-fill'></i>
                        </motion.span>
                        
                        <motion.span whileTap={{scale : 1.2}} onClick={()=>setRating(5)}>
                          5<i className='ri-star-s-fill'></i>
                        </motion.span>
                      </div>
                      
                      <div className='form__group'>
                        <textarea rows={4} type= "text" required placeholder='Review Message ...' ref={reviewMsg}/>
                      </div>
                      
                      <motion.button whileTap={{scale : 1.2}} className='buy__btn'>Submit</motion.button>
                    </form>
                  </div>
                </div>
              </div>
              }
            </Col>
            
            <Col lg = "12" className='mt-5'>
              <h2 className='related__title'>You Might Also Like</h2>
            </Col>
            
            <ProductList data = {relatedProducts}/>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails