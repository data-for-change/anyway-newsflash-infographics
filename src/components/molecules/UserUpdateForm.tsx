import React, { ChangeEvent, useState } from 'react';
import DialogWithHeader from './DialogWithHeader';
import { Grid, TextField } from '@material-ui/core';
import { useStore } from '../../store/storeConfig';
import Button from '../atoms/Button';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  isShowing: boolean;
  onClose: () => void;
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
}));

const UserInfoForm: React.FC<IProps> = ({ isShowing, onClose }) => {
  const store = useStore();
  const [formInput, setFormInput] = useState<IFormInput>({
    email: store.userInfo.email,
    firstName: store.userInfo.firstName,
    lastName: store.userInfo.lastName,
    workplace: store.userInfo.workPlace,
  });

  const handleInput = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = evt.currentTarget?.name;
    const newValue = { [name]: evt.currentTarget?.value };
    setFormInput((prevState) => ({ ...prevState, ...newValue }));
  };
  const classes = useStyles();

  const handleSubmit = () => {
    store.updateUserInfo(formInput);
    onClose();
  };

  return (
    <DialogWithHeader fullWidth maxWidth={'sm'} isShowing={isShowing} title={'עדכן פרטים'} onClose={onClose}>
      <Grid className={classes.grid} container justify={'center'} alignItems={'center'} spacing={4}>
        <Grid item xs={6}>
          <TextField
            defaultValue={formInput.lastName}
            onChange={handleInput}
            name="lastName"
            variant={'outlined'}
            fullWidth
            label="Last Name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            defaultValue={formInput.firstName}
            onChange={handleInput}
            name="firstName"
            variant={'outlined'}
            fullWidth
            label="First Name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleInput}
            variant={'outlined'}
            fullWidth
            name="email"
            label="Email"
            defaultValue={formInput.email}
            placeholder={'Please enter your name'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            defaultValue={formInput.workplace}
            name="workPlace"
            label={'Workplace'}
            variant={'outlined'}
            fullWidth
            onChange={handleInput}
          />
        </Grid>
        <Button.Standard onClick={handleSubmit}>Submit</Button.Standard>
      </Grid>
    </DialogWithHeader>
  );
};

export default UserInfoForm;
