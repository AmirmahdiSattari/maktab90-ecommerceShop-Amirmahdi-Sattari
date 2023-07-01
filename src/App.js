import { BrowserRouter, Route, Routes } from "react-router-dom";
// Pages
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
// Components
import { Header, Footer } from "./components";
import ProductDetails from './components/product/productDetails/ProductDetails';
import ProductCategory from './components/product/productCategory/ProductCategory';
import ProductOrder from './components/product/productOrder/ProductOrder';
import CartForm from './pages/cart/cartForm/CartForm';
import Payment from './components/payment/Payment';

function App() {


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/categories/:categoryName" element={<ProductCategory />} />
          <Route path="/cart/" element={<ProductOrder />} />
          <Route path="/cart/contact-info" element={<CartForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin/*" element={<Admin />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
