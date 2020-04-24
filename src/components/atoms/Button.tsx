import React from 'react';

interface IProps {
  onClick: () => any;
}

const Button: React.FC<IProps> = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;
export default Button;
