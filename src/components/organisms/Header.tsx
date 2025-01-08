import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { IoCart, IoHeart } from 'react-icons/io5';
import { Separator } from '../ui/separator';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import { logout } from '@/store/userSlice';

export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    dispatch(logout());
  };

  return (
    <header className="sticky w-full border-b shadow-sm py-5 px-10 flex items-center justify-between ">
      <Link to={'/'}>
        <p className="text-2xl font-bold">Yamastore</p>
      </Link>

      <Input className="max-w-[600px]" placeholder="Search products..." />

      <div className="flex items-center gap-x-4 h-10">
        <div className="flex items-center gap-x-2">
          <Link to={'/cart'}>
            <Button variant={'ghost'} size={'icon'}>
              <IoCart className="h-6 w-6" />
            </Button>
          </Link>
          <Link to={'/wishlist'}>
            <Button variant={'ghost'} size={'icon'}>
              <IoHeart className="h-6 w-6" />
            </Button>
          </Link>
        </div>
        <Separator className="h-full" orientation="vertical" />
        <div className="flex items-center gap-x-2">
          {user.id ? (
            <>
              <p>Halo {user.username}</p>
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
