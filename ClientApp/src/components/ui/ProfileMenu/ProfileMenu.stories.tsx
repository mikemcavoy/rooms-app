import React from 'react';
import { Story } from '@storybook/react';
import { ProfileMenu } from './ProfileMenu.component';
import { ProfileMenuProps } from './ProfileMenu.types';

const Template: Story<Omit<ProfileMenuProps, 'css'>> = (args) => (
  <ProfileMenu {...args} />
);

export const DefaultMenu = Template.bind({});
DefaultMenu.args = {
  profileImage: 'https://picsum.photos/id/1005/400/400',
  name: 'Michael McAvoy',
};

export default {
  title: 'UI/Profile Menu',
  component: ProfileMenu,
  argTypes: {
    profileImage: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    css: {
      table: {
        disable: true,
      },
    },
  },
};
