import Button, { ButtonProps } from '@mui/material/Button';
import React, { FC } from 'react';

interface IProps extends ButtonProps {
  onClick: (arg0: any) => any;
}

export const AnyWayButton: FC<IProps> = ({ ...props }) => <Button {...props} />;
