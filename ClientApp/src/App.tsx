import React from 'react';
import { Switch } from 'react-router-dom';
import { ApplicationRouteContainer } from './containers/ApplicationRoute';
import { Route as IRoute } from './containers/ApplicationRoute/ApplicationRoute.types';
import { AuthenticationProvider } from './context/authentication/authentication.provider';
import { RoomProvider } from './context/room/room.provider';
import { SocketProvider } from './context/socket/socket.provider';
import { Routes } from './routes';
import { globalStyles } from './theme/globalStyles';

function App() {
  globalStyles();
  return (
    <AuthenticationProvider>
      <RoomProvider>
        <SocketProvider>
          <Switch>
            {Routes.map((route: IRoute) => (
              <ApplicationRouteContainer
                key={route.path}
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            ))}
          </Switch>
        </SocketProvider>
      </RoomProvider>
    </AuthenticationProvider>
  );
}

export default App;
