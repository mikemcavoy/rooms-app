import { CSS } from '../../../theme';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

const DEFAULT_TAG = 'div';

type CardCSSProp = { css?: CSS };
export type CardOwnProps = CardCSSProp;

export type CardComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  CardOwnProps
>;
