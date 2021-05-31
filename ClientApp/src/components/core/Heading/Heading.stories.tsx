import React from 'react';
import { Story } from '@storybook/react';
import { Heading } from './Heading.component';
import { HeadingProps } from './Heading.types';

const Template: Story<Omit<HeadingProps, 'css'>> = (args) => (
  <Heading {...args} />
);

export const Heading1 = Template.bind({});
Heading1.args = {
  size: 'h1',
  children: 'Heading 1',
};

export const Heading2 = Template.bind({});
Heading2.args = {
  size: 'h2',
  children: 'Heading 2',
};

export default {
  title: 'Core/Headings',
  component: Heading,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['h1', 'h2'],
      },
    },
    css: {
      table: {
        disable: true,
      },
    },
  },
};
