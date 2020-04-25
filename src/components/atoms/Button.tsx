import React, { FC } from 'react';

interface IProps {
  onClick: () => any;
}

const Button: FC<IProps> = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;
export default Button;
