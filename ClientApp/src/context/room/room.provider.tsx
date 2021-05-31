import React, { createContext, useContext, useReducer } from 'react';
import { roomReducer } from './room.reducer';
import { RoomState, RoomDispatch } from './room.types';

const initialState: RoomState = {
  users: [],
  queue: [],
  currentlyPlaying: {
    track: null,
    user: null,
    startedAt: 0,
  },
};

const RoomStateContext = createContext<RoomState>(initialState);
const RoomDispatchContext = createContext<RoomDispatch | undefined>(undefined);

export const RoomProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(roomReducer, initialState);

  return (
    <RoomStateContext.Provider value={state}>
      <RoomDispatchContext.Provider value={dispatch}>
        {children}
      </RoomDispatchContext.Provider>{' '}
    </RoomStateContext.Provider>
  );
};

export const useRoomState = () => {
  const context = useContext(RoomStateContext);
  if (context === undefined) {
    throw new Error(
      'useRoomState must be used within a RoomStateContext Provider',
    );
  }
  return context;
};

export const useRoomDispatch = () => {
  const context = useContext(RoomDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useRoomDispatch must be used within a RoomDispatchContext Provider',
    );
  }
  return context;
};
