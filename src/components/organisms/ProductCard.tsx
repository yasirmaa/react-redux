import { useState } from 'react';
import { Button } from '../ui/button';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product-type';

export const ProductCard = ({ id, name, price, stock, imageUrl }: Product) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {};

  return (
    <div className="p-4 border rounded-md md:max-w-80 flex flex-col gap-4">
      <Link to={'/product/' + id} className="aspect-square w-full overflow-hidden">
        <img className="w-full" src={imageUrl} alt="Product" />
      </Link>

      <Link to={'/product/' + id}>
        <p className="truncate">{name}</p>
        <p className="text-xl font-semibold">Rp {price.toLocaleString('id-ID')}</p>
        <p className="text-muted-foreground text-sm">In stock: {stock}</p>
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Button
            disabled={quantity <= 0}
            size={'icon'}
            variant={'ghost'}
            onClick={handleDecrement}
          >
            <IoIosRemove className="h-6 w-6" />
          </Button>

          <p className="text-lg font-semibold">{quantity}</p>

          <Button
            disabled={quantity >= stock}
            size={'icon'}
            variant={'ghost'}
            onClick={handleIncrement}
          >
            <IoIosAdd className="h-6 w-6" />
          </Button>
        </div>

        <Button disabled={!stock} className="w-full" onClick={addToCart}>
          {stock ? 'Add to cart' : 'Out of stock'}
        </Button>
      </div>
    </div>
  );
};
