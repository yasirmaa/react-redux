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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/store/userSlice';
import { useAppDispatch } from '@/store/hooksStore';
import { useNavigate } from 'react-router-dom';

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterFromSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: 'min 3 characters' })
      .refine((username) => !/\s/.test(username), {
        message: 'Username must not contain spaces',
      }),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterFromSchema),
    reValidateMode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterForm) => {
    try {
      await dispatch(
        registerUser({
          username: values.username,
          email: values.email,
          password: values.password,
        })
      ).unwrap();
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert(error || 'Registration failed');
    }
  };

  return (
    <main className="px-4 container py-8 flex flex-col mx-auto justify-center items-center max-w-screen-md h-[80vh]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="w-full max-w-[540px]">
          <Card>
            <CardHeader>
              <CardTitle>Register!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <div className="relative">
                        <Input
                          placeholder="password"
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                        />
                        <Checkbox
                          onCheckedChange={(checked: boolean) => setShowPassword(Boolean(checked))}
                          className="absolute right-4 top-4 z-10 cursor-pointer text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl className="relative">
                      <div className="relative">
                        <Input
                          placeholder="confirm"
                          {...field}
                          type={showConfirm ? 'text' : 'password'}
                        ></Input>
                        <Checkbox
                          onCheckedChange={(checked: boolean) => setShowConfirm(Boolean(checked))}
                          className="absolute right-4 top-4 z-10 cursor-pointer text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <Button type="submit">Sign up</Button>
                <Button variant={'link'} className="w-full">
                  Sign in instead
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default RegisterPage;
