import React from 'react';

import {
  BrowserRouter,
  Route, Routes
} from 'react-router-dom';

//styles
import './App.scss';

//components

//pages
import { Home, Contact, Checkout, Cart } from './pages';

//layout
import { Header, Footer } from './layout'

function App() {

  return (
    <div className='w-full h-screen bg-[#212121] overflow-x-hidden'>
      <Header></Header>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />

          //Test
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

        </Routes>

      </BrowserRouter>
      <Footer className="bottom-0"></Footer>

    </div>

  );
}

export default App;
