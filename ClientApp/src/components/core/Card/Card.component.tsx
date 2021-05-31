import React from 'react';
import { styled } from '../../../theme';
import { Box } from '../Box';
import { CardComponent } from './Card.types';

const StyledCard = styled(Box, {
  padding: '$3',
  backgroundColor: '$grey400',
  borderRadius: '$2',
});

export const Card = React.forwardRef((props, forwardRef) => {
  const { children, ...cardProps } = props;
  return <StyledCard {...cardProps}>{children}</StyledCard>;
}) as CardComponent;
