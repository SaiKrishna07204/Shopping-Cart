import React, { Fragment, useContext } from 'react'
import { ShoppingcartContext } from '../../context';

function CartTitle({singleCartItem}) {
    const {handleRemoveFromCart} = useContext(ShoppingcartContext);
    const {handleAddToCart} = useContext(ShoppingcartContext);
  return (
    <Fragment>
        <div className='grid grid-cols-3 items-start gap-5 '>
        <div className='col-span-2 flex item-start gap-4'>
            <div className='w-28  h-28 max-sm:w-20 shrink bg-gray-400 p-1 rounded-sm'>
                <img className='w-full h-full object-container' src={singleCartItem?.thumbnail} alt="" />
            </div>
            <div>
                <h3 className='text-base font-bold text-gray-900'>{singleCartItem?.title}</h3>
                <button className="text-sm px-4 py-3 bg-black text-white mt-5 fonta-extrabolder" onClick={()=> handleRemoveFromCart(singleCartItem,true)}>Remove</button>
            </div>
        </div>
        <div className='ml-auto'>
            <h3 className='text-lg font-bold text-gray-900'>${singleCartItem?.totalprice.toFixed(2)}</h3>
            <p className='mt-2 mb-3 font-bold text-[16px]'>Quantity : {singleCartItem?.quantity}</p>
        </div>
        <div className='mt-3 flex gap-3'>
        <button className='disabled:opacity-35 border border-[#000]' onClick={()=> handleRemoveFromCart(singleCartItem,false)} disabled={singleCartItem.quantity === 1}>-</button>
        <button onClick={() => handleAddToCart(singleCartItem)} className='border border-[#000]'>+</button>
        </div>
    </div>
    <hr className='border-gray-500'/>
    </Fragment>
  );
}
export default CartTitle;