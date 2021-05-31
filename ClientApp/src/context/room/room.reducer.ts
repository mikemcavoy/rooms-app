import { RoomState, RoomAction, RoomActionTypes } from './room.types';

export const roomReducer = (
  state: RoomState,
  action: RoomAction,
): RoomState => {
  switch (action.type) {
    case RoomActionTypes.UPDATE_USERS: {
      return { ...state, users: action.payload };
    }
    case RoomActionTypes.UPDATE_QUEUE: {
      return { ...state, queue: action.payload };
    }
    case RoomActionTypes.GET_QUEUE_SUCCESS: {
      return { ...state, queue: action.payload };
    }
    case RoomActionTypes.UPDATE_CURRENTLY_PLAYING: {
      return { ...state, currentlyPlaying: action.payload };
    }
    case RoomActionTypes.GET_CURRENTLY_PLAYING_SUCCESS: {
      return { ...state, currentlyPlaying: action.payload };
    }
    default: {
      throw new Error('Invalid action type');
    }
  }
};
