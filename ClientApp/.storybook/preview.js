import React from 'react';
import { globalStyles } from '../src/theme/globalStyles';

export const decorators = [
  (Story) => {
    globalStyles();
    return <Story />;
  },
];

export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#0d1217',
      },
    ],
  },
};
