import { ProductCard } from '@/components/organisms/ProductCard';
import { ProductSkeleton } from '@/components/organisms/Skeleton';
import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
};

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/products');

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
          {isLoading ? (
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
