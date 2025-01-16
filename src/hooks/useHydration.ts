import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/store/hooksStore';
import { loginUser } from '@/store/userSlice';
import { useEffect, useState } from 'react';

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const hydrateAuth = async () => {
    try {
      const currentUser = localStorage.getItem('user-token');

      if (!currentUser) return;

      const userResponse = await axiosInstance.get(`/users/${currentUser}`);

      dispatch(loginUser(userResponse.data));
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
