import { CSS } from '../../../theme';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import { Track } from '../../../utils/spotify/spotifyApi.types';

const DEFAULT_TAG = 'div';

type SearchResultsCSSProp = { css?: CSS };
export type SearchResultsOwnProps = SearchResultsCSSProp & {
  loading?: boolean;
  tracks: Track[] | [];
  handleTrackSelection(trackId: string): void;
};

export type SearchResultsComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  SearchResultsOwnProps
>;
