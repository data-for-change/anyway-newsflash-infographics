import React, { FC } from 'react';
import { Dialog, Text, TextType } from '../atoms';
import { Box, makeStyles, IconButton, DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { closeButtonColor, primaryColor } from '../../style';

interface IProps {
  title: string;
  isShowing: boolean;
  onClose: () => any;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}
const useStyles = makeStyles({
  'dialog-header': {
    padding: '0 12px 0 24px',
    paddingBottom: 0,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    backgroundColor: '#fafafa',
  },
  bar: {
    display: 'flex',
    width: 'inherit',
    color: primaryColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  close: {
    color: closeButtonColor,
  },
});
const DialogWithHeader: FC<IProps> = ({ onClose, isShowing, title, fullWidth, children, maxWidth = 'lg' }) => {
  const classes = useStyles();
  return (
    <Dialog isShowing={isShowing} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle className={classes['dialog-header']}>
        <Box className={classes.bar}>
          <Text type={TextType.CONTENT_TITLE}>{title}</Text>
          <IconButton onClick={onClose} className={classes.close}>
            <CloseIcon>close the dialog</CloseIcon>
          </IconButton>
        </Box>
      </DialogTitle>
      <Box display="flex" flexDirection="column" px={3} py={3}>
        {children}
      </Box>
    </Dialog>
  );
};

export default DialogWithHeader;
