import React from 'react';
import { Story } from '@storybook/react';
import { Icon } from './Icon.component';
import { IconOwnProps } from './Icon.types';

const Template: Story<Omit<IconOwnProps, 'css'>> = (args) => <Icon {...args} />;

export const ChevronDown = Template.bind({});
ChevronDown.args = {
  icon: 'chevronDown',
};

export default {
  title: 'Core/Icons',
  component: Icon,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: ['chevronDown'],
      },
    },
    fill: {
      control: {
        type: 'color',
      },
    },
    css: {
      table: {
        disable: true,
      },
    },
  },
};
