import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { AnyWayButton } from '../AnyWayButton';

export default {
  title: 'Components/atoms/AnyWayButton',
  component: AnyWayButton,
} as Meta;

const Template: Story<ComponentProps<typeof AnyWayButton>> = (args) => <AnyWayButton {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  onClick: () => console.log('sss'),
  children: <div>some text</div>,
};
