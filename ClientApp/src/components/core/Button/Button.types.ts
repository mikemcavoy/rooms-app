import React from 'react';
import { CSS } from '../../../theme';

type Emphasis = 'high' | 'low';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  emphasis?: Emphasis;
  fullWidth?: boolean;
  to?: string;
  css?: CSS;
  children: React.ReactNode;
};
