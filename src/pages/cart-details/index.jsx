import { useContext } from "react";
import { ShoppingcartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CartTitle from "../../components/cartTile";

function CartDetailsPage(){
    
    const {cartItem} = useContext(ShoppingcartContext);
    const navigate = useNavigate()


    return (
        <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
            <h1 className="text-2xl font-bold text-gray-800 text-center">My Cart Page</h1>
            <div className="grid md:grid-col-3 gap-8 mt-12">
                <div className="md:col-span-2 space-y-4">
                    {
                        cartItem?.length ? 
                        cartItem.map(singleCartItem=><CartTitle key={singleCartItem?.id} singleCartItem={singleCartItem}/>)
                        : <h1>No Items available in cart! Please Add Some Items</h1>
                    }
                </div>
                <div className="bg-gray-100 rounded-sm p-4 h-max">
                    <h3 className="text-xl font-extrabold text-gray-950 border-b border-gray-300 pb-2">OrderSummary</h3>
                    <ul className="text-gray-700 mt-4 space-y-2">
                        <p className="flex flex-wrap gap-4 text-sm font-bold">Total 
                            <span>${cartItem.reduce((acc,curr)=> acc+curr.totalPrice,0).toFixed(2)}</span>
                        </p>
                    </ul>
                    <div className="mt-5 flex gap-2">
                        <button className="text-sm px-4 py-3 bg-black text-white fonta-extrabolder">Checkout</button>
                        <button disabled={cartItem.length === 0 } onClick={()=>navigate("/product-list")} className="disabled:opacity-35 text-sm px-4 py-3 bg-black text-white fonta-extrabolder">Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDetailsPage;