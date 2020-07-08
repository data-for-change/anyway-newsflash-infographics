import React, { FC } from 'react';
import MaterialDialog from '@material-ui/core/Dialog';

interface IProps {
  isShowing: boolean;
  onClose: () => any;
  fullWidth?: boolean;
}

const Dialog: FC<IProps> = ({ isShowing, onClose, children, fullWidth }) => {
  return (
    <MaterialDialog fullWidth={fullWidth} maxWidth={'lg'} open={isShowing} onClose={onClose}>
      {children}
    </MaterialDialog>
  );
};
export default Dialog;
