import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import ProductDetailpage from './pages/product/ProductDetailPage';
import { GuestPage } from './components/guard/GuestPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import { AuthedPage } from './components/guard/AuthedPage';
import CartPage from './pages/product/CartPage';
import { AdminPage } from './components/guard/AdminPage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import CreateProductPage from './pages/admin/CreateProductPage';
import EditProductPage from './pages/admin/EditProductPage';

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
        path: 'product/:productId',
        element: <ProductDetailpage />,
      },
      {
        element: <GuestPage />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'signup',
            element: <RegisterPage />,
          },
        ],
      },
      {
        element: <AuthedPage />,
        children: [
          {
            path: 'cart',
            element: <CartPage />,
          },
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
            children: [
              {
                index: true,
                element: <ProductManagementPage />,
              },
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

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
