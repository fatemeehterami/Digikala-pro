import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/footer'
import Header from './components/header/header'
import Home from './pages/home'
import ProductsPage from './pages/productsPage'
import './App.css'
import DetailPage from './pages/details';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<ProductsPage />} />
        <Route path="/product/details/:id" element={<DetailPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
