import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Product } from '@/types/product-type';
import { ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { Link, useSearchParams } from 'react-router-dom';

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setUseSearchParams] = useSearchParams();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [seachProduct, setSearchProduct] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

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

  const handleDeleteProduct = async () => {
    console.log('oy');

    const shouldDelete = confirm('Are you sure you want to delete this product?');

    if (!shouldDelete) {
      return;
    }

    const promises = selectedProductIds.map((productId) => {
      return axiosInstance.delete(`/products/${productId}`);
    });

    try {
      await Promise.all(promises);
      alert('Products deleted');
      searchParams.set('page', '1');
      setUseSearchParams(searchParams);
      setSelectedProductIds([]);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectProduct = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedProductIds([...selectedProductIds, id]);
    } else {
      setSelectedProductIds(selectedProductIds.filter((productId) => productId !== id));
    }
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
    <AdminLayout
      title="Product Management"
      description="Manage your products"
      rightSection={
        <div className="flex gap-4">
          {selectedProductIds.length > 0 && (
            <Button onClick={handleDeleteProduct} variant={'destructive'}>
              <Trash className="w-6 h-6" />
              Delete {selectedProductIds.length} Products
            </Button>
          )}
          <a href="/admin/products/create">
            <Button>
              <IoAdd className="h-6 w-6 mr-2" />
              Add Product
            </Button>
          </a>
        </div>
      }
    >
      <div className="flex max-w-screen-sm mb-3 gap-2">
        <Input onChange={(e) => setSearchProduct(e.target.value)} placeholder="Seacrh..." />
        <Button onClick={handleSearchProduct}>Seach</Button>
      </div>
      <Table className="p-4 border rounded-sm">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
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
              <TableCell>
                <Checkbox
                  onCheckedChange={(checked: boolean) => handleSelectProduct(product.id, checked)}
                  checked={selectedProductIds.includes(product.id)}
                />
              </TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>Rp {product.price.toLocaleString('id-ID')}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Link to={'/admin/products/edit/' + product.id}>
                  <Button variant={'ghost'} size={'icon'}>
                    <Edit className="w-6 h-6" />
                  </Button>
                </Link>
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
