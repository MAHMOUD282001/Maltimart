import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

function ProductList({data}) {
  
  return (
    <>
        {data?.map((product, index) =>(
            <ProductCard product = {product} key = {index}/>
        ))}
    </>
  )
}

export default ProductList