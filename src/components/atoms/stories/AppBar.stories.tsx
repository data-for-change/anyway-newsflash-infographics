import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import AppBar from '../AppBar';

export default {
  title: 'Components/atoms/AppBar',
  component: AppBar,
} as Meta;

const Template: Story<ComponentProps<typeof AppBar>> = (args) => <AppBar {...args} />;

export const AppBarS = Template.bind({});
AppBarS.args = {
  children: <div>This is the AppBar</div>,
};
