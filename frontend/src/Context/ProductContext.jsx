import React, { createContext, useState } from "react";
import all_products from '../Components/Assets/sample data/all_products';

export const ProductContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_products.length+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ProductContextProvider = (props) =>{

    const [cartItems,setCartItems] = useState(getDefaultCart());
    

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}));
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_products.find((product)=>product.id===Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = ()=>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item];
            }
        }

        return totalItem;
    }

    const contextValue = {all_products, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};

    return (
        <ProductContext.Provider value={contextValue}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;