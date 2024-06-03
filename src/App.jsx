import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './components/Shop/shop';
import CartPage from './components/Cart/cart';
import Main from './components/Home/home';
import "./App.css"
import AOS from "aos"
import "aos/dist/aos.css"

function App() {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    })
    AOS.refresh();
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
