import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type AuthedPageProps = {
  children: React.ReactNode;
};

export const AuthedPage = (props: AuthedPageProps) => {
  const userSelector = useSelector((state: RootState) => state.user);
  if (!userSelector.id) {
    return <Navigate to={'/'} />;
  }
  return <>{props.children}</>;
};
