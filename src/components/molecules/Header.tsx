import React, { FC } from 'react';
import { AnywayAppBar } from '../atoms/AnywayAppBar';
import { Logo } from '../atoms/Logo';
import AnywayImage from '../../assets/anyway.png';
import { SignInIcon } from '../atoms/SignInIcon';

export const Header: FC = () => {
  return (
    <AnywayAppBar>
      <Logo src={AnywayImage} alt={'Anyway'} height={'30px'} />
      <SignInIcon />
    </AnywayAppBar>
  );
};
