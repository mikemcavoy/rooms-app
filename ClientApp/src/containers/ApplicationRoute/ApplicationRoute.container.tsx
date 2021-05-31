import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthenticationState } from '../../context/authentication/authentication.provider';
import { RoutePaths } from '../../routes';
import { Route as IRoute } from './ApplicationRoute.types';

export const ApplicationRouteContainer: React.FC<IRoute> = ({
  path,
  component: Component,
  isPrivate,
  ...rest
}) => {
  const { isAuthenticated } = useAuthenticationState();
  return (
    <Route path={path} {...rest}>
      {isPrivate && !isAuthenticated ? (
        <Redirect to={{ pathname: RoutePaths.LOGIN }} />
      ) : (
        <Component />
      )}
    </Route>
  );
};
