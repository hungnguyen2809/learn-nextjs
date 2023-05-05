import { LayoutProps } from '@/models';
import Link from 'next/link';
import React, { useEffect } from 'react';

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    console.log('mounted');
    
    return () => {
      console.log('unmounted');
      
    }
  }, [])

  return (
    <div>
      <h1>MainLayout</h1>

      <Link href="/" className="underline text-blue-500">
        Home
      </Link>
      <br />
      <Link href="/abount" className="underline text-blue-500">
        Abount
      </Link>

      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
