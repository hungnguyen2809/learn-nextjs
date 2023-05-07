import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onClick?: () => void;
  type?: string;
}

const Button: React.FC<Props> = ({ children, type = 'red', onClick }) => {
  return (
    <button onClick={onClick} className={`bg-${type}-500 text-white py-2 px-3 rounded-md text-center`}>
      {children}
    </button>
  );
};

export default Button;
