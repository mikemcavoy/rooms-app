import React from 'react';
import { HeaderContainer } from '../../../containers/Header';
import { useAuthenticationState } from '../../../context/authentication/authentication.provider';
import { Box } from '../../core/Box';

export const Page: React.FC<{}> = ({ children }) => {
  const { isAuthenticated } = useAuthenticationState();
  return (
    <Box
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '800px',
        mx: 'auto',
      }}
    >
      {isAuthenticated ? <HeaderContainer /> : null}
      <main>
        <Box css={{ height: '100%', px: '$3', paddingTop: '$5' }}>
          {children}
        </Box>
      </main>
    </Box>
  );
};
