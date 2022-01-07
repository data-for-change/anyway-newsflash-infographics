import MaterialDialog from '@mui/material/Dialog';
import React, { FC } from 'react';

interface IProps {
  isShowing: boolean;
  onClose: () => any;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const Dialog: FC<IProps> = ({ isShowing, onClose, children, fullWidth, maxWidth }) => {
  return (
    <MaterialDialog fullWidth={fullWidth} maxWidth={maxWidth} open={isShowing} onClose={onClose}>
      {children}
    </MaterialDialog>
  );
};
export default Dialog;
