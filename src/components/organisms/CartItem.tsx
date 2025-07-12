import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { Button } from '../ui/button';
import { IoCheckmark } from 'react-icons/io5';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import { deleteCartItem, fetchCartByUserId } from '@/store/cartSlice';

type CartProps = {
  cartId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export const CartItem = ({ cartId, imageUrl, name, price, quantity }: CartProps) => {
  const [quantityState, setQuantityState] = useState(quantity);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const handleRemoveItem = async () => {
    await dispatch(deleteCartItem(cartId));
    dispatch(fetchCartByUserId(user.id));
  };

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
          <Button onClick={() => setQuantityState(quantityState - 1)} disabled={quantityState <= 1}>
            <IoIosRemove className="w-4 h-4"></IoIosRemove>
          </Button>
          <p className="text-lg font-bold">{quantityState}</p>
          <Button onClick={() => setQuantityState(quantityState + 1)}>
            <IoIosAdd className="w-4 h-4"></IoIosAdd>
          </Button>
        </div>

        <div className="flex justify-between w-full">
          <div className="flex gap-2 items-center">
            <IoCheckmark className="text-green-500 h-6 w-6"></IoCheckmark>
            <span>Available</span>
          </div>

          <Button className="text-destructive" variant={'link'} onClick={handleRemoveItem}>
            Remove Item
          </Button>
        </div>
      </div>
    </div>
  );
};
