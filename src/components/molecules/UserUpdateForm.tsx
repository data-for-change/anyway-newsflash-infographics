import { Box, FormHelperText, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from 'components/atoms/Button';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'store/storeConfig';
import { IValidationErrors, validateUserDetails } from 'utils/validations';
import DialogWithHeader from './DialogWithHeader';

const PREFIX = 'UserUpdateForm';

const classes = {
  grid: `${PREFIX}-grid`,
  error: `${PREFIX}-error`,
  submitButton: `${PREFIX}-submitButton`,
  hide: `${PREFIX}-hide`,
};

const StyledDialogWithHeader = styled(DialogWithHeader)(({ theme }) => ({
  [`& .${classes.grid}`]: {
    marginTop: theme.spacing(1),
  },

  [`& .${classes.error}`]: {
    textAlign: 'center',
  },

  [`& .${classes.submitButton}`]: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },

  [`& .${classes.hide}`]: {
    visibility: 'hidden',
  },
}));

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const inputValidations: IValidationErrors = validateUserDetails(formInput);
    if (Object.values(inputValidations).every(Boolean)) {
      await store.updateUserInfo(formInput);
      if (!store.userApiError) {
        setValidations(initialValidations);
        onClose();
      }
    }
    setValidations(inputValidations);
  };

  return (
    <StyledDialogWithHeader
      fullWidth
      maxWidth={'sm'}
      isShowing={isShowing}
      title={t('userDetailsForm.UserDetails')}
      onClose={() => {
        setValidations(initialValidations);
        onClose();
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <Grid className={classes.grid} container justifyContent={'center'} alignItems={'center'} spacing={4}>
          <Grid item xs={6}>
            <TextField
              defaultValue={defaultValues.lastName}
              onChange={handleInput}
              name="lastName"
              error={!validations.lastName}
              variant={'outlined'}
              fullWidth
              label={t('userDetailsForm.Last Name')}
            />
            <FormHelperText error className={!validations.lastName ? '' : classes.hide}>
              {"Please provide a last name'"}
            </FormHelperText>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              defaultValue={defaultValues.firstName}
              onChange={handleInput}
              name="firstName"
              variant={'outlined'}
              fullWidth
              label={t('userDetailsForm.First Name')}
            />
            <FormHelperText error className={!validations.firstName ? '' : classes.hide}>
              {'Please provide a first name'}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onChange={handleInput}
              variant={'outlined'}
              fullWidth
              name="email"
              error={!validations.email}
              label={t('userDetailsForm.Email')}
              defaultValue={defaultValues.email}
              placeholder={'Please enter your name'}
            />
            <FormHelperText error className={!validations.email ? '' : classes.hide}>
              {'Please provide a valid Email'}
            </FormHelperText>
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
              <Button.Standard isSubmit>{t(`userDetailsForm.Update`)}</Button.Standard>
            </Box>
          </Grid>
        </Grid>
      </form>
    </StyledDialogWithHeader>
  );
};

export default observer(UserInfoForm);
