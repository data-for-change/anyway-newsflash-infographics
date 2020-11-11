import React, { FC } from 'react';
import { Dialog, Typography } from '../atoms';
import { Box, makeStyles, createStyles, Theme, IconButton, DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { closeButtonColor, primaryColor, borderColor } from '../../style';

interface IProps {
  title: string;
  isShowing: boolean;
  onClose: () => any;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogHeader: {
      padding: theme.spacing(0, 1.5, 0, 3),
      borderBottom: `2px solid ${borderColor}`,
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
  }),
);
const DialogWithHeader: FC<IProps> = ({ onClose, isShowing, title, fullWidth, children, maxWidth = 'lg' }) => {
  const classes = useStyles();
  return (
    <Dialog isShowing={isShowing} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle className={classes.dialogHeader}>
        <Box className={classes.bar}>
          <Typography.Body4>{title}</Typography.Body4>
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
