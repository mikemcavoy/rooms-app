import { defaultTheme } from './index';

export const utils = {
  bd:
    (config: any) =>
    (value: number | `$${keyof typeof defaultTheme['colors']}`) => ({
      border: `1px solid ${value}`,
    }),
  px: (config: any) => (value: any) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (config: any) => (value: any) => ({
    paddingTop: value,
    paddingBottom: value,
  }),
  mx: (config: any) => (value: any) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (config: any) => (value: any) => ({
    marginTop: value,
    marginBottom: value,
  }),
  linearGradient: (config: any) => (value: any) => ({
    backgroundImage: `linear-gradient(${value})`,
  }),
};
