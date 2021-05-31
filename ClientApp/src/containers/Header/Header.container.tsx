import React from 'react';
import { Header } from '../../components/layout/Header';
import { useAuthenticationState } from '../../context/authentication/authentication.provider';

export const HeaderContainer: React.FC = () => {
  const { currentUser } = useAuthenticationState();
  return currentUser && <Header currentUser={currentUser} />;
};
