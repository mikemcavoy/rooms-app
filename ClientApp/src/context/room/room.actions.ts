import { api } from '../../utils/api';
import { User } from '../authentication/authentication.types';
import {
  CurrentlyPlaying,
  QueueItem,
  RoomActionTypes,
  RoomDispatch,
} from './room.types';

export const updateRoomUsers = async (
  dispatch: RoomDispatch,
  users: User[],
) => {
  dispatch({ type: RoomActionTypes.UPDATE_USERS, payload: users });
};

export const updateRoomQueue = async (
  dispatch: RoomDispatch,
  queueItems: QueueItem[],
) => {
  dispatch({ type: RoomActionTypes.UPDATE_QUEUE, payload: queueItems });
};

export const getRoomQueue = async (dispatch: RoomDispatch) => {
  const queue = await (await api.getRoomQueue()).data;
  dispatch({ type: RoomActionTypes.GET_QUEUE_SUCCESS, payload: queue });
};

export const updateCurrentlyPlaying = async (
  dispatch: RoomDispatch,
  currentlyPlaying: CurrentlyPlaying,
) => {
  dispatch({
    type: RoomActionTypes.UPDATE_CURRENTLY_PLAYING,
    payload: currentlyPlaying,
  });
};

export const getCurrentlyPlaying = async (dispatch: RoomDispatch) => {
  const currentlyPlaying = await (await api.getCurrentlyPlaying()).data;
  dispatch({
    type: RoomActionTypes.GET_CURRENTLY_PLAYING_SUCCESS,
    payload: currentlyPlaying,
  });
  return Promise.resolve();
};
