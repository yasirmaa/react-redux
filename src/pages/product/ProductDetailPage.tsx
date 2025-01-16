import { DetailProductSkeleton } from '@/components/organisms/Skeleton';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';
import { IoHeartOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
};

const ProductDetailpage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    stock: 0,
    imageUrl: '',
  });
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/products/${params.productId}`);
      console.log(response.data);

      setProduct(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto grid grid-cols-12 gap-8 items-center">
      {isLoading ? (
        <DetailProductSkeleton />
      ) : (
        <>
          <div className="col-start-2 col-span-5">
            <img src={product.imageUrl} alt="Foto Baju" className="w-full" />
          </div>
          <div className="col-span-6 space-y-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
            <p className="text-muted-foreground">
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
              <Button className="w-11/12">Add to Cart</Button>
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
