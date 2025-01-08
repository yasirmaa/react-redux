import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { Button } from '../ui/button';
import { IoCheckmark } from 'react-icons/io5';

type Product = {
  name: string;
  price: number;
  imageUrl: string;
};

export const CartItem = ({ imageUrl, name, price }: Product) => {
  return (
    <div className="flex gap-4">
      <div className="aspect-square w-full overflow-hidden rounded-md max-w-52">
        <img src={imageUrl} alt={name} className="w-full" />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex">
          <h3 className="font-bold">{name}</h3>
          <span className="ml-auto font-bold">Rp {price.toLocaleString('id-ID')}</span>
        </div>

        <div className="flex items-center gap-3">
          <Button>
            <IoIosRemove className="w-4 h-4"></IoIosRemove>
          </Button>
          <p className="text-lg font-bold">1</p>
          <Button>
            <IoIosAdd className="w-4 h-4"></IoIosAdd>
          </Button>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <IoCheckmark className="text-green-500 h-6 w-6"></IoCheckmark>
            <span>Available</span>
          </div>

          <Button className="text-destructive" variant={'link'}>
            Remove Item
          </Button>
        </div>
      </div>
    </div>
  );
};
