import React, { FC } from 'react';
import { AnywayAppBar } from '../atoms/AnywayAppBar';
import { AnywayLogo } from '../atoms/AnywayLogo';
import { SignInIcon } from '../atoms/SignInIcon';

export const Header: FC = () => {
  return (
    <AnywayAppBar>
      <AnywayLogo height={'30px'} />
      <SignInIcon />
    </AnywayAppBar>
  );
};
