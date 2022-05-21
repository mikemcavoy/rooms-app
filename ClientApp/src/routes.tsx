import { Route } from './containers/ApplicationRoute/ApplicationRoute.types';
import { LoginView } from './views/Login';
import { DashboardView } from './views/Dashboard';
import { AuthenticatingView } from './views/Authenticating';

export enum RoutePaths {
  NOT_FOUND = '*',
  LOGIN = '/login',
  AUTHENTICATING = '/authenticating',
  DASHBOARD = '/dashboard',
}

export const Routes: Route[] = [
  {
    path: RoutePaths.LOGIN,
    component: LoginView,
    isPrivate: false,
  },
  {
    path: RoutePaths.AUTHENTICATING,
    component: AuthenticatingView,
    isPrivate: false,
  },
  {
    path: RoutePaths.DASHBOARD,
    component: DashboardView,
    isPrivate: true,
  },
  {
    path: RoutePaths.NOT_FOUND,
    component: DashboardView,
    isPrivate: true,
    exact: true,
  },
];
