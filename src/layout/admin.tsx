import { Auth, Button } from '@/components';
import { useAuth } from '@/hooks';
import { LayoutProps } from '@/models';
import Link from 'next/link';
import React from 'react';

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const { profile, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Auth>
      <h1 className="text-2xl">AdminLayout</h1>
      <div className="flex justify-between">
        <div>
          Profile: <b>{profile?.username}</b>
        </div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <br />

      <Link href="/">Home</Link>
      <br />
      <Link href="/abount">Abount</Link>

      <div>{children}</div>
    </Auth>
  );
};

export default AdminLayout;
