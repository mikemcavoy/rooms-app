import React from 'react';
import { styled } from '../../../theme';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { InputComponent, Icons } from './Input.types';

const StyledInputContainer = styled(Box, {
  position: 'relative',
});

export const StyledInput = styled('input', {
  width: '100%',
  boxSizing: 'border-box',
  fontWeight: '$regular',
  color: '$grey100',
  fontSize: '$small',
  lineHeight: '$small',
  backgroundColor: '$grey500',
  bd: '$grey300',
  paddingLeft: '$2',
  paddingTop: '$2',
  paddingBottom: '$2',
  paddingRight: '$2',
  borderRadius: '$1',
  '&:focus': {
    outline: 'none',
    borderColor: '$accent200',
  },
  '&::placeholder': {
    color: '$grey200',
  },
  variants: {
    showIcon: {
      true: {
        paddingRight: '$5',
      },
    },
  },
});

const StyledIcon = styled(Icon, {
  position: 'absolute',
  right: '$2',
  top: '50%',
  transform: 'translateY(-50%)',
});

export const Input = React.forwardRef((props, forwardRef) => {
  const { icon, iconFill, showIcon, ...inputProps } = props;
  return (
    <StyledInputContainer>
      <StyledInput showIcon={showIcon} {...inputProps} ref={forwardRef} />
      {showIcon && <StyledIcon icon={icon as Icons} fill={iconFill} />}
    </StyledInputContainer>
  );
}) as InputComponent;
