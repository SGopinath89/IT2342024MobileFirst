import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ProductContext } from '../../Context/ProductContext';

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ProductContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-image">
                <img src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">
                    ${product.old_price}
                </div>
                <div className="productdisplay-right-price-new">
                    ${product.new_price}
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>Add to cart</button>
        </div>
    </div>
  )
}

export default ProductDisplay