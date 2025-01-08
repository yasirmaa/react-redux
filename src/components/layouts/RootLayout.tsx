import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { Commet } from 'react-loading-indicators';
import { useDispatch } from 'react-redux';

const RootLayout = () => {
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
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
