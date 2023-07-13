import React, { FC } from 'react';
import { Button as MatButton, IconButton as MatIconButton } from '@material-ui/core';

interface IProps {
  onClick?: () => void;
  isSubmit?: boolean;
  disabled?: boolean;
  buttonHeight?: number;
}

// todo: make standard buttons for entire app
const StandardButton: FC<IProps> = ({ isSubmit = false, onClick, children, disabled = false }) => (
  <MatButton type={isSubmit ? 'submit' : 'button'} variant="contained" color="primary" onClick={onClick} disabled={disabled}>
    {children}
  </MatButton>
);

const SmallButton: FC<IProps> = ({ isSubmit = false, onClick, children, buttonHeight, disabled = false }) => (
  <MatButton type={isSubmit ? 'submit' : 'button'} variant="contained" size="small"
             color="primary" onClick={onClick} disabled={disabled} style={{height: buttonHeight}} >
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
  Small: SmallButton,
};

export default Button;
