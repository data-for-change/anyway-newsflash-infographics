import { Button, ButtonProps } from '@mui/material';
import React, { FC } from 'react';

interface IProps extends ButtonProps {
  onClick: (arg0: any) => any;
}

export const AnyWayButton: FC<IProps> = ({ ...props }) => <Button {...props} />;
