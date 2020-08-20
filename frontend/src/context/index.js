import React from 'react';

import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';

import { AuthProvider } from './AuthContext';
import { UserDataProvider } from './UserDataContext';
import theme from '../utils/theme';

function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          {/* {children} */}
          <UserDataProvider>{children}</UserDataProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
