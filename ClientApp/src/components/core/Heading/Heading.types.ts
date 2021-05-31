import React from 'react';
import { CSS } from '../../../theme';

type Size = 'h1' | 'h2';

export type HeadingProps = {
  size?: Size;
  css?: CSS;
  children: React.ReactNode;
};
