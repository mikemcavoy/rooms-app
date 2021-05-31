import React, { forwardRef } from 'react';
import { styled } from '../../../theme';
import { IconComponent } from './Icon.types';
import { Icons } from './icons';

const StyledSvg = styled('svg', {
  height: '20px',
  width: '20px',
});

export const Icon = React.forwardRef((props, forwardRef) => {
  const { fill = '#fff', icon, ...iconProps } = props;
  return (
    <StyledSvg
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...iconProps}
      ref={forwardRef}
    >
      <path fill={fill} d={Icons[icon]} fillRule="evenodd" />
    </StyledSvg>
  );
}) as IconComponent;
