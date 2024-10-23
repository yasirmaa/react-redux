import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { axiosInstance } from '@/lib/axios';
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setUseSearchParams] = useSearchParams();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [seachProduct, setSearchProduct] = useState('');

  const fetchProducts = async () => {
    try {
      // _limit sesuai dengan API JSON Server, bisa jadi beda di API lain
      // const response = await axiosInstance.get('/products?_limit=2');
      const response = await axiosInstance.get('/products', {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get('page')),
          name: searchParams.get('product'),
        },
      });
      setHasNextPage(Boolean(response.data.next));
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    searchParams.set('page', (Number(searchParams.get('page')) + 1).toString());
    setUseSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    searchParams.set('page', (Number(searchParams.get('page')) - 1).toString());
    setUseSearchParams(searchParams);
  };

  const handleSearchProduct = () => {
    searchParams.set('product', seachProduct);
    setUseSearchParams(searchParams);
  };

  useEffect(() => {
    if (!searchParams.get('page')) {
      searchParams.set('page', '1');
      setUseSearchParams(searchParams);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('page')) {
      fetchProducts();
    }
  }, [searchParams.get('page'), searchParams.get('product')]);

  return (
    <AdminLayout title="Product Management" description="Manage your products">
      <div className="flex max-w-screen-sm mb-3">
        <Input onChange={(e) => setSearchProduct(e.target.value)} placeholder="Seacrh..." />
        <Button onClick={handleSearchProduct}>Seach</Button>
      </div>
      <Table className="p-4 border rounded-sm">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>Rp {product.price.toLocaleString('id-ID')}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button variant={'ghost'} size={'icon'}>
                  <Ellipsis className="w-6 h-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={handlePrevPage}
              disabled={Number(searchParams.get('page')) == 1}
              variant={'ghost'}
            >
              <ChevronLeft className="w-6 h-6 mr 2" /> Previous
            </Button>
          </PaginationItem>

          <PaginationItem className="mx-8 font-semibold">
            Page {searchParams.get('page')}
          </PaginationItem>

          <PaginationItem>
            <Button disabled={!hasNextPage} onClick={handleNextPage} variant={'ghost'}>
              Next <ChevronRight className="w-6 h-6 mr 2" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </AdminLayout>
  );
};

export default ProductManagementPage;
