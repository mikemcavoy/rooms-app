import { useEffect, useState } from 'react';
import { msToMin } from '../utils/helpers';

export const usePlaybackPosition = (
  trackDuration: number,
  trackStartTime: number,
) => {
  const [currentPositionMs, setCurrentPositionMs] = useState<number>(0);
  const [playbackPercent, setPlaybackPercent] = useState<number>(0);
  const [currentPositionMin, setCurrentPositionMin] = useState<string>('0:00');

  const trackEndTime = trackStartTime + trackDuration;

  const handleTick = () => {
    const delta = trackEndTime - Date.now();
    if (delta > 0) {
      const remaining = trackDuration - delta;
      const percent = (remaining / trackDuration) * 100;
      setCurrentPositionMs(remaining);
      setCurrentPositionMin(msToMin(remaining));
      setPlaybackPercent(percent);
    } else {
      setCurrentPositionMs(0);
      setCurrentPositionMin('0:00');
      setPlaybackPercent(0);
    }
  };

  useEffect(() => {
    const tick = setInterval(handleTick, 1000);
    return () => {
      clearInterval(tick);
    };
  }, [trackStartTime]);

  return { currentPositionMs, currentPositionMin, playbackPercent };
};
