import { Input } from './ui/input';
import { Button } from './ui/button';
import { IoCart, IoHeart } from 'react-icons/io5';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const Header = () => {
  const userSelector = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    dispatch({
      type: 'USER_LOGOUT',
    });
  };
  return (
    <header className="sticky w-full border-b shadow-sm py-5 px-10 flex items-center justify-between ">
      <Link to={'/'}>
        <p className="text-2xl font-bold">Yamastore</p>
      </Link>

      <Input className="max-w-[600px]" placeholder="Search products..." />

      <div className="flex items-center gap-x-4 h-10">
        <div className="flex items-center gap-x-2">
          <Button variant={'ghost'} size={'icon'}>
            <IoCart className="h-6 w-6" />
          </Button>
          <Button variant={'ghost'} size={'icon'}>
            <IoHeart className="h-6 w-6" />
          </Button>
        </div>
        <Separator className="h-full" orientation="vertical" />
        <div className="flex items-center gap-x-2">
          {userSelector.id ? (
            <>
              <p>Halo {userSelector.username}</p>
              <Button onClick={handleLogout} variant={'destructive'}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to={'/login'}>
                <Button>Sign in</Button>
              </Link>
              <Link to={'/signup'}>
                <Button variant={'outline'}>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
