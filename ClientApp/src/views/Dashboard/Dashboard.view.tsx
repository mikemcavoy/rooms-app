import React, { useEffect } from 'react';
import { Heading } from '../../components/core/Heading';
import { Box } from '../../components/core/Box';
import { Page } from '../../components/layout/Page';
import { QueueContainer } from '../../containers/QueueContainer';
import { SearchContainer } from '../../containers/Search';
import { PlayerContainer } from '../../containers/Player/';
import { useSocketConnection } from '../../context/socket/socket.provider';
import * as MultiRails from '../../components/layout/MultiRails';
import { PeopleContainer } from '../../containers/People';

export const DashboardView: React.FC = () => {
  const conn = useSocketConnection();
  const host = `${process.env.REACT_APP_SERVER_URL}/hubs/room`;

  useEffect(() => {
    conn.connect(host);
    return () => {
      conn.socket.current?.stop();
    };
  }, []);

  return (
    <Page>
      <MultiRails.Root>
        <MultiRails.Left>
          <PeopleContainer />
        </MultiRails.Left>
        <MultiRails.Main>
          <Heading size="h2" css={{ marginBottom: '$2' }}>
            Now Playing
          </Heading>
          <Box css={{ marginBottom: '$4' }}>
            <PlayerContainer />
          </Box>
          <Box css={{ marginBottom: '$4' }}>
            <SearchContainer />
          </Box>
          <Heading size="h2" css={{ marginBottom: '$2' }}>
            Up Next
          </Heading>
          <QueueContainer />
        </MultiRails.Main>
      </MultiRails.Root>
    </Page>
  );
};
