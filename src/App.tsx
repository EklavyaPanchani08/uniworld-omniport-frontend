import { Route, Routes } from "react-router-dom"
import Header from "./components/header"
import Home from "./pages/Home"
import Footer from "./components/footer"
import Product from "./pages/Product"
import Cart from "./pages/Cart"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </main>
      <Footer />
    </div>
  )
}
