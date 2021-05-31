import { CSS } from '../../../theme';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import { CurrentlyPlaying } from 'src/context/room/room.types';

const DEFAULT_TAG = 'div';

type PlayerCSSProp = { css?: CSS };
export type PlayerOwnProps = PlayerCSSProp & {
  currentlyPlaying: CurrentlyPlaying;
  paused: boolean;
  onControlClick(): void;
};

export type PlayerComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  PlayerOwnProps
>;
