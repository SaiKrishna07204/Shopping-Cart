import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingcartContext } from "../../context";

function ProductDetailsPage() {
    const { id } = useParams();
    const { productDetails, setProductDetails, loading, setLoading, handleAddToCart,cartItem } = useContext(ShoppingcartContext);
    const navigate = useNavigate();

    async function fetchProductDetails() {
        setLoading(true);  // Set loading to true when fetching begins
        const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
        const apiResult = await apiResponse.json();
        console.log(apiResult);

        if (apiResult) {
            setProductDetails(apiResult);
            setLoading(false);  // Set loading to false when fetching is done
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    // Conditional rendering for loading state
    if (loading) return <h3>Product Details loading</h3>;

    console.log(productDetails);

    return (
        <div>
            <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid item-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-lg p-6">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="px-4 py-10 rounded-xl shadow-lg relative">
                            <img className="w-4/5 rounded object-cover" src={productDetails?.thumbnail} alt={productDetails?.title} />
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                            {
                                productDetails?.images?.length ?
                                productDetails?.images.map((imageItem, index) => 
                                    <div className="rounded-xl p-4 shadow-md" key={index}>
                                        <img className="w-24 cursor-pointer" src={imageItem} alt="Product Secondary image" />
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className="lg:col-span-2"> 
                        <h2 className="text-2xl font-extrabold text-[#333333]">{productDetails?.title}</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <p className="text-sm font-bold">${productDetails?.price}</p>
                        </div>
                        <div>
                            <button onClick={() => handleAddToCart(productDetails)} 
                            disabled={
                                productDetails ?
                                cartItem.findIndex(item=>item.id === productDetails.id)>-1 : false}
                            className="disabled:opacity-35 mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
