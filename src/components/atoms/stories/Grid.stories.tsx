import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Grid from '../Grid';

export default {
  title: 'Components/atoms/Grid',
  component: Grid,
} as unknown as Meta;

const Template: Story<ComponentProps<typeof Grid.Container>> = (args) => <Grid.Container {...args} />;

export const GridS = Template.bind({});
GridS.args = {
  children: 'GridS',
};
