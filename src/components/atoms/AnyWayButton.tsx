import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';

interface IProps extends ButtonProps {
  onClick: () => any;
}

export const AnyWayButton: React.FC<IProps> = ({ ...props }) => <Button {...props} />;
