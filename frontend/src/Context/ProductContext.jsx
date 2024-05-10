import React, { createContext, useEffect, useState } from "react";
// import all_products from '../Components/Assets/sample data/all_products';

export const ProductContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ProductContextProvider = (props) =>{

    const [all_products, setAll_Products] = useState([]);

    const [cartItems,setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        let all_product_url = process.env.REACT_APP_ALL_PRODUCT_URL;
        fetch(all_product_url).then((resp)=>resp.json()).then((data)=>setAll_Products(data));

        if (localStorage.getItem('auth-token')) {
            const getcart_url = process.env.REACT_APP_GETCART_URL;
            fetch(getcart_url,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            }).then((resp)=>resp.json()).then((data)=>setCartItems(data));
        }
    },[])
    

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            const addtocart_url = process.env.REACT_APP_ADDTOCART_URL;
            fetch(addtocart_url, {
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            }).then((resp)=>resp.json()).then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
        if (localStorage.getItem('auth-token')) {
            let removefromcart_url = process.env.REACT_APP_REMOVEFROMCART_URL;

            fetch(removefromcart_url,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            }).then((resp)=>resp.json()).then((data)=>console.log(data));
        }
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