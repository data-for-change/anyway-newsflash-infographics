import React, { FunctionComponent } from 'react';

interface IProps {
  onClick: () => any;
}

const Button: FunctionComponent<IProps> = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;
export default Button;
