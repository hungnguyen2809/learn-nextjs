import { LayoutProps } from '@/models';
import React from 'react';

const EmptyLayout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default EmptyLayout;
