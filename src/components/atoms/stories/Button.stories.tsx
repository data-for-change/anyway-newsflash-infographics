import { ComponentProps, ReactNode } from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { IProps } from 'components/atoms/Button';

export default {
  title: 'Components/atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['outlined', 'standard', 'icon', 'text'],
      control: { type: 'select' },
    },
  },
} as unknown as Meta;

const Template: Story = ({ children, ...args }) => {
  if (args.variant === 'standard') {
    return <Button.Standard {...args}>{children}</Button.Standard>;
  } else if (args.variant === 'outlined') {
    return <Button.Outlined {...args}>{children}</Button.Outlined>;
  } else if (args.variant === 'icon') {
    return <Button.Icon {...args}>{children}</Button.Icon>;
  } else if (args.variant === 'text') {
    return <Button.Text {...args}>{children}</Button.Text>;
  } else {
    return <div>This component must have a type prop</div>;
  }
};

export const Buttons = Template.bind({});
Buttons.args = {
  children: 'Button',
  variant: 'standard',
  isSubmit: false,
  onClick: () => 'text',
};

// export const ButtonOutlinedS = Template.bind({});
// ButtonOutlinedS.args = {
//   type: 'outlined',
//   children: 'Button',
// };

// export const ButtonIconS = Template.bind({});
// ButtonIconS.args = {
//   type: 'icon',
//   children: 'Button',
// };
