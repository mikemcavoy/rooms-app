import React from 'react';
import { styled } from '../../../theme';
import { msToMin } from '../../../utils/helpers';
import { Track } from '../../../utils/spotify/spotifyApi.types';
import { Box } from '../../core/Box';
import { Card } from '../../core/Card';
import { Text } from '../../core/Text';
import { TrackListComponent } from './TrackList.types';

const StyledTrackListCard = styled(Card, {
  px: '$3',
  py: '$2',
  marginBottom: '$2',
  bd: '$grey400',
  transition: '0.25s',
  '&:hover': {
    bd: '$grey300',
  },
});

const StyledTrackRow = styled(Box, {
  display: 'grid',
  gridColumnGap: '$2',
  gridTemplateColumns: '20px 50px 1fr auto',
  backgroundColor: '$grey400',
  border: 'none',
  width: '100%',
});

const StyledAlbumImage = styled('img', {
  height: '50px',
});

const StyledContentStack = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
});

const StyledFlexText = styled(Box, {
  display: 'flex',
  alignItems: 'center',
});

const StyledEmptyTracksCard = styled(Card, {
  textAlign: 'center',
});

export const TrackList = React.forwardRef((props, forwardRef) => {
  const { tracks, ...trackListProps } = props;
  const trackList = tracks.map((track: Track, index) => {
    const durationInMin = msToMin(track.duration);
    const trackNo = index + 1 < 10 ? '0' + (index + 1) : index + 1;
    return (
      <StyledTrackListCard key={track.id}>
        <StyledTrackRow>
          <StyledFlexText>
            <Text size="small" css={{ color: '$grey200' }}>
              {trackNo}
            </Text>
          </StyledFlexText>
          <StyledAlbumImage src={track.album.images[0].url} />
          <StyledContentStack>
            <Text size="small" bold>
              {track.name}
            </Text>
            <Text size="small" css={{ color: '$grey200' }}>
              {track.artists[0].name}
            </Text>
          </StyledContentStack>
          <StyledFlexText>
            <Text size="small" css={{ color: '$grey200' }}>
              {durationInMin}
            </Text>
          </StyledFlexText>
        </StyledTrackRow>
      </StyledTrackListCard>
    );
  });
  return (
    <Box {...trackListProps}>
      {tracks.length ? (
        <Box>{trackList}</Box>
      ) : (
        <StyledEmptyTracksCard>
          <Text size="small" css={{ color: '$grey200' }}>
            Queue is empty.
          </Text>
        </StyledEmptyTracksCard>
      )}
    </Box>
  );
}) as TrackListComponent;
