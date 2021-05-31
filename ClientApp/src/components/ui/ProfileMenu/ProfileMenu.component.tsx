import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from '../../../theme';
import { Text } from '../../core/Text';
import { Avatar } from '../../core/Avatar';
import { Icon } from '../../core/Icon';
import { ProfileMenuProps } from './ProfileMenu.types';
import { Box } from '../../core/Box';

const StyledTrigger = styled(DropdownMenu.Trigger, {
  display: 'inline-flex',
  backgroundColor: 'transparent',
  border: 'none',
  marginLeft: '$3',
  padding: '0px',
  cursor: 'pointer',
  '&[data-state="open"]': {
    '& svg': {
      transform: 'rotate(180deg)',
    },
  },
});

const StyledContent = styled(DropdownMenu.Content, {
  minWidth: '85px',
  backgroundColor: '$grey400',
  bd: '$grey300',
  borderRadius: '$2',
  padding: '$1',
  marginTop: '$2',
});

const StyledItem = styled(DropdownMenu.Item, {
  fontSize: '$small',
  fontWeight: '$regular',
  color: '$grey200',
  px: '$2',
  py: '$1',
  borderRadius: '$2',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none',
    backgroundColor: '$grey300',
    color: '$white',
  },
});

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  css,
  profileImage,
  name,
  menuItems = [],
}) => {
  const menuItemElements = menuItems.map((item, index) => {
    return (
      <StyledItem key={index} onSelect={() => item.buttonAction()}>
        {item.buttonText}
      </StyledItem>
    );
  });

  return (
    <Box css={css as any}>
      <DropdownMenu.Root>
        <Avatar size="medium" imageSrc={profileImage} name={name} />
        <StyledTrigger>
          <Text bold={true} css={{ paddingRight: '$1' }}>
            {name}
          </Text>
          <Icon icon="chevronDown" fill="#607283" />
        </StyledTrigger>
        <StyledContent align="end">
          {menuItemElements.length && menuItemElements}
        </StyledContent>
      </DropdownMenu.Root>
    </Box>
  );
};
