import { Fragment } from "react"
import { Route, Routes } from "react-router-dom"
import ProductListPage from "./pages/product-list"
import ProductDetailsPage from "./pages/product-details"
import CartDetailsPage from "./pages/cart-details"


function App() {

  return (
    <Fragment>
      <Routes>
        <Route path="/product-list" element={<ProductListPage/>} />
        <Route path="/product-details/:id" element={<ProductDetailsPage/>} />
        <Route path="/cart-details" element={<CartDetailsPage/>} />
      </Routes>
    </Fragment>
  )
}

export default App
