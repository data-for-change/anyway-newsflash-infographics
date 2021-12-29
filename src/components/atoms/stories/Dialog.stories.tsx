import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Dialog from '../Dialog';

export default {
  title: 'Components/atoms/Dialog',
  component: Dialog,
} as Meta;

const Template: Story<ComponentProps<typeof Dialog>> = (args) => <Dialog {...args} />;

export const DialogS = Template.bind({});
DialogS.args = {
  children: 'DialogS',
};
