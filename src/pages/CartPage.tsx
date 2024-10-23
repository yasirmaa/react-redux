import { AuthedPage } from '@/components/guard/AuthedPage';

const CartPage = () => {
  return (
    <AuthedPage>
      <div className="flex h-full justify-center items-center">
        <h1>Cart Page</h1>
      </div>
    </AuthedPage>
  );
};

export default CartPage;
