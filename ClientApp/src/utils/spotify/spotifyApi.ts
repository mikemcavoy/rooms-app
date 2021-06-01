import axios, { AxiosResponse, CancelToken } from 'axios';
import { User } from '../../context/authentication/authentication.types';
import { RoutePaths } from '../../routes';
import { api } from '../api';
import { Album, Artist, Track } from './spotifyApi.types';

const spotifyRequest = () => {
  const spotifyAccessToken = localStorage.getItem('spotifyAccessToken');
  const serverBaseUrl = `${process.env.REACT_APP_SERVER_URL}`;

  const axiosInstance = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
      Authorization: `Bearer ${spotifyAccessToken}`,
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
            localStorage.setItem('accessToken', refreshRes.data.accessToken);
            localStorage.setItem(
              'spotifyAccessToken',
              refreshRes.data.spotifyAccessToken,
            );
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

export const spotifyApi = {
  getTrackBySearchTerm: async (
    searchTerm: string,
    cancelToken?: CancelToken,
  ): Promise<Track[]> => {
    const limit = 10;
    const type = 'track';
    let transformedTrackObj: Track[] = [];
    try {
      const res = await spotifyRequest().get(
        `search?q=${searchTerm}&type=${type}&limit=${limit}`,
        {
          cancelToken,
        },
      );
      transformedTrackObj = res.data.tracks.items.map((track: any) => {
        const transformedArtistObj: Artist[] = track.artists.map(
          (artist: any) => {
            return <Artist>{
              id: artist.id,
              name: artist.name,
            };
          },
        );

        const transformedAlbumObj: Album = {
          id: track.album.id,
          name: track.album.name,
          images: track.album.images,
        };

        return <Track>{
          id: track.id,
          name: track.name,
          duration: track.duration_ms,
          artists: transformedArtistObj,
          album: transformedAlbumObj,
        };
      });
    } catch (error) {
      if (axios.isCancel(error)) return Promise.resolve(error);
    }

    return transformedTrackObj;
  },
  startPlayback: async (
    trackId: string,
    position: number,
    deviceId: string,
  ) => {
    const body = {
      uris: [`spotify:track:${trackId}`],
      position_ms: position,
    };
    try {
      await spotifyRequest().put(`me/player/play?device_id=${deviceId}`, body);
    } catch (error) {
      console.log(error);
    }
  },
  pausePlayback: async (deviceId: string) => {
    try {
      await spotifyRequest().put(`me/player/pause?device_id=${deviceId}`, {});
    } catch (error) {
      console.log(error);
    }
  },
  getCurrentUserDetails: async (): Promise<User> => {
    try {
      const res = await spotifyRequest().get('me');
      const transformedUserObj: User = {
        userId: res.data.id,
        name: res.data.display_name,
        profileImage: res.data.images[0]?.url,
      };
      return transformedUserObj;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
};
