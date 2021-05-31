import { Track } from '../../utils/spotify/spotifyApi.types';
import { User } from '../authentication/authentication.types';

export interface RoomState {
  users: User[];
  queue: QueueItem[];
  currentlyPlaying: CurrentlyPlaying;
}

export interface QueueItem {
  track: Track;
  user: User;
}

export interface CurrentlyPlaying {
  track: Track | null;
  user: User | null;
  startedAt: number;
}

export enum RoomActionTypes {
  UPDATE_USERS = 'update_users',
  UPDATE_QUEUE = 'update_queue',
  GET_QUEUE_SUCCESS = 'get_queue_success',
  UPDATE_CURRENTLY_PLAYING = 'update_currently_playing',
  GET_CURRENTLY_PLAYING_SUCCESS = 'get_currently_playing_success',
}

export type RoomAction =
  | {
      type: RoomActionTypes.UPDATE_USERS;
      payload: User[];
    }
  | {
      type: RoomActionTypes.UPDATE_QUEUE;
      payload: QueueItem[];
    }
  | {
      type: RoomActionTypes.GET_QUEUE_SUCCESS;
      payload: QueueItem[];
    }
  | {
      type: RoomActionTypes.UPDATE_CURRENTLY_PLAYING;
      payload: CurrentlyPlaying;
    }
  | {
      type: RoomActionTypes.GET_CURRENTLY_PLAYING_SUCCESS;
      payload: CurrentlyPlaying;
    };

export type RoomDispatch = (action: RoomAction) => void;
