import { CSS } from '../../../theme';

type Size = 'small' | 'medium';

export type AvatarProps = {
  css?: CSS;
  size?: Size;
  imageSrc?: string;
  name: string;
  status?: boolean;
};
