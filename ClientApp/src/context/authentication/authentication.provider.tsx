import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { authenticationReducer } from './authentication.reducer';
import { getCurrentUser } from './authentication.actions';
import {
  AuthenticationState,
  AuthenticationDispatch,
} from './authentication.types';
import { Box } from '../../components/core/Box';
import { useLocation } from 'react-router';

const initialState: AuthenticationState = {
  isLoading: false,
  isAuthenticated: false,
  currentUser: null,
};

const AuthenticationStateContext =
  createContext<AuthenticationState>(initialState);
const AuthenicationDispatchContext =
  createContext<AuthenticationDispatch | undefined>(undefined);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authenticationReducer, initialState);

  useEffect(() => {
    const accessToken = localStorage.getItem('at');
    const spotifyAccessToken = localStorage.getItem('sat');

    accessToken && spotifyAccessToken && getCurrentUser(dispatch);
  }, []);

  return (
    <AuthenticationStateContext.Provider value={state}>
      <AuthenicationDispatchContext.Provider value={dispatch}>
        {state.isLoading ? <Box></Box> : children}
      </AuthenicationDispatchContext.Provider>{' '}
    </AuthenticationStateContext.Provider>
  );
};

export const useAuthenticationState = () => {
  const context = useContext(AuthenticationStateContext);
  if (context === undefined) {
    throw new Error(
      'useAuthenticationState must be used within a AuthenticationStateContext Provider',
    );
  }
  return context;
};

export const useAuthenticationDispatch = () => {
  const context = useContext(AuthenicationDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useAuthenticationDispatch must be used within a AuthenticationDispatchContext Provider',
    );
  }
  return context;
};
