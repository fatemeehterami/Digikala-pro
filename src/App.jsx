import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/footer/footer'
import Header from './components/header/header'
import Home from './pages/home'
import ProductsPage from './pages/productsPage'
import './App.css'
import DetailPage from './pages/details';
import Login from './components/account/login';
import VerifyPage from './components/account/verifyCode';

function App() {
  const location = useLocation();
  const hideLayoutRoutes = ['/user/login/','/user/verify'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<ProductsPage />} />
        <Route path="/product/details/:id" element={<DetailPage />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/verify" element={<VerifyPage />} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
