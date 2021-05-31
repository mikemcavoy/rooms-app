import React from 'react';
import { Story } from '@storybook/react';
import { UserList } from './UserList.component';
import { UserListProps } from './UserList.types';

const Template: Story<
  Omit<UserListProps, 'css'> & { children: React.ReactNode }
> = (args) => <UserList {...args} />;

export const DefaultList = Template.bind({});
DefaultList.args = {
  users: [
    {
      name: 'Michael McAvoy',
      profileImage: 'https://picsum.photos/id/1005/400/400',
      userId: 'test1',
    },
    {
      name: 'Tom Jones',
      profileImage: 'https://picsum.photos/id/1005/400/400',
      userId: 'test2',
    },
    {
      name: 'Daisy Williamson',
      profileImage: 'https://picsum.photos/id/1005/400/400',
      userId: 'test3',
    },
    {
      name: 'Jack Nash',
      profileImage: 'https://picsum.photos/id/1005/400/400',
      userId: 'test4',
    },
    {
      name: 'Sophie Moore',
      profileImage: 'https://picsum.photos/id/1005/400/400',
      userId: 'test5',
    },
  ],
};

export default {
  title: 'UI/User List',
  component: UserList,
  argTypes: {
    users: {
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
