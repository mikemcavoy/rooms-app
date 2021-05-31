import React from 'react';
import { MenuItem } from '../../ui/ProfileMenu/ProfileMenu.types';
import { Box } from '../../core/Box';
import { ProfileMenu } from '../../ui/ProfileMenu';
import { HeaderProps } from './Header.types';
import { useHistory } from 'react-router';
import { RoutePaths } from '../../../routes';
import { useAuthenticationDispatch } from '../../../context/authentication/authentication.provider';
import { logoutUser } from '../../../context/authentication/authentication.actions';

export const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const dispatch = useAuthenticationDispatch();

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  const profileMenuItems: MenuItem[] = [
    {
      buttonText: 'Logout',
      buttonAction: handleLogout,
    },
  ];

  return (
    <Box
      as="header"
      css={{ display: 'flex', py: '$3', px: '$2', justifyContent: 'flex-end' }}
    >
      <ProfileMenu
        profileImage={currentUser.profileImage}
        name={currentUser.name}
        menuItems={profileMenuItems}
      />
    </Box>
  );
};
