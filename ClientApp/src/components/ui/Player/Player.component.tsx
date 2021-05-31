import React, { useState } from 'react';
import { styled } from '../../../theme';
import { PlayerComponent } from './Player.types';
import { Card } from '../../core/Card';
import { Box } from '../../core/Box';
import { Text } from '../../core/Text';
import { Icon } from '../../core/Icon';
import { Heading } from '../../core/Heading';
import { usePlaybackPosition } from '../../../hooks/usePlaybackPosition';
import { msToMin } from '../../../utils/helpers';

const StyledInnerWrapper = styled(Box, {
  display: 'grid',
  gridColumnGap: '$3',
  gridTemplateColumns: '120px auto',
});

const StyledAlbumImage = styled('img', {
  width: '120px',
});

const StyledPlayerContent = styled(Box, {
  display: 'grid',
  gridColumnGap: '$2',
  gridTemplateColumns: 'auto 50px',
});

const StyledPlaybackBarWrapper = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingTop: '$3',
});

const StyledPlaybackBar = styled(Box, {
  width: '100%',
  height: '3px',
  backgroundColor: '$grey300',
  position: 'relative',
  marginBottom: '$2',
  overflow: 'hidden',
  borderRadius: '$2',
});

const StyledPlaybackBarProgress = styled(Box, {
  backgroundColor: '$accent200',
  height: '3px',
  width: '100%',
  position: 'absolute',
  left: '-100%',
  borderRadius: '$2',
});

const StyledPlaybackMeta = styled(Box, {
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledEmptyTrackCard = styled(Card, {
  textAlign: 'center',
});

const StyledControlButton = styled('button', {
  backgroundColor: 'transparent',
  padding: '$2',
  bd: '$grey300',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'auto',
  width: 'auto',
  cursor: 'pointer',
  marginTop: '$3',
  transition: '0.15s',
  '&:hover': {
    bd: '$grey200',
  },
});

export const Player = React.forwardRef((props, forwardRef) => {
  const { currentlyPlaying, paused, onControlClick, ...playerProps } = props;
  const track = currentlyPlaying.track;
  const user = currentlyPlaying.user;
  const startedAt = currentlyPlaying.startedAt;
  const trackDuration = track?.duration ? track?.duration : 0;

  const { currentPositionMin, playbackPercent } = usePlaybackPosition(
    trackDuration,
    startedAt,
  );

  return (
    <Box {...playerProps}>
      {track ? (
        <Card css={{ padding: '$2' }}>
          <StyledInnerWrapper>
            <StyledAlbumImage src={track?.album.images[0].url} />
            <Box
              css={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <StyledPlayerContent>
                <Box>
                  <Text css={{ color: '$grey200' }}>
                    {track?.artists[0].name}
                  </Text>
                  <Heading size="h2">{track?.name}</Heading>
                  <Text size="small" css={{ color: '$grey200' }}>
                    Queued by {user?.name}
                  </Text>
                </Box>
                <Box
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <StyledControlButton onClick={() => onControlClick()}>
                    <Icon icon={paused ? 'play' : 'pause'} fill="#c9d6e2" />
                  </StyledControlButton>
                </Box>
              </StyledPlayerContent>
              <StyledPlaybackBarWrapper>
                <StyledPlaybackBar>
                  <StyledPlaybackBarProgress
                    css={{ left: `-${100 - playbackPercent}%` }}
                  />
                </StyledPlaybackBar>
                <StyledPlaybackMeta>
                  <Text size="small" css={{ color: '$grey200' }}>
                    {currentPositionMin}
                  </Text>
                  <Text size="small" css={{ color: '$grey200' }}>
                    {msToMin(trackDuration)}
                  </Text>
                </StyledPlaybackMeta>
              </StyledPlaybackBarWrapper>
            </Box>
          </StyledInnerWrapper>
        </Card>
      ) : (
        <StyledEmptyTrackCard>
          <Text size="small" css={{ color: '$grey200' }}>
            No tracks are currently queued.
          </Text>
        </StyledEmptyTrackCard>
      )}
    </Box>
  );
}) as PlayerComponent;
