import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const dispatch = useDispatch();

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
          username: userResponse.data.username,
          role: userResponse.data.role,
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

  return {
    isHydrated,
  };
};
