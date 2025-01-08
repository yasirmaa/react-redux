import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const GuestPage = () => {
  const userSelector = useSelector((state: RootState) => state.user);

  console.log(userSelector);

  if (userSelector.id) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
