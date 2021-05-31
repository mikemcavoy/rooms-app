import React from 'react';
import { Heading } from '../../components/core/Heading';
import { Text } from '../../components/core/Text';
import { Box } from '../../components/core/Box';
import { UserList } from '../../components/ui/UserList';
import { useRoomState } from '../../context/room/room.provider';

export const PeopleContainer = () => {
  const { users } = useRoomState();
  return (
    <Box>
      <Heading size="h2" css={{ marginBottom: '$2' }}>
        People
      </Heading>
      <Text css={{ color: '$grey200', marginBottom: '$3' }}>
        Online ({users.length})
      </Text>
      <UserList users={users} />
    </Box>
  );
};
