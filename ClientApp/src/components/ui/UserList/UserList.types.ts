import { CSS } from '../../../theme';
import { User } from '../../../context/authentication/authentication.types';

export type UserListProps = {
  users: User[];
  css?: CSS;
};
