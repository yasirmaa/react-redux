import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type Product = {
  id?: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
};

type ProductFormProps = {
  handleOnSubmit: (data: Product) => Promise<void>;
  cardTitle: string;
  product?: Product;
};

const productFormSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(80, 'Name must be at most 80 characters long'),
  price: z.coerce.number().min(1000, 'Price must be at least 1000'),
  stock: z.coerce.number().min(1, 'Stock must be at least 1'),
  imageUrl: z.string().url('Invalid URL format'),
});

export const ProductForm = ({ handleOnSubmit, cardTitle, product }: ProductFormProps) => {
  const form = useForm({
    defaultValues: {
      id: product?.id,
      name: product?.name || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      imageUrl: product?.imageUrl || '',
    },
    resolver: zodResolver(productFormSchema),
    reValidateMode: 'onChange',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="w-full max-w-screen-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-bol">{cardTitle}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="price" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="stock" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="image url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col space-y-4 w-full">
              <Button type="submit">Save</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
