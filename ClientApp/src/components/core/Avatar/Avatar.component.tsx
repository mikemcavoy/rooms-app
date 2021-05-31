import React from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import { styled } from '../../../theme';
import { AvatarProps } from './Avatar.types';
import { Box } from '../Box';

const StyledAvatarWrapper = styled(Box, {
  position: 'relative',
  display: 'inline-block',
});

const StyledAvatar = styled(RadixAvatar.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  variants: {
    size: {
      small: {
        width: '44px',
        height: '44px',
        borderRadius: '18px',
      },
      medium: {
        width: '52px',
        height: '52px',
        borderRadius: '22px',
      },
    },
  },
});

const StyledImage = styled(RadixAvatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const StyledFallback = styled(RadixAvatar.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$accent100',
  color: '$white',
});

const StyledAvatarStatus = styled(Box, {
  position: 'absolute',
  height: '14px',
  width: '14px',
  backgroundColor: '#9DFF7A',
  bottom: -2,
  right: -2,
  borderRadius: '100000px',
  bd: '$grey500',
  borderWidth: '2px',
});

export const Avatar: React.FC<AvatarProps> = ({
  css,
  imageSrc,
  size = 'small',
  status,
  name,
}) => {
  const getInitials = (string: string) => {
    const names = string.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <StyledAvatarWrapper css={css as any}>
      <StyledAvatar size={size}>
        <StyledImage src={imageSrc} />
        <StyledFallback delayMs={1000}>{getInitials(name)}</StyledFallback>
      </StyledAvatar>
      {status && <StyledAvatarStatus />}
    </StyledAvatarWrapper>
  );
};
