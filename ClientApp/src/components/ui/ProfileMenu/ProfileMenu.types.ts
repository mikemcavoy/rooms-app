import { CSS } from '../../../theme';

export type ProfileMenuProps = {
  css?: CSS;
  profileImage: string;
  name: string;
  menuItems?: MenuItem[];
};

export type MenuItem = {
  buttonText: string;
  buttonAction(): void;
};
