export type WebPlayerCallback = (token: string) => void;

export type WebPlayerMethod<T = void> = () => Promise<T>;

export type WebPlayerStatuses = 'ready' | 'not_ready';

export type WebPlayerStates = 'player_state_changed';

export type WebPlayerErrors =
  | 'initialization_error'
  | 'authentication_error'
  | 'account_error'
  | 'playback_error';

export interface WebPlayerError {
  message: string;
}

export interface WebPlayerStatus {
  // eslint-disable-next-line camelcase
  device_id: string;
}

export interface WebPlayer {
  addListener: {
    (event: WebPlayerErrors, cb: (err: WebPlayerError) => void): boolean;
    (event: WebPlayerStates, cb: (state: any) => void): boolean;
    (event: WebPlayerStatuses, cb: (status: WebPlayerStatus) => void): boolean;
  };
  connect: WebPlayerMethod;
}
