import React, { FC } from 'react';
import { Button as MatButton, ButtonProps, IconButton } from '@material-ui/core';

interface IProps extends ButtonProps {
  onClick?: () => any;
}

// todo: make standard buttons for entire app
const StandardButton: FC<IProps> = ({ onClick, children }) => (
  <MatButton variant="contained" color="primary" onClick={onClick}>
    {children}
  </MatButton>
);

const Button = {
  Standard: StandardButton,
  Icon: IconButton,
};

export default Button;
