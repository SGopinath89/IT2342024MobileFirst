import React from 'react'
import { useContext } from 'react'
import { ProductContext } from '../Context/ProductContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';

const Product = () => {

  const {all_products} = useContext(ProductContext);
  const {productId} = useParams();
  const product = all_products.find((e)=> e.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
    </div>
  )
}

export default Product