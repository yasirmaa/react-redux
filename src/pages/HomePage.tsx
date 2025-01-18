import { ProductCard } from '@/components/organisms/ProductCard';
import { ProductSkeleton } from '@/components/organisms/Skeleton';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import {
  fetchProducts,
  selectAllProducts,
  selectProductError,
  selectProductStatus,
} from '@/store/productSlice';
import { useEffect } from 'react';

const HomePage = () => {
  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductStatus);
  const error = useAppSelector(selectProductError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const ProductList = products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      stock={product.stock}
      imageUrl={product.imageUrl}
    />
  ));

  if (status === 'failed') {
    return (
      <main className="min-h-screen max-w-screen-lg mx-auto grid grid-cols-12 gap-8 items-center">
        <h1 className="text-4xl font-bold col-span-12 text-center">An error occured: {error}</h1>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-[80vh] max-w-screen-lg mx-auto px-4 my-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Become a trend-setter with us
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Yamastore provides you with the finest clothings and ensure your confidence throughtout
            your days.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {status === 'loading' ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : (
            <>{ProductList}</>
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
