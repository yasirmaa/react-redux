import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/LoginPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ProductDetailpage from './pages/ProductDetailPage';
import { axiosInstance } from './lib/axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Commet } from 'react-loading-indicators';
import RegisterPage from './pages/auth/RegisterPage';
import ProductManagementPage from './pages/admin/ProductManagementPage';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  const hydrateAuth = async () => {
    try {
      const currentUser = localStorage.getItem('user-token');
      if (!currentUser) return;

      const userResponse = await axiosInstance.get(`/users/${currentUser}`);

      dispatch({
        type: 'USER_LOGIN',
        payload: {
          id: userResponse.data.id,
          email: userResponse.data.email,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    hydrateAuth();
  }, []);

  if (!isHydrated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Commet color="#030703" size="large" text="" textColor="" />
      </div>
    );
  }
  return (
    <>
      {!location.pathname.includes('/admin') && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" Component={ProductDetailpage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup" Component={RegisterPage} />
        <Route path="/admin/products" element={<ProductManagementPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!location.pathname.includes('/admin') && <Footer />}
    </>
  );
}

export default App;
