import axios, { AxiosResponse } from 'axios';
import { QueueItem } from 'src/context/room/room.types';
import { RoutePaths } from '../routes';

const apiRequest = () => {
  const accessToken = localStorage.getItem('at');
  const serverBaseUrl = `${process.env.REACT_APP_SERVER_URL}`;

  const axiosInstance = axios.create({
    baseURL: serverBaseUrl,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: any) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshRes = await axios.get(
            `${serverBaseUrl}/api/auth/refresh-tokens`,
            { withCredentials: true },
          );
          if (refreshRes.status === 200) {
            localStorage.setItem('at', refreshRes.data.accessToken);
            localStorage.setItem('sat', refreshRes.data.spotifyAccessToken);
            originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (error: any) {
          return Promise.reject(error);
        }
      } else if (
        error.response.status === 401 &&
        error.response.url === 'api/auth/refresh-tokens'
      ) {
        window.location.href = RoutePaths.LOGIN;
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const api = {
  logoutUser: async (): Promise<AxiosResponse<any>> => {
    return apiRequest().get('api/auth/logout');
  },
  refreshAccessTokens: async (): Promise<AxiosResponse<any>> => {
    return apiRequest().get('/api/auth/refresh-tokens');
  },
  postTrackToQueue: async (queueItemData: QueueItem) => {
    return apiRequest().post('/api/room/queue', queueItemData);
  },
  getRoomQueue: async () => {
    return apiRequest().get('/api/room/queue');
  },
  getCurrentlyPlaying: async () => {
    return apiRequest().get('/api/room/currently-playing');
  },
};
