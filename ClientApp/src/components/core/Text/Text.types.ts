import React from 'react';
import { CSS } from '../../../theme';

type Size = 'paragraph' | 'small';

export type TextProps = {
  size?: Size;
  bold?: boolean;
  css?: CSS;
  children: React.ReactNode;
};
