import React, { FC } from 'react';
import MaterialDialog from '@material-ui/core/Dialog';

interface IProps {
  isShowing: boolean;
  toggle: () => any;
}

const Dialog: FC<IProps> = ({ isShowing, toggle, children }) => {
  return (
    <MaterialDialog open={isShowing} onClose={toggle}>
      {children}
    </MaterialDialog>
  );
};
export default Dialog;
