import React, { createContext } from "react";
import all_products from '../Components/Assets/sample data/all_products';

export const ProductContext = createContext(null);

const ProductContextProvider = (props) =>{
    
    const contextValue = {all_products};

    return (
        <ProductContext.Provider value={contextValue}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;