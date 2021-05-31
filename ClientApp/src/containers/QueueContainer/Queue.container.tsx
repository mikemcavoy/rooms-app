import React, { useEffect } from 'react';
import { getRoomQueue } from '../../context/room/room.actions';
import { TrackList } from '../../components/ui/TrackList';
import {
  useRoomDispatch,
  useRoomState,
} from '../../context/room/room.provider';

export const QueueContainer: React.FC = () => {
  const { queue } = useRoomState();
  const dispatch = useRoomDispatch();

  useEffect(() => {
    getRoomQueue(dispatch);
  }, []);

  const tracks = queue.map((item) => {
    return item.track;
  });
  return <TrackList tracks={tracks} />;
};
