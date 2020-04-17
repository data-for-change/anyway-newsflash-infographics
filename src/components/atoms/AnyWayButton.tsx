import React, { FunctionComponent } from 'react';
import { Button, ButtonProps } from '@material-ui/core';

interface IProps extends ButtonProps {
  onClick: () => any;
}

export const AnyWayButton: FunctionComponent<IProps> = ({ ...props }) => <Button {...props} />;
