import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { IoCart, IoHeart } from 'react-icons/io5';
import { Separator } from '../ui/separator';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import { logout } from '@/store/userSlice';
import { fetchCartByUserId, resetCart, selectAllCart } from '@/store/cartSlice';
import { useEffect } from 'react';

export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector(selectAllCart);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    dispatch(logout());
    dispatch(resetCart());
  };

  useEffect(() => {
    if (user.id) {
      dispatch(fetchCartByUserId(user.id));
    }
  }, [user.id]);

  return (
    <header className="sticky w-full border-b shadow-sm py-5 px-10 flex items-center justify-between ">
      <Link to={'/'}>
        <p className="text-2xl font-bold">Yamastore</p>
      </Link>

      <Input className="max-w-[600px]" placeholder="Search products..." />

      <div className="flex items-center gap-x-4 h-10">
        <div className="flex items-center gap-x-2">
          <Link to={'/cart'}>
            <Button className="relative" variant={'ghost'} size={'icon'}>
              <IoCart className="h-6 w-6"></IoCart>
              {user.id && cart.length >= 1 && (
                <span className="absolute bg-red-500 text-white font-semibold -top-1 -right-1 p-1 rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
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
