import React from 'react';
import { Story } from '@storybook/react';
import { TrackList } from './TrackList.component';
import { TrackListOwnProps } from './TrackList.types';

const Template: Story<
  Omit<TrackListOwnProps, 'css'> & { children: React.ReactNode }
> = (args) => <TrackList {...args} />;

export const DefaultTrackList = Template.bind({});
DefaultTrackList.args = {
  tracks: [
    {
      id: 'trackId',
      name: 'Let it be',
      duration: 157600,
      artists: [
        {
          id: 'artistId',
          name: 'The Beatles',
        },
      ],
      album: {
        id: 'albumId',
        name: 'Let it be',
        images: [
          {
            url:
              'https://i.scdn.co/image/ab67616d0000b27384243a01af3c77b56fe01ab1',
          },
        ],
      },
    },
    {
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
        name:
          'I like it when you sleep, for you are so beautiful yet so unaware of it',
        images: [
          {
            url:
              'https://i.scdn.co/image/ab67616d0000b273206517a3f7e4c34bf0bfc531',
          },
        ],
      },
    },
  ],
};

export default {
  title: 'UI/Track List',
  component: DefaultTrackList,
  argTypes: {
    css: {
      table: {
        disable: true,
      },
    },
  },
};
