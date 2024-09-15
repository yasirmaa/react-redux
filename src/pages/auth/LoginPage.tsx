import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log({ email, password });
  };

  return (
    <main className="px-4 container py-8 flex flex-col mx-auto justify-center items-center max-w-screen-md h-[80vh]">
      <Card className="w-full max-w-[540px]">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="">
            <Label htmlFor="password">Password</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
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
            <Button onClick={handleLogin}>Sign in</Button>
            <Button variant={'link'} className="w-full">
              Sign Up instead
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
