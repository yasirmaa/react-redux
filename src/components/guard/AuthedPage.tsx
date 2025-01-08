import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthedPage = () => {
  const userSelector = useSelector((state: RootState) => state.user);

  if (!userSelector.id) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};
