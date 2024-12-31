//create context
//provide the state to context
//wrap context in the root component
//consume the context using useContext

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingcartContext = createContext(null)

function ShoppingcartProvider({children}){

    const [loading,setLoading] = useState(true);
    const [listOfProducts,setListOfProducts] = useState([]);
    const [productDetails,setProductDetails] = useState(null);
    const [cartItem, setCartItem] = useState([]);

    const navigate = useNavigate();

    async function fetchListOfProducts() {
        const apiResponse = await fetch('https://dummyjson.com/products');
        const apiResult = await apiResponse.json();

        console.log(apiResult);

        if(apiResult && apiResult?.products){
            setListOfProducts(apiResult.products);
            setLoading(false);
        }
    }

    function handleAddToCart(getProductDetails){
        // console.log(getProductDetails);
        let copyExistingcartItem = [...cartItem];
        const findIndexOfCurrentItem = copyExistingcartItem.findIndex(cartItem=> cartItem.id === getProductDetails.id);
        
        console.log(findIndexOfCurrentItem);
        
        if(findIndexOfCurrentItem === -1){
            copyExistingcartItem.push({
                ...getProductDetails,
                quantity : 1,
                totalprice : getProductDetails?.price
            })
        }else{
            // console.log("its is Coming Here");
            copyExistingcartItem[findIndexOfCurrentItem] = {
                ...copyExistingcartItem[findIndexOfCurrentItem],
                quantity: copyExistingcartItem[findIndexOfCurrentItem].quantity + 1,
                totalprice: (copyExistingcartItem[findIndexOfCurrentItem].quantity + 1) * copyExistingcartItem[findIndexOfCurrentItem].price,
            }
            
        }

        console.log(copyExistingcartItem,"copyExistingCartItem");
        setCartItem(copyExistingcartItem);
        localStorage.setItem('cartItem', JSON.stringify(copyExistingcartItem));
        navigate("/cart-details")
        
    }

    useEffect(()=>{
        fetchListOfProducts();
        setCartItem(JSON.parse(localStorage.getItem('cartItem') || []))
    },[])

    // console.log(setListOfProducts);
    console.log(cartItem);
    
    function handleRemoveFromCart(getProductDetails,isFullyRemoveFromCart){
        let copyExistingCartItem = [...cartItem];
        const findIndexOfCurrentCartItem = copyExistingCartItem.findIndex(item=>item.id === getProductDetails.id )

        if(isFullyRemoveFromCart){
            copyExistingCartItem.splice(findIndexOfCurrentCartItem,1);
        }else{
            copyExistingCartItem[findIndexOfCurrentCartItem]={
                ...copyExistingCartItem[findIndexOfCurrentCartItem],
                quantity : copyExistingCartItem[findIndexOfCurrentCartItem].quantity -1,
                totalPrice : (copyExistingCartItem[findIndexOfCurrentCartItem].quantity-1)*copyExistingCartItem[findIndexOfCurrentCartItem].price,
            };
        }
        localStorage.setItem('cartItem',JSON.stringify(copyExistingCartItem));
        setCartItem(copyExistingCartItem);
    }

    return(
        <>
            <ShoppingcartContext.Provider value={{listOfProducts,loading,setLoading,productDetails,setProductDetails,handleAddToCart,cartItem,handleRemoveFromCart}}>{children}</ShoppingcartContext.Provider>
        </>
    );
}

export default ShoppingcartProvider;