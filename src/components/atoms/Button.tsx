import React, { FC } from 'react';
import { Button as MaterialButton, ButtonProps, IconButton } from '@material-ui/core';

interface IProps extends ButtonProps {
  props: ButtonProps;
}

// todo: make standard buttons for entire app
const StandardButton: FC<IProps> = ({ props }) => <MaterialButton {...props} />;

const Button = {
  standard: StandardButton,
  icon: IconButton,
};

export default Button;
