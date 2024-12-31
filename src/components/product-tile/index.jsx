import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ShoppingcartContext } from '../../context';

function ProductTile({singleProductTile}) {

    const navigate = useNavigate()

    const {handleAddToCart,cartItem} = useContext(ShoppingcartContext)

    function handleNavigateToProductDetailPage(getCurrentProductId){
        // console.log(getCurrentProductId,naigate);
        navigate(`/product-details/${getCurrentProductId}`)
    }

    return (
        <div className="relative group border border-cyan-700 p-6 cursor-pointer">
            <div className='overflow-hidden aspect-w-1 aspect-h-1'>
                <img src={singleProductTile?.thumbnail} alt={singleProductTile?.title}
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110" />
            </div>
            <div className='flex item-start justify-between mt-4 space-x-4'>
                <div className='text-gray-900 font-bold sm:text-sm text-xs md:text:base'>
                    <p className='w-[100px] overflow-hidden text-ellipsis whitespace-nowrap'>{singleProductTile?.title}</p>
                </div>
                <div className='text-right'>
                    <p className='text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]'>{singleProductTile?.price}</p>
                </div>
            </div>
            <button onClick={() => handleNavigateToProductDetailPage(singleProductTile?.id)} className='px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-boldtext-lg'>View Details</button>
            <button onClick={() => handleAddToCart(singleProductTile)} disabled={cartItem.findIndex((item) => item.id === singleProductTile.id) > -1} className='disabled:opacity-50 px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-boldtext-lg'>Add To Cart</button>
        </div>
    )
}

export default ProductTile;