import React, { ChangeEvent, useState } from 'react';
import DialogWithHeader from './DialogWithHeader';
import { Box, Grid, TextField } from '@material-ui/core';
import { useStore } from '../../store/storeConfig';
import Button from '../atoms/Button';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

interface IProps {
  isShowing: boolean;
  onClose: () => void;
  defaultValues: IFormInput;
}

export interface IFormInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  workplace?: string;
}

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(1),
  },
  error: {
    textAlign: 'center',
  },

  submitButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const UserInfoForm: React.FC<IProps> = ({ isShowing, onClose, defaultValues }) => {
  const store = useStore();
  const { t } = useTranslation();
  const [formInput, setFormInput] = useState<IFormInput>(defaultValues);

  const handleInput = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.currentTarget;
    const newValue = { [name]: value };
    setFormInput((prevState) => ({ ...prevState, ...newValue }));
  };
  const classes = useStyles();

  const handleSubmit = async () => {
    await store.updateUserInfo(formInput);
    if (!store.userApiError) {
      onClose();
    }
  };

  return (
    <DialogWithHeader
      fullWidth
      maxWidth={'sm'}
      isShowing={isShowing}
      title={t('userDetailsForm.title')}
      onClose={onClose}
    >
      <Grid className={classes.grid} container justify={'center'} alignItems={'center'} spacing={4}>
        <Grid item xs={6}>
          <TextField
            defaultValue={defaultValues.lastName}
            onChange={handleInput}
            name="lastName"
            variant={'outlined'}
            fullWidth
            label={t('userDetailsForm.lastName')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            defaultValue={defaultValues.firstName}
            onChange={handleInput}
            name="firstName"
            variant={'outlined'}
            fullWidth
            label={t('userDetailsForm.firstName')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onChange={handleInput}
            variant={'outlined'}
            fullWidth
            name="email"
            label={t('userDetailsForm.email')}
            defaultValue={defaultValues.email}
            placeholder={'Please enter your name'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            defaultValue={defaultValues.workplace}
            name="workplace"
            label={t('userDetailsForm.organization')}
            variant={'outlined'}
            fullWidth
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12}>
          {store.userApiError && <p className={classes.error}>{t('userDetailsForm.error')} </p>}
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.submitButton}>
            <Button.Standard onClick={handleSubmit}>{t(`userDetailsForm.submitButton`)}</Button.Standard>
          </Box>
        </Grid>
      </Grid>
    </DialogWithHeader>
  );
};

export default observer(UserInfoForm);
