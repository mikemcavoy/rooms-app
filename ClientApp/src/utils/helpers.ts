export const msToMin = (ms: number) => {
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor(((ms % 360000) % 60000) / 1000);
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  return minutes + ':' + formattedSeconds;
};
