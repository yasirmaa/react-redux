import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Commet } from 'react-loading-indicators';

import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import CreateProductPage from './pages/admin/CreateProductPage';
import EditProductPage from './pages/admin/EditProductPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { axiosInstance } from './lib/axios';

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
      console.error(error);
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

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin">
          <Route index element={<ProductManagementPage />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="products/edit/:productId" element={<EditProductPage />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
