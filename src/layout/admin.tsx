import { LayoutProps } from '@/models';
import Link from 'next/link';
import React from 'react';

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <h1>AdminLayout</h1>
      <div>Sibebar</div>
      <br />

      <Link href="/">Home</Link>
      <br />
      <Link href="/abount">Abount</Link>

      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
