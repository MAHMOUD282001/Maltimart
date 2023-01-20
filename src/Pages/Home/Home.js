import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import "./Home.css"
import Helmet from '../../components/Helmet/Helmet'
import heroImg from "../../assets/images/hero-img.png"
import { Link } from 'react-router-dom'
import Services from '../../components/Services/Services'
import ProductList from '../../components/UI/ProductList/ProductList'
// import products from "../../assets/data/products"
import counterImg from "../../assets/images/counter-timer-img.png"
import Clock from '../../components/UI/ProductList/Clock'
import UseGetData from "../../CustomHooks/UseGetData"


function Home() {
  
  const {data: products, loading} = UseGetData("products")
  
  let year = new Date().getFullYear();
  
  let [trendingProducts, setTrendingProducts] = useState([])
  
  let [bestSalesProducts, setBestSalesProducts] = useState([])
  
  let [mobileProducts, setMobileProducts] = useState([])
  
  let [wirelessProducts, setWirelessProducts] = useState([])
  
  let [popularProducts, setPopularProducts] = useState([])
  
  
  
  
  useEffect(()=>{
    let filteredTrendingProducts = products.filter((item) => item.category === 'chair')
    
    let filteredBestSalesProducts = products.filter((item) => item.category === 'sofa')
    
    let filteredMobileProducts = products.filter((item) => item.category === 'mobile')
    
    let filteredWirelessProducts = products.filter((item) => item.category === 'wireless')
    
    let filteredPopularProducts = products.filter((item) => item.category === 'watch')
    
    
    setTrendingProducts(filteredTrendingProducts)
    
    setBestSalesProducts(filteredBestSalesProducts.sort((a,b)=> a.productName > b.productName ? 1 : -1))
    
    setMobileProducts(filteredMobileProducts)
    
    setWirelessProducts(filteredWirelessProducts)
    
    setPopularProducts(filteredPopularProducts)
    
  },[products])
  
  console.log(bestSalesProducts)
  
  return (
    <Helmet title = "Home">
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg = "6" md = "6">
              <div className='hero__content'>
                <p className='hero__subtitle'>Trending Product In {year}</p>
                
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                
                <p>lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit</p>
                
                <motion.button whileTap={{scale : 1.2}} className='buy__btn'><Link to= "/shop">SHOP NOW</Link></motion.button>
              </div>
            </Col>
            
            <Col lg = "6" md = "6">
              <div className='hero__img'>
                <img src={heroImg} alt = "Hero Img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      <Services/>
      
      {/* Trending Products */}
      
      <section className='trending__products'>
        <Container>
          <Row>
            <Col lg = "12" className='text-center mb-5'>
              <h2 className='section__title'>Trending Products</h2>
            </Col>
            
            {
              loading ? <h5 className='text-center fw-bold'>Loading</h5> : <ProductList data = {trendingProducts}/>
            }
            
          </Row>
        </Container>
      </section>
      
      
      {/* Best Sales */}
      
      <section className='best__sales'>
        <Container>
          <Row>
            <Col lg = "12" className='text-center mb-5'>
              <h2 className='section__title'>Best Sales Products</h2>
            </Col>
            
            {
              loading ? <h5 className='text-center fw-bold'>Loading</h5> : <ProductList data = {bestSalesProducts}/>
            }
            
          </Row>
        </Container>
      </section>
      
      
      {/* Counter */}
      
      <section className='timer__count'>
        <Container>
          <Row> 
            <Col lg = "6" md = "12" className='count__down-col'>
              <div className='clock__top-content'>
                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                <h4 className='text-white fs-6 mb-3'>Quality Arm Chair</h4>
              </div>
              <Clock/>
              
              <motion.button whileTap={{scale: 1.2}} className='buy__btn store__btn'>
                <Link to= "/shop">Visit Store</Link>
              </motion.button>
            </Col>
            
            <Col lg = "6" md = "12" className='text-end counter__img'>
              <img src={counterImg} alt='timer count'/>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* New Arrival */}
      
      <section className='new__arrivals'>
        <Container>
          <Row>
            <Col lg = "12" className='text-center mb-5'>
              <h2 className='section__title'>New Arrivals</h2>
            </Col>
            
            {
              loading ? <h5 className='text-center fw-bold'>Loading</h5> : <ProductList data = {mobileProducts}/>
            }
            
            
            {
              loading ? <h5 className='text-center fw-bold'>Loading</h5> : <ProductList data = {wirelessProducts}/>
            }
            
          </Row>
        </Container>
      </section>
      
      
      {/* Popular in Category */}
      
      <section className='popular__category'>
        <Container>
          <Row>
            <Col lg = "12" className='text-center mb-5'>
              <h2 className='section__title'>Popular in Category</h2>
            </Col>
            
            {
              loading ? <h5 className='text-center fw-bold'>Loading</h5> : <ProductList data = {popularProducts}/>
            }
            
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home