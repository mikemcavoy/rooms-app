import {
  AuthenticationState,
  AuthenticationAction,
  AuthenticationActionTypes,
} from './authentication.types';

export const authenticationReducer = (
  state: AuthenticationState,
  action: AuthenticationAction,
): AuthenticationState => {
  switch (action.type) {
    case AuthenticationActionTypes.AUTH_ATTEMPT: {
      return { ...state, isLoading: true };
    }
    case AuthenticationActionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        currentUser: action.payload,
      };
    }
    case AuthenticationActionTypes.AUTH_ERROR: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        currentUser: null,
      };
    }
    case AuthenticationActionTypes.LOGOUT_ATTEMPT: {
      return { ...state, isLoading: true };
    }
    case AuthenticationActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        currentUser: null,
      };
    }
    case AuthenticationActionTypes.LOGOUT_ERROR: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        currentUser: null,
      };
    }
    default: {
      throw new Error('Invalid action type');
    }
  }
};
