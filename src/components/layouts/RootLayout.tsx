import { Outlet } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { Commet } from 'react-loading-indicators';
import { useHydration } from '@/hooks/useHydration';

const RootLayout = () => {
  const { isHydrated } = useHydration();

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
