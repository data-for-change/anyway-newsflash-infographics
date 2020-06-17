import React, { FC } from 'react';
import { Dialog, AnywayAppBar } from '../atoms';
import { Box, makeStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { highlightDarkColor, closeButtonColor, cardWidth } from '../../style';


interface IProps {
  title: string;
  isShowing: boolean;
  onClose: () => any;
}
const useStyles = makeStyles({
  dialog: {
    width: cardWidth
  },
  bar: {
    height: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    width: 'inherit',
    color: highlightDarkColor,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  close: {
    color: closeButtonColor,
  },
});
const DialogWithHeader: FC<IProps> = ({ onClose, isShowing, title, children }) => {
  const classes = useStyles();
  return (
    <Dialog isShowing={isShowing} onClose={onClose}>
      <Box className={classes.dialog}>
        <AnywayAppBar>
          <Box className={classes.bar}>
            {title}
            <IconButton className={classes.close}>
              <CloseIcon>close the dialog</CloseIcon>
            </IconButton>
          </Box>
        </AnywayAppBar>
        <Box display="flex" flexDirection="column" p={2}>
          {children}
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogWithHeader;
