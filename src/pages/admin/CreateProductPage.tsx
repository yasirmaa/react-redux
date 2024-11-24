import { ProductForm } from '@/components/forms/ProductForm';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { axiosInstance } from '@/lib/axios';
import { useNavigate } from 'react-router-dom';

type ProductForm = {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
};

const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleCreateProduct = async (data: ProductForm) => {
    try {
      await axiosInstance.post('/products', data);
      alert('Product created');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout title="Create Product" description="Add new products">
      <ProductForm cardTitle="Add New Product" handleOnSubmit={handleCreateProduct}></ProductForm>
    </AdminLayout>
  );
};

export default CreateProductPage;
