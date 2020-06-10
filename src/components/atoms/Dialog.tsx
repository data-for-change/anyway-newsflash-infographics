import React, { FC } from 'react';
import MaterialDialog from '@material-ui/core/Dialog';

interface IProps {
  isShowing: boolean;
  onClose: () => any;
}

const Dialog: FC<IProps> = ({ isShowing, onClose, children }) => {
  return (
    <MaterialDialog open={isShowing} onClose={onClose}>
      {children}
    </MaterialDialog>
  );
};
export default Dialog;
