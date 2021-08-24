import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Button from '../Button';

export default {
  title: 'Components/atoms/Button',
  component: Button.Standard,
} as Meta;

const Template: Story<ComponentProps<typeof Button.Standard>> = (args) => <div {...args}>{args.children}</div>;

export const ButtonStandardS = Template.bind({});
ButtonStandardS.args = {
  children: Button.Standard,
};

export const ButtonIconS = Template.bind({});
ButtonIconS.args = {
  children: Button.Icon,
};
