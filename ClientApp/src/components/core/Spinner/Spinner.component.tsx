import React from 'react';
import { styled, keyframes } from '../../../theme';

const spinnerAnimation = keyframes({
  '0%': {
    transform: 'scale(0)',
  },
  '40%': {
    transform: 'scale(1.0)',
  },
  '80%': {
    transform: 'scale(0)',
  },
  '100%': {
    transform: 'scale(0)',
  },
});

const StyledSpinnerContainer = styled('div', {
  width: '100%',
  textAlign: 'center',
  '& div': {
    width: '8px',
    height: '8px',
    backgroundColor: '$grey200',
    borderRadius: '100%',
    display: 'inline-block',
    animation: `${spinnerAnimation} 1.4s infinite ease-in-out both`,
  },
});

const StyledSpinnerItem = styled('div', {
  '&:nth-of-type(1)': {
    animationDelay: '-0.32s',
  },
  '&:nth-of-type(2)': {
    animationDelay: '-0.16s',
  },
});

export const Spinner: React.FC = () => {
  return (
    <StyledSpinnerContainer>
      <StyledSpinnerItem />
      <StyledSpinnerItem />
      <StyledSpinnerItem />
    </StyledSpinnerContainer>
  );
};
