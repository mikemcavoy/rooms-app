import { CSS, StitchesVariants } from '../../../theme';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import { StyledInput } from './Input.component';
import { Icons as IconPaths } from '../Icon/icons';

const DEFAULT_TAG = 'input';

type InputCSSProp = { css?: CSS };
type InputVariants = StitchesVariants<typeof StyledInput>;
export type InputOwnProps = InputCSSProp &
  InputVariants & {
    icon?: Icons;
    iconFill?: string;
  };

export type InputComponent = Polymorphic.ForwardRefComponent<
  typeof DEFAULT_TAG,
  InputOwnProps
>;

export type Icons = keyof typeof IconPaths;
