import { CSS } from '../../../theme';
import { Icons as IconPaths } from './icons';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

const DEFAULT_TAG = 'svg';

type IconCSSProp = { css?: CSS };
export type IconOwnProps = IconCSSProp & {
  icon: Icons;
  fill?: string;
};

export type IconComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  IconOwnProps
>;

type Icons = keyof typeof IconPaths;
