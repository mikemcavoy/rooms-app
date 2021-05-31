import React from 'react';
import { Story } from '@storybook/react';
import { Input } from './Input.component';
import { InputOwnProps } from './Input.types';

const Template: Story<Omit<InputOwnProps, 'css'>> = (args) => (
  <Input {...args} />
);

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  showIcon: true,
  icon: 'spyGlass',
  iconFill: '#607283',
};

export default {
  title: 'Core/Input',
  component: Input,
  argTypes: {
    css: {
      table: {
        disable: true,
      },
    },
  },
};
