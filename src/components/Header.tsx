import { Input } from './ui/input';
import { Button } from './ui/button';
import { IoCart, IoHeart } from 'react-icons/io5';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky w-full border-b shadow-sm py-5 px-10 flex items-center justify-between ">
      <p className="text-2xl font-bold">Yamadux</p>

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
          <Link to={'/login'}>
            <Button>Sign in</Button>
          </Link>
          <Link to={'/signup'}>
            <Button variant={'outline'}>Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
