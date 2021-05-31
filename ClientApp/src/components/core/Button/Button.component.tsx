import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '../../../theme';
import { ButtonProps } from './Button.types';

const StyledButton = styled('button', {
  fontSize: '$small',
  lineHeight: '$small',
  fontWeight: '$bold',
  letterSpacing: '$small',
  color: '$white',
  px: '$6',
  py: '$2',
  transition: '0.2s',
  borderRadius: '$1',
  textDecoration: 'none',
  '&:focus': {
    outline: 'none',
  },
  variants: {
    emphasis: {
      high: {
        backgroundColor: '$accent200',
        bd: '$accent200',
        transition: '0.2s',
        '&:hover': {
          backgroundColor: '$accent300',
          cursor: 'pointer',
          borderColor: '$accent300',
        },
        '&:focus': {
          boxShadow: '0px 0px 0px 1px $colors$accent100',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        },
        '&:active': {
          boxShadow: '0px 0px 0px 1px $colors$accent100',
        },
      },
      low: {
        backgroundColor: '$grey300',
        bd: '$grey300',
        color: '$grey100',
        '&:hover': {
          backgroundColor: '$grey200',
          cursor: 'pointer',
          borderColor: '$grey200',
        },
        '&:focus': {
          boxShadow: '0px 0px 0px 1px $colors$grey100',
          textDecoration: 'underline',
        },
        '&:active': {
          boxShadow: '0px 0px 0px 1px $colors$grey100',
        },
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
});

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  emphasis = 'high',
  fullWidth = false,
  css,
  ...props
}) => {
  if (to)
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <StyledButton
          as="span"
          css={css as any}
          fullWidth={fullWidth}
          emphasis={emphasis}
        >
          {children}
        </StyledButton>
      </Link>
    );
  return (
    <StyledButton
      css={css as any}
      emphasis={emphasis}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
