import React from 'react';
import { SnackbarProvider } from 'notistack';

import theme from '../utils/theme';
import { ThemeProvider } from '@material-ui/core/styles';

import { AuthProvider } from './AuthContext';
import { UserDataProvider } from './UserDataContext';
import { RoomDataProvider } from './RoomDataContext';
// import { SocketProvider } from './SocketContext';

function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <UserDataProvider>
            <RoomDataProvider>
              {/* <SocketProvider> */}
              {children}
              {/* </SocketProvider> */}
            </RoomDataProvider>
          </UserDataProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
