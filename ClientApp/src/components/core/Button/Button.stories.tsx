import React from 'react';
import { Story } from '@storybook/react';
import { Button } from './Button.component';
import { ButtonProps } from './Button.types';

const Template: Story<Omit<ButtonProps, 'css'>> = (args) => (
  <Button {...args} />
);

export const HighEmphasis = Template.bind({});
HighEmphasis.args = {
  emphasis: 'high',
  children: 'High Emphasis',
};

export const LowEmphasis = Template.bind({});
LowEmphasis.args = {
  emphasis: 'low',
  children: 'Low Emphasis',
};

export default {
  title: 'Core/Buttons',
  component: Button,
  argTypes: {
    emphasis: {
      control: {
        type: 'select',
        options: ['high', 'low'],
      },
    },
    css: {
      table: {
        disable: true,
      },
    },
    to: {
      table: {
        disable: true,
      },
    },
  },
};
