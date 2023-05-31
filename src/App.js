import React from 'react';

import {
  BrowserRouter,
  Route, Routes
} from 'react-router-dom';

//styles
import './App.css';

//components
import { Header, Footer } from './components';

//pages
import { Home, Contact } from './pages';

function App() {

  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>

  );
}

export default App;
