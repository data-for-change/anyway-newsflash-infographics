import { ComponentProps, ReactNode } from 'react';
import { Story, Meta } from '@storybook/react';
import Button, { IProps } from 'components/atoms/Button';
export default {
  title: 'Components/atoms/Button',
  component: Button,
} as unknown as Meta;

interface StoryButtonProps extends IProps {
  type: string;
  children?: ReactNode;
}

const Template: Story<StoryButtonProps> = (args) => {
  if (args.type === 'standard') {
    return <Button.Standard>Standard Button</Button.Standard>;
  } else if (args.type === 'outlined') {
    return <Button.Outlined>Outlined Button</Button.Outlined>;
  } else if (args.type === 'icon') {
    return <Button.Icon>Icon Button</Button.Icon>;
  } else {
    return <div>This component must have a type prop</div>;
  }
};

export const ButtonStandardS = Template.bind({});
ButtonStandardS.args = {
  type: 'standard',
  children: 'Button',
};

export const ButtonOutlinedS = Template.bind({});
ButtonOutlinedS.args = {
  type: 'outlined',
  children: 'Button',
};

export const ButtonIconS = Template.bind({});
ButtonIconS.args = {
  type: 'icon',
  children: 'Button',
};
