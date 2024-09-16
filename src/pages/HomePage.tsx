import { ProductCard } from '@/components/ProductCard';
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
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    try {
      const response = await axiosInstance.get('/products');
      console.log(response.data);

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Become a trend-setter with us
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            FastCampus provides you with the finest clothings and ensure your confidence throughtout
            your days.
          </p>
        </div>

        {loading ? <p>Loading...</p> : <div className="grid grid-cols-2 gap-4">{ProductList}</div>}
      </main>
    </>
  );
};

export default HomePage;
