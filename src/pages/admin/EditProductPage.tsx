import { ProductForm } from '@/components/forms/ProductForm';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Product = {
  id?: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
};

const EditProductPage = () => {
  const navigate = useNavigate();
  const productId = useParams().productId;
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    stock: 0,
    imageUrl: '',
  });

  const handleEditProduct = async (data: Product) => {
    console.log(data);
    try {
      await axiosInstance.patch(`/products/${data.id}`, data);
      alert('Product updated');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminLayout title="Edit Product" description="Editing product">
      {product.id ? (
        <ProductForm
          cardTitle={'Editing ' + product.name}
          handleOnSubmit={handleEditProduct}
          product={product}
        />
      ) : (
        <div>Loading...</div>
      )}
    </AdminLayout>
  );
};

export default EditProductPage;
