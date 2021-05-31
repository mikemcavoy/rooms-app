import { CSS } from '../../../theme';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import { Track } from '../../../utils/spotify/spotifyApi.types';

const DEFAULT_TAG = 'div';

type TrackListCSSProp = { css?: CSS };
export type TrackListOwnProps = TrackListCSSProp & {
  tracks: Track[];
};

export type TrackListComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  TrackListOwnProps
>;
