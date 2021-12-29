import React, { ComponentProps, FC } from 'react';
import { Story, Meta } from '@storybook/react';
import Menu, { IProps } from '../Menu';

export default {
  title: 'Components/atoms/Menu',
  component: Menu,
  argTypes: {
    anchorEl: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

const Item: FC<ItemProps> = ({ number }) => {
  return <div>Item no^{number}</div>;
};
const NUM_ITEMS = Array.from(Array(10).keys());
const Items = NUM_ITEMS.map((itemNum) => <Item number={itemNum} />);

const handleClose = () => console.log('Menu Close Function');

const Template: Story<ComponentProps<typeof Menu>> = (args) => <Menu {...args} />;

export const MenuS = Template.bind({});
MenuS.args = {
  items: Items,
  handleClose,
  anchorEl: document.body,
};

interface ItemProps {
  number: number;
}
