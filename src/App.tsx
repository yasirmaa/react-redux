import Header from './components/Header';
import Footer from './components/Footer';
import { ProductCard } from './components/ProductCard';

const ProductRaw = [
  {
    name: 'Dark blue t-shirt',
    price: 120000,
    stock: 5,
    imageUrl:
      'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/5/16/1c3f8ae1-46d3-4429-8aaf-f99b9dde923f.jpg.webp?ect=4g',
  },
  {
    name: 'Green t-shirt',
    price: 120000,
    stock: 0,
    imageUrl:
      'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/5/16/3707cd40-34db-4c21-9047-56a62d48abf4.jpg.webp?ect=4g',
  },
];

function App() {
  return (
    <>
      <Header />
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

        <div className="grid grid-cols-2 gap-4">
          {ProductRaw.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              price={product.price}
              stock={product.stock}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
