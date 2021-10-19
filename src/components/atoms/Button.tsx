import React, { FC } from 'react';
import { Button as MatButton, IconButton as MatIconButton } from '@material-ui/core';

interface IProps {
  onClick?: () => any;
  isSubmit?: boolean;
}

// todo: make standard buttons for entire app
const StandardButton: FC<IProps> = ({ isSubmit = false, onClick, children }) => (
  <MatButton type={isSubmit ? 'submit' : 'button'} variant="contained" color="primary" onClick={onClick}>
    {children}
  </MatButton>
);

const OutlinedButton: FC<IProps> = ({ isSubmit = false, onClick, children }) => (
  <MatButton type={isSubmit ? 'submit' : 'button'} variant="outlined" color="primary" onClick={onClick}>
    {children}
  </MatButton>
);

const TextButton: FC<IProps> = ({ isSubmit = false, onClick, children }) => (
  <MatButton type={isSubmit ? 'submit' : 'button'} variant="text" color="primary" onClick={onClick}>
    {children}
  </MatButton>
);

const IconButton: FC<IProps> = ({ onClick, children }) => <MatIconButton onClick={onClick}>{children}</MatIconButton>;

const Button = {
  Standard: StandardButton,
  Icon: IconButton,
  Outlined: OutlinedButton,
  Text: TextButton,
};

export default Button;
