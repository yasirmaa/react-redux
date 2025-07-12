import { DetailProductSkeleton } from '@/components/organisms/Skeleton';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooksStore';
import { selectProductById, selectProductStatus } from '@/store/productSlice';
import { useState } from 'react';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { IoHeartOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const ProductDetailpage = () => {
  const params = useParams();
  const product = useAppSelector((state) => selectProductById(state, params.productId!));
  const status = useAppSelector(selectProductStatus);
  const [quantity, setQuantity] = useState(0);

  if (product === undefined) {
    return (
      <main className="min-h-screen max-w-screen-lg mx-auto grid grid-cols-12 gap-8 items-center">
        <h1 className="text-4xl font-bold col-span-12 text-center">Product not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto grid grid-cols-12 gap-8 items-center">
      {status === 'loading' ? (
        <DetailProductSkeleton />
      ) : (
        <>
          <div className="col-start-2 col-span-5">
            <img src={product.imageUrl} alt="Foto Baju" className="w-full" />
          </div>
          <div className="col-span-6 space-y-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit obcaecati placeat
              commodi ea, blanditiis qui sint voluptates, provident soluta enim nisi nulla excepturi
              ipsum, harum reiciendis sunt ratione assumenda cumque!
            </p>
            <p className="text-xl">Stock: {product.stock}</p>
            <div className="flex items-center justify-between w-1/2">
              <Button size={'icon'} variant={'ghost'}>
                <IoIosRemove className="h-6 w-6" />
              </Button>

              <p className="text-lg font-semibold">{quantity}</p>

              <Button size={'icon'} variant={'ghost'} onClick={() => setQuantity(quantity + 1)}>
                <IoIosAdd className="h-6 w-6" />
              </Button>
            </div>
            <div className="w-full flex">
              <Button disabled={product.stock <= 0} className="w-11/12">
                Add to Cart
              </Button>
              <Button variant={'ghost'} size={'icon'} className="w-1/12">
                <IoHeartOutline className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default ProductDetailpage;
