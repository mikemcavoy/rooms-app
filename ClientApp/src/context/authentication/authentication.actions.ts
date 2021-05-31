import axios from 'axios';
import { spotifyApi } from '../../utils/spotify/spotifyApi';
import { api } from '../../utils/api';
import {
  AuthenticationActionTypes,
  AuthenticationDispatch,
  User,
} from './authentication.types';

export const getCurrentUser = async (dispatch: AuthenticationDispatch) => {
  try {
    dispatch({ type: AuthenticationActionTypes.AUTH_ATTEMPT });
    const userDetails = await spotifyApi.getCurrentUserDetails();
    dispatch({
      type: AuthenticationActionTypes.AUTH_SUCCESS,
      payload: userDetails,
    });
  } catch (error) {
    dispatch({ type: AuthenticationActionTypes.AUTH_ERROR });
  }
};

export const logoutUser = async (dispatch: AuthenticationDispatch) => {
  try {
    dispatch({ type: AuthenticationActionTypes.LOGOUT_ATTEMPT });
    await api.logoutUser();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('spotifyAccessToken');
    dispatch({ type: AuthenticationActionTypes.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: AuthenticationActionTypes.LOGOUT_ERROR });
  }
};
