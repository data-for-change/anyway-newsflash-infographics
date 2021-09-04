import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';
import { Dialog, Button, Typography } from 'components/atoms';

interface IProps {
  section: string;
  isShowing: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: theme.spacing(1.5),
    },
    wrapper: {
      minWidth: 500,
      padding: theme.spacing(2.5),
      paddingInlineStart: theme.spacing(5),
    },
    dialogHeader: {
      padding: 0,
    },
    actions: {
      gap: theme.spacing(1.5),
    },
    chosenSection: {
      marginBlock: theme.spacing(2),
    },
    dialogContent: {
      paddingInlineStart: 0,
    },
  }),
);

const MapDialog: FC<IProps> = ({ section, isShowing, onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Dialog isShowing={isShowing} onClose={onClose} maxWidth="lg">
      <Box className={classes.wrapper}>
        <Box className={classes.dialogHeader}>
          <Typography.Title1>{t('mapDialog.searchSection')}</Typography.Title1>
        </Box>
        <DialogContent className={classes.dialogContent}>
          {/*A placeholder to visually estimate the size*/}
          <img src="https://images.indianexpress.com/2017/05/google-maps-759.jpg" alt="" />
          <div className={classes.chosenSection}>
            {/*needs to be bolder - just give it a classname?*/}
            <Typography.Body1 bold>{t('mapDialog.chosenSegment')}</Typography.Body1>
            <Typography.Body1>{` ${section}`}</Typography.Body1>
          </div>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button.Standard>{t('mapDialog.searchButton')}</Button.Standard>
          <Button.Outlined>{t('mapDialog.cancelButton')}</Button.Outlined>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default MapDialog;
