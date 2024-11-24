import { CartItem } from '@/components/CartItem';
import { AuthedPage } from '@/components/guard/AuthedPage';
import { Separator } from '@/components/ui/separator';

const CartPage = () => {
  return (
    <AuthedPage>
      <div className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>

        <div className="mt-10">
          <Separator />

          <div className="grid grid-cols-12 gap-8 my-8">
            <div className="col-span-7 gap-6 flex flex-col">
              <CartItem
                name="Turquoise green t-shirt"
                price={100000}
                imageUrl="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/5/16/3707cd40-34db-4c21-9047-56a62d48abf4.jpg.webp?ect=4g"
              ></CartItem>
            </div>
          </div>
        </div>
      </div>
    </AuthedPage>
  );
};

export default CartPage;
