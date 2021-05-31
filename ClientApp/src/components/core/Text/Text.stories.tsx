import React from 'react';
import { Story } from '@storybook/react';
import { Text } from './Text.component';
import { TextProps } from './Text.types';

const Template: Story<Omit<TextProps, 'css'>> = (args) => <Text {...args} />;

export const Paragraph = Template.bind({});
Paragraph.args = {
  size: 'paragraph',
  children: 'Paragraph Text',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Small Text',
};

export default {
  title: 'Core/Text',
  component: Text,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['paragraph', 'small'],
      },
    },
    css: {
      table: {
        disable: true,
      },
    },
  },
};
