import React from 'react';
import { styled } from '../../../theme';
import { SearchResultsComponent } from './SearchResults.types';
import { Box } from '../../core/Box';
import { Card } from '../../core/Card';
import { Text } from '../../core/Text';
import { Track } from '../../../utils/spotify/spotifyApi.types';
import { Spinner } from '../../core/Spinner';
import { Icon } from '../../core/Icon';

const StyledResultWrapper = styled(Box, {
  position: 'absolute',
  width: '100%',
  '&:before': {
    content: '',
    position: 'absolute',
    width: '100%',
    height: '40px',
    zIndex: '1',
    bottom: '-35px',
    linearGradient:
      '180deg, rgba(13,18,23,1) 20%, rgba(13,18,23,0.8981792546120011) 40%, rgba(13,18,23,0.5844537644159227) 70%, rgba(13,18,23,0) 100%',
  },
});

const StyledResult = styled('button', {
  backgroundColor: '$grey400',
  border: 'none',
  padding: '$1',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '$1',
  width: '100%',
  borderRadius: '$2',
  transition: '0.2s',
  '&:hover': {
    backgroundColor: '$grey300',
    cursor: 'pointer',
  },
});

const StyledAlbumImage = styled('img', {
  height: '40px',
});

const StyledContent = styled(Box, {
  display: 'flex',
  width: '100%',
  px: '$2',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const SearchResults = React.forwardRef((props, forwardRef) => {
  const {
    tracks,
    loading = false,
    handleTrackSelection,
    ...SearchResultProps
  } = props;

  let results;

  if (tracks.length) {
    results = tracks.map((track: Track) => (
      <Box key={track.id}>
        <StyledResult
          onClick={() => {
            handleTrackSelection(track.id);
          }}
        >
          <StyledAlbumImage src={track.album.images[0].url} />
          <StyledContent>
            <Text size="small">{track.name}</Text>
            <Text size="small" css={{ color: '$grey200' }}>
              {track.artists[0].name}
            </Text>
          </StyledContent>
          <Icon icon="plus" fill="#c9d6e2" css={{ paddingRight: '$1' }} />
        </StyledResult>
      </Box>
    ));
  } else {
    results = (
      <Box css={{ textAlign: 'center', py: '$1' }}>
        <Text size="small" css={{ color: '$grey200' }}>
          No tracks found
        </Text>
      </Box>
    );
  }
  return (
    <StyledResultWrapper {...SearchResultProps} ref={forwardRef}>
      <Card
        css={{
          position: 'relative',
          padding: '$1',
          bd: '$grey300',
          maxHeight: '300px',
          overflowY: 'scroll',
          zIndex: '1',
        }}
      >
        {!loading ? results : <Spinner />}
      </Card>
    </StyledResultWrapper>
  );
}) as SearchResultsComponent;
