import React, { useEffect } from 'react';
import { useAuthenticationState } from '../../context/authentication/authentication.provider';
import { Box } from '../../components/core/Box';
import { Button } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { Heading } from '../../components/core/Heading';
import { Text } from '../../components/core/Text';
import { Page } from '../../components/layout/Page';
import { RoutePaths } from '../../routes';
import { useHistory } from 'react-router';

export const LoginView = () => {
  const { isAuthenticated } = useAuthenticationState();
  const history = useHistory();

  useEffect(() => {
    isAuthenticated && history.push(RoutePaths.DASHBOARD);
  }, []);

  const handleLogin = () =>
    (location.href = `${process.env.REACT_APP_SERVER_URL}/api/auth/login`);

  return (
    <Page>
      <Box
        css={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          css={{
            display: 'inline-block',
            textAlign: 'center',
            px: '$4',
            maxWidth: '350px',
          }}
        >
          <Heading size="h1" css={{ marginBottom: '$1' }}>
            Rooms 💃
          </Heading>
          <Text
            size="paragraph"
            css={{ marginBottom: '$5', color: '$grey200' }}
          >
            Sign in via Spotify and stream your favourite songs together.
          </Text>
          <Button fullWidth onClick={handleLogin}>
            Login via Spotify
          </Button>
        </Card>
      </Box>
    </Page>
  );
};
