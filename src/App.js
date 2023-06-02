import React from 'react';

import {
  BrowserRouter,
  Route, Routes
} from 'react-router-dom';

//styles
import './App.scss';

//components
import { Header, Footer } from './components';

//pages
import { Home, Contact, Checkout, Cart } from './pages';


function App() {

  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />

          //Test
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </>

  );
}

export default App;
