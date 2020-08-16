import React from 'react';

import { SnackbarProvider } from 'notistack';

import { AuthProvider } from './AuthContext';
import { UserDataProvider } from './UserDataContext';

function AppProviders({ children }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        {/* {children} */}
        <UserDataProvider>{children}</UserDataProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default AppProviders;
