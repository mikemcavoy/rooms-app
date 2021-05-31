import { MutableRefObject } from 'react';
import { HubConnection } from '@microsoft/signalr';

export interface SocketApi {
  socket: MutableRefObject<HubConnection | null>;
  connect: (host: string) => void;
}

export enum SocketEventListeners {
  UPDATE_USERS = 'UpdateUsers',
  DISCONNECTED = 'disconnected',
  UPDATE_QUEUE = 'UpdateQueue',
  UPDATE_CURRENTLY_PLAYING = 'UpdateCurrentlyPlaying',
}

export enum SocketEventEmitters {
  JOIN_ROOM = 'JoinRoom',
}
