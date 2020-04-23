import React, { FC } from 'react';
import { Button, ButtonProps } from '@material-ui/core';

interface IProps extends ButtonProps {
  onClick: () => any;
}

export const AnyWayButton: FC<IProps> = ({ ...props }) => <Button {...props} />;
