import React, { FC } from 'react';
import { Dialog, AnywayAppBar } from '../atoms';
import { Box, makeStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { highlightDarkColor, closeButtonColor } from '../../style';

interface IProps {
  title: string;
  isShowing: boolean;
  onClose: () => any;
  fullWidth?: boolean;
}
const useStyles = makeStyles({
  bar: {
    height: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    width: 'inherit',
    color: highlightDarkColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  close: {
    color: closeButtonColor,
  },
});
const DialogWithHeader: FC<IProps> = ({ onClose, isShowing, title, fullWidth, children }) => {
  const classes = useStyles();
  return (
    <Dialog isShowing={isShowing} onClose={onClose} fullWidth={fullWidth}>
      <AnywayAppBar>
        <Box className={classes.bar}>
          {title}
          <IconButton className={classes.close}>
            <CloseIcon>close the dialog</CloseIcon>
          </IconButton>
        </Box>
      </AnywayAppBar>
      <Box p={2}>{children}</Box>
    </Dialog>
  );
};

export default DialogWithHeader;
