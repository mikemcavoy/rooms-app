import { styled } from '../../../theme';
import { Box } from '../../core/Box';

export const Root = styled(Box, {
  display: 'grid',
  gridColumnGap: '$5',
  gridTemplateColumns: '1fr 3fr',
});

export const Left = styled(Box, {});

export const Main = styled(Box, {});
