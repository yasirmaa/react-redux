import { CartItem } from '@/components/organisms/CartItem';
import { Separator } from '@/components/ui/separator';
import { selectCartByUserId } from '@/store/cartSlice';
import { useAppSelector } from '@/store/hooksStore';
import { Product } from '@/types/product-type';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';

const CartPage = () => {
  const userId = useAppSelector((state) => state.user.id);
  const cartItems = useAppSelector((state) => selectCartByUserId(state, userId));
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    console.log(cartItems);

    try {
      setLoading(true);
      setError(null);
      const productIds = cartItems.map((item) => item.productId);

      const productsResponse = await Promise.all(
        productIds.map((productId) =>
          axiosInstance.get<Product>(`/products/${productId}`).then((res) => res.data)
        )
      );
      setProducts(productsResponse);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, []);

  return (
    <div className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold">My Cart</h1>

      <div className="mt-10">
        <Separator />

        <div className="grid grid-cols-12 gap-8 my-8">
          <div className="col-span-7 gap-6 flex flex-col">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading &&
              !error &&
              products.map((product) => (
                <CartItem
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
