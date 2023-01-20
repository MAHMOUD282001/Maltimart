import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
// import products from '../../assets/data/products'
import Helmet from '../../components/Helmet/Helmet'
import CommonSection from '../../components/UI/CommonSection/CommonSection'
import ProductList from '../../components/UI/ProductList/ProductList'
import UseGetData from '../../CustomHooks/UseGetData'
import "./Shop.css"

function Shop() {
  
  const {data: products, loading} = UseGetData("products")
  
  let [productsData, setProductsData] = useState([])
  
  useEffect(()=>{
    setProductsData(products)
    console.log(productsData)
  },[products])
  
  const handleFilter = (e) =>{
    const filterValue = e.target.value
    
    if(filterValue === 'sofa'){
      const filteredProducts = products.filter(item => item.category === 'sofa')
      
      setProductsData(filteredProducts)
    }
    
    if(filterValue === 'mobile'){
      const filteredProducts = products.filter(item => item.category === 'mobile')
      
      setProductsData(filteredProducts)
    }
    
    if(filterValue === 'chair'){
      const filteredProducts = products.filter(item => item.category === 'chair')
      
      setProductsData(filteredProducts)
    }
    
    if(filterValue === 'watch'){
      const filteredProducts = products.filter(item => item.category === 'watch')
      
      setProductsData(filteredProducts)
    }
    
    if(filterValue === 'wireless'){
      const filteredProducts = products.filter(item => item.category === 'wireless')
      
      setProductsData(filteredProducts)
    }
    
    if(filterValue === 'all'){
      const filteredProducts = products
      
      setProductsData(filteredProducts)
    }
    
  }
  
  const handleSearch = (e)=>{
    const searchTerm = e.target.value
    
    const searchedProductsName = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    
    setProductsData(searchedProductsName)
  }
  
  
  
  const sortAndFilter=(e)=>{
    const sortTerm = e.target.value
    
    console.log(sortTerm)
    
    if(sortTerm === 'descending'){
      let sortedProducts = productsData.sort((a,b)=> a.price - b.price)
      
      sortedProducts = sortedProducts.filter(product => product)
      
      setProductsData(sortedProducts)
      
    }
    
    if(sortTerm === 'ascending'){
      let sortedProducts = productsData.sort((a,b)=> a.price - b.price).reverse()
      
      sortedProducts = sortedProducts.filter(product => product)
      
      setProductsData(sortedProducts)
      
    }
  }
  
  
  
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      
      <section>
        <Container>
          <Row>
            <Col md = "6" lg = "3" sm = "12">
              <div className='filter__widget'>
                <select onChange={handleFilter}>
                  <option value="all">All Products</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            
            <Col md = "6" lg = "3" sm = "12">
              <div className='filter__widget'>
                <select onChange={sortAndFilter}>
                  <option>Sort By</option>
                  <option value="descending">Descending</option>
                  <option value="ascending">Ascending</option>
                </select>
              </div>
            </Col>
            
            <Col md = "12" lg = "6">
              <div className='search__box'>
                <input type= "text" placeholder='Search By Name...' onChange={handleSearch}/>
                <span>
                  <i className='ri-search-line'></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className='pt-0'>
        <Container>
          <Row>
            {
              productsData.length === 0 ? (<h1 className='text-center fs-4'>No Products Are Found</h1>) : <ProductList data={productsData} />
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Shop