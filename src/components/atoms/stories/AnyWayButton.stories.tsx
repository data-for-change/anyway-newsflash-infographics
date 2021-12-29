import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { AnyWayButton } from '../AnyWayButton';

export default {
  title: 'Components/atoms/AnyWayButton',
  component: AnyWayButton,
} as Meta;

const Template: Story<ComponentProps<typeof AnyWayButton>> = (args) => <AnyWayButton {...args} />;

export const AnyWayButtonS = Template.bind({});
AnyWayButtonS.args = {
  onClick: () => console.log('You clicked it!'),
  children: 'Anyway Button',
};
