import React from 'react';
import { Story } from '@storybook/react';
import { SearchResults } from './SearchResults.component';
import { SearchResultsOwnProps } from './SearchResults.types';

const Template: Story<
  Omit<SearchResultsOwnProps, 'css'> & { children: React.ReactNode }
> = (args) => <SearchResults {...args} />;

export const DefaultSearchResults = Template.bind({});
DefaultSearchResults.args = {
  tracks: [
    {
      id: 'trackId',
      name: 'Let it be',
      duration: 1200,
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
            url: 'https://i.scdn.co/image/ab67616d0000b27384243a01af3c77b56fe01ab1',
          },
        ],
      },
    },
    {
      id: 'trackId2',
      name: 'The Sound',
      duration: 1200,
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
  ],
  handleTrackSelection: () => {
    return null;
  },
};

export const EmptySearchResults = Template.bind({});
EmptySearchResults.args = {
  tracks: [],
};

export const LoadingSearchResults = Template.bind({});
LoadingSearchResults.args = {
  tracks: [],
  loading: true,
};

export default {
  title: 'UI/Search Results',
  component: DefaultSearchResults,
  argTypes: {
    css: {
      table: {
        disable: true,
      },
    },
  },
};
