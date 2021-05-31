export type User = {
  userId: string;
  name: string;
  profileImage: string;
};

export interface AuthenticationState {
  isLoading: boolean;
  isAuthenticated: boolean;
  currentUser: User | null;
}

export enum AuthenticationActionTypes {
  AUTH_ATTEMPT = 'auth_attempt',
  AUTH_SUCCESS = 'auth_success',
  AUTH_ERROR = 'auth_error',
  LOGOUT_ATTEMPT = 'logout_attempt',
  LOGOUT_SUCCESS = 'logout_success',
  LOGOUT_ERROR = 'logout_error',
}

export type AuthenticationAction =
  | { type: AuthenticationActionTypes.AUTH_ATTEMPT }
  | { type: AuthenticationActionTypes.AUTH_SUCCESS; payload: User }
  | { type: AuthenticationActionTypes.AUTH_ERROR }
  | { type: AuthenticationActionTypes.LOGOUT_ATTEMPT }
  | { type: AuthenticationActionTypes.LOGOUT_SUCCESS }
  | { type: AuthenticationActionTypes.LOGOUT_ERROR };

export type AuthenticationDispatch = (action: AuthenticationAction) => void;
