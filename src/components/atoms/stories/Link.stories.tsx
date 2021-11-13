import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Link, { IProps } from '../Link';
import { BrowserRouter as Router } from 'react-router-dom';
export default {
  title: 'Components/atoms/Link',
  component: Link,
} as Meta;

const Template: Story<IProps> = (args) => {
  return (
    <Router>
      <Link {...args} />
    </Router>
  );
};

export const LinkS = Template.bind({});
LinkS.args = {
  children: 'Example link',
  to: '#',
};
