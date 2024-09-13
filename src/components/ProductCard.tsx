import { useState } from 'react';
import { Button } from './ui/button';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';

export const ProductCard = ({
  name,
  price,
  stock,
  imageUrl,
}: {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}) => {
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
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <div className="aspect-square w-full overflow-hidden">
        <img className="w-full" src={imageUrl} alt="Product" />
      </div>

      <div>
        <p>{name}</p>
        <p className="text-xl font-semibold">Rp {price.toLocaleString('id-ID')}</p>
        <p className="text-muted-foreground text-sm">In stock: {stock}</p>
      </div>

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
