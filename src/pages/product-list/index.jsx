import { useContext } from "react";
import { ShoppingcartContext } from "../../context";
import ProductTile from "../../components/product-tile";

function ProductListPage(){

    const {listOfProducts,loading} = useContext(ShoppingcartContext);
    console.log(listOfProducts);;
    
    // if(loading) return <h3>Product is Loading</h3>

    return (
        <>
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-md mx-auto text-center">
                        <h2 className="text-3xl font-light text-gray-950 sm:text-4xl">Our Company Products</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
                        {
                            listOfProducts && listOfProducts.length > 0 ?
                            listOfProducts.map(singleProductTile=> <ProductTile key={singleProductTile.id} singleProductTile={singleProductTile}/>) : 
                            // <h3>No Products Found</h3> 
                            null
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductListPage;