import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type GuestPageProps = {
  children: React.ReactNode;
};

export const GuestPage = (props: GuestPageProps) => {
  const userSelector = useSelector((state: RootState) => state.user);

  if (userSelector.id) {
    return <Navigate to="/" />;
  }
  return <>{props.children}</>;
};
