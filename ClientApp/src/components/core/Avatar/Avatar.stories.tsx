import React from 'react';
import { Story } from '@storybook/react';
import { Avatar } from './Avatar.component';
import { AvatarProps } from './Avatar.types';

const Template: Story<Omit<AvatarProps, 'css'>> = (args) => (
  <Avatar {...args} />
);

export const SmallAvatar = Template.bind({});
SmallAvatar.args = {
  size: 'small',
  imageSrc: 'https://picsum.photos/id/1005/400/400',
  name: 'Michael McAvoy',
  status: false,
};

export const MediumAvatar = Template.bind({});
MediumAvatar.args = {
  size: 'medium',
  imageSrc: 'https://picsum.photos/id/1005/400/400',
  name: 'Michael McAvoy',
  status: false,
};

export const MissingImageAvatar = Template.bind({});
MissingImageAvatar.args = {
  size: 'medium',
  name: 'Michael McAvoy',
  status: false,
};

export default {
  title: 'Core/Avatars',
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium'],
      },
    },
    css: {
      table: {
        disable: true,
      },
    },
  },
};
