import RootLayout from '@/components/layouts/RootLayout';
import CartPage from '@/pages/CartPage';
import HomePage from '@/pages/HomePage';
import ProductDetailpage from '@/pages/ProductDetailPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import { AdminPage } from '@/components/guard/AdminPage';
import ProductManagementPage from '@/pages/admin/ProductManagementPage';
import CreateProductPage from '@/pages/admin/CreateProductPage';
import EditProductPage from '@/pages/admin/EditProductPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { GuestPage } from '@/components/guard/GuestPage';

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: 'product/:productId',
          element: <ProductDetailpage />,
        },
        {
          element: <GuestPage />,
          children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'signup', element: <RegisterPage /> },
          ],
        },
        {
          path: 'admin',
          element: <AdminPage />,
          children: [
            {
              index: true,
              element: <ProductManagementPage />,
            },
            {
              path: 'products',
              element: <ProductManagementPage />,
              children: [
                {
                  path: 'create',
                  element: <CreateProductPage />,
                },
                {
                  path: 'edit/:productId',
                  element: <EditProductPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterComponent;
