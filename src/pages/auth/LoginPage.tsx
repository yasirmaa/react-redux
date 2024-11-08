import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { axiosInstance } from '@/lib/axios';
import { useDispatch } from 'react-redux';
import { GuestPage } from '@/components/guard/GuestPage';

type LoginForm = {
  email: string;
  password: string;
};

const loginFromSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFromSchema),
    reValidateMode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (values: LoginForm) => {
    const response = await axiosInstance.get('/users', {
      params: {
        email: values.email,
        password: values.password,
      },
    });
    if (!response.data.length) {
      alert('Invalid email or password');
      return;
    }
    alert('Login success');

    dispatch({
      type: 'USER_LOGIN',
      payload: {
        id: response.data[0].id,
        username: response.data[0].username,
        email: response.data[0].email,
      },
    });
    form.reset();
    window.localStorage.setItem('user-token', response.data[0].id);
  };

  return (
    <GuestPage>
      <main className="px-4 container py-8 flex flex-col mx-auto justify-center items-center max-w-screen-md h-[80vh]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-[540px]">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back!</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-password"
                    onCheckedChange={(checked) => setShowPassword(Boolean(checked))}
                  />
                  <Label htmlFor="show-password">Show Password</Label>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col space-y-4 w-full">
                  <Button type="submit">Sign in</Button>
                  <Button variant={'link'} className="w-full">
                    Sign Up instead
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};

export default LoginPage;
