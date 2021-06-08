import React, { ChangeEvent, useState } from 'react';
import DialogWithHeader from './DialogWithHeader';
import { Box, Grid, TextField, makeStyles } from '@material-ui/core';
import { useStore } from '../../store/storeConfig';
import Button from '../atoms/Button';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { IValidationErrors, validateUserDetails } from '../../utils/validations';

interface IProps {
  isShowing: boolean;
  onClose: () => void;
  defaultValues: IFormInput;
}

export interface IFormInput {
  email: string;
  firstName: string;
  lastName: string;
  workplace: string;
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

const initialValidations = {
  email: true,
  firstName: true,
  lastName: true,
};

const UserInfoForm: React.FC<IProps> = ({ isShowing, onClose, defaultValues }) => {
  const store = useStore();
  const { t } = useTranslation();
  const [formInput, setFormInput] = useState<IFormInput>(defaultValues);
  const [validations, setValidations] = useState<IValidationErrors>(initialValidations);

  const handleInput = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.currentTarget;
    const newValue = { [name]: value };
    setFormInput((prevState) => ({ ...prevState, ...newValue }));
  };
  const classes = useStyles();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const inputValidations: IValidationErrors = validateUserDetails(formInput);
    if (Object.values(validations).every(Boolean)) {
      await store.updateUserInfo(formInput);
      if (!store.userApiError) {
        onClose();
      }
    }
    setValidations(inputValidations);
  };

  return (
    <DialogWithHeader
      fullWidth
      maxWidth={'sm'}
      isShowing={isShowing}
      title={t('userDetailsForm.UserDetails')}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} noValidate>
        <Grid className={classes.grid} container justify={'center'} alignItems={'center'} spacing={4}>
          <Grid item xs={6}>
            <TextField
              defaultValue={defaultValues.lastName}
              onChange={handleInput}
              name="lastName"
              error={!validations.lastName}
              helperText={validations.lastName ? '' : 'Please provide a last name'}
              variant={'outlined'}
              fullWidth
              label={t('userDetailsForm.Last Name')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              defaultValue={defaultValues.firstName}
              onChange={handleInput}
              name="firstName"
              error={!validations.firstName}
              helperText={validations.firstName ? '' : 'Please provide a first name'}
              variant={'outlined'}
              fullWidth
              label={t('userDetailsForm.First Name')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onChange={handleInput}
              variant={'outlined'}
              fullWidth
              name="email"
              error={!validations.email}
              helperText={validations.email ? '' : 'Please provide a valid Email'}
              label={t('userDetailsForm.Email')}
              defaultValue={defaultValues.email}
              placeholder={'Please enter your name'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              defaultValue={defaultValues.workplace}
              name="workplace"
              label={t('userDetailsForm.Organization')}
              variant={'outlined'}
              fullWidth
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Box className={classes.submitButton}>
              <Button.Standard type="submit">{t(`userDetailsForm.Update`)}</Button.Standard>
            </Box>
          </Grid>
        </Grid>
      </form>
    </DialogWithHeader>
  );
};

export default observer(UserInfoForm);
