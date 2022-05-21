import React, { useEffect } from 'react';
import { useAuthenticationDispatch, useAuthenticationState } from '../../context/authentication/authentication.provider';
import { Page } from '../../components/layout/Page';
import { RoutePaths } from '../../routes';
import { useHistory } from 'react-router';
import { getCurrentUser } from '../../context/authentication/authentication.actions';
import { api } from '../../utils/api';
import { useLocation } from 'react-router-dom';

export const AuthenticatingView = () => {
  const { isAuthenticated } = useAuthenticationState();
  const dispatch = useAuthenticationDispatch();
  const history = useHistory();
  const search = useLocation().search;

  useEffect(()=> {
    isAuthenticated && history.push(RoutePaths.DASHBOARD);

    (async () => {
      const code = new URLSearchParams(search).get('code');
      if(code){
        const tokenObj = (await api.confirmLogin(code)).data
        tokenObj.accessToken && localStorage.setItem('at', tokenObj.accessToken);
        tokenObj.spotifyAccessToken && localStorage.setItem('sat', tokenObj.spotifyAccessToken);
        getCurrentUser(dispatch)
      } else {
        history.push(RoutePaths.LOGIN);
      }
      
    })()
  }, [isAuthenticated])

  return (
    <Page></Page>
  );
};
