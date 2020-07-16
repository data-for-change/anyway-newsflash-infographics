import React, { FC } from 'react';
import { Dialog, AnywayAppBar, Text, TextType } from '../atoms';
import { Box, makeStyles, IconButton } from '@material-ui/core';
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
const DialogWithHeader: FC<IProps> = ({ onClose, isShowing, title, fullWidth, children, maxWidth }) => {
  const classes = useStyles();
  return (
    <Dialog isShowing={isShowing} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      <AnywayAppBar>
        <Box className={classes.bar}>
          <Text type={TextType.CONTENT_TITLE}>{title}</Text>
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
