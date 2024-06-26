import React, { useContext } from 'react'
import './CartItems.css'
import { ProductContext } from '../../Context/ProductContext'
import remove_icon from '../Assets/icons/cart_cross_icon.png'
import Swal from 'sweetalert2'

const CartItems = () => {

    const {all_products, cartItems, removeFromCart, getTotalCartAmount, getTotalCartItems} = useContext(ProductContext);

    const handleClick = ()=>{

        const totalItems = getTotalCartItems();

        if (totalItems > 0) {
            Swal.fire({
                title: "Order sent!",
                text: "You will contact through the email you provided.",
                icon: "success"
              }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace("/");
                }
              });
        }
        else{
            Swal.fire({
                title: "Cart is empty!",
                text: "Please add atleast one product to place an order.",
                icon: "warning"
              }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace("/");
                }
              });
        }
    }

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_products.map((e)=>{
            if(cartItems[e.id]>0){
                return <div>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price*cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} alt="" onClick={()=>{removeFromCart(e.id)}} />
                            </div>
                            <hr />
                        </div>
            }
            return null;
        })}

        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                    <button onClick={handleClick}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems