import React from 'react';

import { AuthProvider } from './AuthContext';
import { UserDataProvider } from './UserDataContext';

function AppProviders({ children }) {
  return (
    <AuthProvider>
      {/* {children} */}
      <UserDataProvider>{children}</UserDataProvider>
    </AuthProvider>
  );
}

export default AppProviders;
