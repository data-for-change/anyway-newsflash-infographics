import React, { FC } from 'react';
import { Dialog, AnywayAppBar, Typography } from '../atoms';
import { Box, makeStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { shadowColor, blueVioletColor } from '../../style';

interface IProps {
  title: string;
  isShowing: boolean;
  onClose: () => any;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}
const useStyles = makeStyles({
  bar: {
    display: 'flex',
    width: 'inherit',
    color: blueVioletColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  close: {
    color: shadowColor,
  },
});
const DialogWithHeader: FC<IProps> = ({ onClose, isShowing, title, fullWidth, children, maxWidth = 'lg' }) => {
  const classes = useStyles();
  return (
    <Dialog isShowing={isShowing} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      <AnywayAppBar>
        <Box className={classes.bar}>
          <Typography.Body4>{title}</Typography.Body4>
          <IconButton onClick={onClose} className={classes.close}>
            <CloseIcon>close the dialog</CloseIcon>
          </IconButton>
        </Box>
      </AnywayAppBar>
      <Box display="flex" flexDirection="column" px={3} py={3}>
        {children}
      </Box>
    </Dialog>
  );
};

export default DialogWithHeader;
