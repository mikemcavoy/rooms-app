import React, { createContext, useContext, useRef } from 'react';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { useAuthenticationState } from '../authentication/authentication.provider';
import {
  updateRoomUsers,
  updateRoomQueue,
  updateCurrentlyPlaying,
} from '../room/room.actions';
import { useRoomDispatch } from '../room/room.provider';
import {
  SocketApi,
  SocketEventEmitters,
  SocketEventListeners,
} from './socket.types';
import { User } from '../authentication/authentication.types';
import { CurrentlyPlaying, QueueItem } from '../room/room.types';

const SocketConnectionContext = createContext<SocketApi | undefined>(undefined);

export const SocketProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuthenticationState();
  const dispatch = useRoomDispatch();
  const socket = useRef<HubConnection | null>(null);

  const connect = async (host: string) => {
    if (socket.current !== null) {
      await socket.current.stop();
    }
    socket.current = new HubConnectionBuilder()
      .withUrl(host)
      .withAutomaticReconnect()
      .build();

    await socket.current.start();

    await socket.current.send('Connect');

    socket.current.on('Connected', (message) => {
      console.log(message);
    });

    socket.current.send(SocketEventEmitters.JOIN_ROOM, currentUser);

    socket.current.on(SocketEventListeners.UPDATE_USERS, (users: User[]) => {
      updateRoomUsers(dispatch, users);
    });

    socket.current.on(
      SocketEventListeners.UPDATE_CURRENTLY_PLAYING,
      (currentlyPlaying: CurrentlyPlaying) => {
        updateCurrentlyPlaying(dispatch, currentlyPlaying);
      },
    );

    socket.current.on(
      SocketEventListeners.UPDATE_QUEUE,
      (queueItems: QueueItem[]) => {
        updateRoomQueue(dispatch, queueItems);
      },
    );
  };

  const socketApi: SocketApi = { socket, connect };

  return (
    <SocketConnectionContext.Provider value={socketApi}>
      {children}
    </SocketConnectionContext.Provider>
  );
};

export const useSocketConnection = () => {
  const context = useContext(SocketConnectionContext);
  if (context === undefined) {
    throw new Error(
      'useSocketConnection must be used within a SocketConnectionContext Provider',
    );
  }
  return context;
};
