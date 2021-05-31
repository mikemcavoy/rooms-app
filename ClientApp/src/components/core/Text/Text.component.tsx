import React from 'react';
import { styled } from '../../../theme';
import { TextProps } from './Text.types';

const StyledText = styled('p', {
  margin: '0px',
  fontWeight: '$regular',
  color: '$grey100',
  variants: {
    size: {
      paragraph: {
        fontSize: '$paragraph',
        lineHeight: '$paragraph',
      },
      small: {
        fontSize: '$small',
        lineHeight: '$small',
      },
    },
    bold: {
      true: {
        fontWeight: '$bold',
      },
    },
  },
});

export const Text: React.FC<TextProps> = ({
  children,
  bold = false,
  size = 'paragraph',
  css,
}) => {
  return (
    <StyledText css={css as any} size={size} bold={bold}>
      {children}
    </StyledText>
  );
};
