/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import {
  useRoomState,
  useRoomDispatch,
} from '../../context/room/room.provider';
import { getCurrentlyPlaying } from '../../context/room/room.actions';
import { Player } from '../../components/ui/Player';
import { WebPlayer, WebPlayerCallback } from './Player.types';
import { spotifyApi } from '../../utils/spotify/spotifyApi';
import { usePlaybackPosition } from '../../hooks/usePlaybackPosition';
import { api } from '../../utils/api';

export const PlayerContainer: React.FC = () => {
  const { currentlyPlaying } = useRoomState();
  const dispatch = useRoomDispatch();
  let webPlayer: WebPlayer;
  let accessToken = localStorage.getItem('sat');
  const [deviceReady, setDeviceReady] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [paused, setPaused] = useState<boolean>(true);

  const track = currentlyPlaying.track;
  const startedAt = currentlyPlaying.startedAt;
  const trackDuration = track?.duration ? track?.duration : 0;
  const { currentPositionMs } = usePlaybackPosition(trackDuration, startedAt);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      if (!window.onSpotifyWebPlaybackSDKReady) {
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = initializeWebPlayer;
      } else {
        initializeWebPlayer();
      }
      loadWebPlayerScript();
      getCurrentlyPlaying(dispatch);
    })();
    return () => {
      // @ts-ignore
      webPlayer.disconnect();
    };
  }, [accessToken]);

  useEffect(() => {
    if (deviceReady && track) {
      if (paused) {
        spotifyApi.pausePlayback(deviceId as string);
      } else {
        spotifyApi.startPlayback(
          track.id,
          currentPositionMs,
          deviceId as string,
        );
      }
    }
  }, [paused, currentlyPlaying]);

  const loadWebPlayerScript = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const existingScriptTag = document.getElementById('spotify-player');

      if (!existingScriptTag) {
        const scriptTag = document.createElement('script');

        scriptTag.id = 'spotify-player';
        scriptTag.type = 'text/javascript';
        scriptTag.async = false;
        scriptTag.defer = true;
        scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';

        scriptTag.onload = () => resolve();
        scriptTag.onerror = (error: any) =>
          reject(new Error(`Failed to load script: ${error}`));

        document.head.appendChild(scriptTag);
      } else {
        resolve();
      }
    });
  };

  const handleControlClick = () => {
    if (deviceReady) {
      setPaused(!paused);
    }
  };

  const initializeWebPlayer = () => {
    // @ts-ignore
    webPlayer = new window.Spotify.Player({
      name: 'Rooms',
      getOAuthToken: (cb: WebPlayerCallback) => {
        const token = accessToken as string;
        cb(token);
      },
    });

    webPlayer.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });
    webPlayer.addListener('authentication_error', async () => {
      const res = await api.refreshAccessTokens();
      localStorage.setItem('at', res.data.accessToken);
      localStorage.setItem('sat', res.data.spotifyAccessToken);
      accessToken = res.data.spotifyAccessToken;
    });
    webPlayer.addListener('account_error', ({ message }) => {
      console.error(message);
    });
    webPlayer.addListener('playback_error', ({ message }) => {
      console.error(message);
    });

    // Playback status updates
    webPlayer.addListener('player_state_changed', (state) => {
      if (state) setPaused(state.paused as boolean);
    });

    // Ready
    webPlayer.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      setDeviceId(device_id);
      setDeviceReady(true);
    });

    // Not Ready
    webPlayer.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
      setDeviceReady(false);
    });

    // Connect to the player!
    webPlayer.connect();
  };

  return (
    <Player
      currentlyPlaying={currentlyPlaying}
      paused={paused}
      onControlClick={handleControlClick}
    />
  );
};
