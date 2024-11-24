import React from 'react';
import { Button } from '../ui/button';
import { IoAdd, IoCart, IoPerson, IoPricetag } from 'react-icons/io5';
import { Link } from 'react-router-dom';

type AdminLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  return (
    <div className="flex">
      <aside className="w-72 border-r h-screen ">
        <div className="h-16 flex-col flex items-center justify-center border-b">
          <h1 className="font-semibold text-3xl">Admin Dashboard</h1>
        </div>
        <div className="flex flex-col space-y-0 py-4">
          <Link to={'/admin/products'}>
            <SidebarItem>
              <IoPricetag className="mr-2 h-6 w-6" />
              Products Management
            </SidebarItem>
          </Link>
          <SidebarItem>
            <IoCart className="mr-2 h-6 w-6" />
            Orders Management
          </SidebarItem>
        </div>
      </aside>

      <div className="flex-1">
        <header className="h-16 border-b w-full flex justify-end items-center px-8">
          <Button className="rounded-full" size={'icon'}>
            <IoPerson className="h-6 w-6"></IoPerson>
          </Button>
        </header>

        <main className="flex flex-col p-4">
          <div className="flex justify-between items-center pb-4 border-b mb-8">
            <div className="">
              <h1 className="font-bold tetx-4xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            {window.location.pathname === '/admin/products' && (
              <a href="/admin/products/create">
                <Button>
                  <IoAdd className="h-6 w-6 mr-2" />
                  Add Product
                </Button>
              </a>
            )}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button variant={'ghost'} size={'lg'} className="w-full rounded-none justify-start">
      {children}
    </Button>
  );
};
