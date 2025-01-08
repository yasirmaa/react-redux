import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminPage = () => {
  const userSelector = useSelector((state: RootState) => state.user);
  if (!userSelector.role || userSelector.role !== 'admin') {
    return <Navigate to={'/'} />;
  }
  return <Outlet />;
};
