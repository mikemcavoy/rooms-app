import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SearchResults } from '../../components/ui/SearchResults';
import { spotifyApi } from '../../utils/spotify/spotifyApi';
import { Track } from '../../utils/spotify/spotifyApi.types';
import { Input } from '../../components/core/Input';
import { api } from '../../utils/api';
import { useVisible } from '../../hooks/useVisible';
import { Box } from '../../components/core/Box';
import { useAuthenticationState } from '../../context/authentication/authentication.provider';
import { QueueItem } from '../../context/room/room.types';
import { User } from '../../context/authentication/authentication.types';

export const SearchContainer: React.FC = () => {
  const { currentUser } = useAuthenticationState();
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const { ref, isVisible, setIsVisible } = useVisible<HTMLDivElement>(false);

  useEffect(() => {
    if (!searchValue) return setSearchResults([]);

    const source = axios.CancelToken.source();
    const cancelToken = source.token;

    const fetchTracks = async () => {
      try {
        setLoading(true);
        const trackRes = await spotifyApi.getTrackBySearchTerm(
          searchValue,
          cancelToken,
        );
        setSearchResults(trackRes);
        setLoading(false);
      } catch (error) {
        setSearchResults([]);
      }
    };

    fetchTracks();

    return () => source.cancel();
  }, [searchValue]);

  const handleTrackSelection = (trackId: string) => {
    const selectedTrack = searchResults.find(
      (track) => track.id === trackId,
    ) as Track;
    const queueItemData: QueueItem = {
      track: selectedTrack,
      user: currentUser as User,
    };
    api.postTrackToQueue(queueItemData);
    setIsVisible(false);
    setSearchValue('');
  };

  return (
    <div>
      <Input
        value={searchValue}
        placeholder="Add a track to the queue"
        onChange={(e) => setSearchValue(e.target.value)}
        onClick={(e) => setIsVisible(true)}
        showIcon
        icon="spyGlass"
        iconFill="#607283"
      />
      {searchValue && isVisible && (
        <Box css={{ position: 'relative', marginTop: '$1' }}>
          <SearchResults
            tracks={searchResults}
            loading={loading}
            handleTrackSelection={handleTrackSelection}
            ref={ref}
          />
        </Box>
      )}
    </div>
  );
};
