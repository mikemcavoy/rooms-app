import React from 'react';
import { Box } from '../../core/Box';
import { Text } from '../../core/Text';
import { UserListProps } from './UserList.types';
import { styled } from '../../../theme';
import { Avatar } from '../../core/Avatar';
import { User } from '../../../context/authentication/authentication.types';

export const StyledUser = styled(Box, {
  display: 'flex',
  alignItems: 'center',
});

export const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <Box>
      {users.map((user: User) => {
        return (
          <StyledUser
            key={user.userId}
            css={{ marginTop: '$4', '&:first-of-type': { marginTop: '0px' } }}
          >
            <Avatar imageSrc={user.profileImage} name={user.name} status />
            <Text css={{ paddingLeft: '$3' }} size="small" bold>
              {user.name}
            </Text>
          </StyledUser>
        );
      })}
    </Box>
  );
};
