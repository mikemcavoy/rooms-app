import React from 'react';
import { Story } from '@storybook/react';
import { Player } from './Player.component';
import { PlayerOwnProps } from './Player.types';

const Template: Story<
  Omit<PlayerOwnProps, 'css'> & { children: React.ReactNode }
> = (args) => <Player {...args} />;

export const DefaultPlayer = Template.bind({});
DefaultPlayer.args = {
  currentlyPlaying: {
    user: {
      name: 'Michael McAvoy',
      profileImage: 'https://picsum.photos/id/1005/400/400',
      userId: 'test1',
    },
    track: {
      id: 'trackId2',
      name: 'The Sound',
      duration: 187600,
      artists: [
        {
          id: 'artistId2',
          name: 'The 1975',
        },
      ],
      album: {
        id: 'albumId2',
        name: 'I like it when you sleep, for you are so beautiful yet so unaware of it',
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d0000b273206517a3f7e4c34bf0bfc531',
          },
        ],
      },
    },
    startedAt: Date.now(),
  },
};

export default {
  title: 'UI/Player',
  component: DefaultPlayer,
  argTypes: {
    css: {
      table: {
        disable: true,
      },
    },
  },
};
