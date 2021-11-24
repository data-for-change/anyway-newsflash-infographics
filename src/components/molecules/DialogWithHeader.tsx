import CloseIcon from '@mui/icons-material/Close';
import { Box, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dialog, Typography } from 'components/atoms';
import React, { FC } from 'react';
import { blueVioletColor, shadowColor } from 'style';

const PREFIX = 'DialogWithHeader';

const classes = {
  dialogHeader: `${PREFIX}-dialogHeader`,
  bar: `${PREFIX}-bar`,
  close: `${PREFIX}-close`,
  content: `${PREFIX}-content`,
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.dialogHeader}`]: {
    padding: 0,
    paddingInlineStart: theme.spacing(3),
    borderBottom: `2px solid ${shadowColor}`,
  },

  [`& .${classes.bar}`]: {
    display: 'flex',
    width: 'inherit',
    color: blueVioletColor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  [`& .${classes.close}`]: {
    color: shadowColor,
  },

  [`& .${classes.content}`]: {
    overflow: 'hidden',
  },
}));

interface IProps {
  title: string;
  isShowing: boolean;
  onClose: () => any;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const DialogWithHeader: FC<IProps> = ({ onClose, isShowing, title, fullWidth, children, maxWidth = 'lg' }) => {
  return (
    <StyledDialog isShowing={isShowing} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle className={classes.dialogHeader}>
        <Box className={classes.bar}>
          <Typography.Body4>{title}</Typography.Body4>
          <IconButton onClick={onClose} className={classes.close} size="large">
            <CloseIcon>close the dialog</CloseIcon>
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.content}>{children}</DialogContent>
    </StyledDialog>
  );
};

export default DialogWithHeader;
