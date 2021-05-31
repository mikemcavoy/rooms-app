import React from 'react';
import { styled } from '../../../theme';
import { HeadingProps } from './Heading.types';

const StyledHeading = styled('h1', {
  margin: '0px',
  variants: {
    size: {
      h1: {
        fontSize: '$heading1',
        fontWeight: '$bold',
        lineHeight: '$heading1',
        color: '$grey100',
      },
      h2: {
        fontSize: '$heading2',
        fontWeight: '$bold',
        lineHeight: '$heading2',
        color: '$grey100',
      },
    },
  },
});

export const Heading: React.FC<HeadingProps> = ({
  children,
  size = 'h1',
  css,
}) => {
  return (
    <StyledHeading as={size} css={css as any} size={size}>
      {children}
    </StyledHeading>
  );
};
