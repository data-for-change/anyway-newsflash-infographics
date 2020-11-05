import React, { FC } from 'react';
import MaterialDialog from '@material-ui/core/Dialog';

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
