import React, { ComponentProps, FC } from 'react';
import { Story, Meta } from '@storybook/react';
import Loader, { IProps } from '../Loader';

export default {
  title: 'Components/atoms/Loader',
  component: Loader,
} as Meta;

export const LoaderS: FC<IProps> = (args) => <Loader {...args} />;
