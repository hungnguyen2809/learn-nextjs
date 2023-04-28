import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white py-2 px-3 rounded-md text-center">
      {children}
    </button>
  );
};

export default Button;
