import { createCss, StitchesCss } from '@stitches/react';
import { colors } from './colors';
import { space } from './space';
import { radii } from './radii';
import { utils } from './utils';
import { typography } from './typography';

export type { StitchesVariants } from '@stitches/react';

export const defaultTheme = {
  colors,
  space,
  radii,
  ...typography,
};

const stitches = createCss({
  theme: defaultTheme,
  utils,
});

export const { styled, css, global, keyframes } = stitches;

export type CSS = StitchesCss<typeof stitches>;
