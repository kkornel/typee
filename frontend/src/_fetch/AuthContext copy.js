import React from 'react';

import { useAsync } from '../utils/useAsync';
import { loadAppData } from '../utils/loadAppData';
import * as authClient from '../utils/auth-client';
import FullPageSpinner from '../components/lib';

const AuthContext = React.createContext();

const appDataPromise = loadAppData();

function AuthProvider(props) {
  const {
    data,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    execute,
    setData,
  } = useAsync();

  // Code for pre-loading the user's information
  // if his token is the localStorage.
  React.useLayoutEffect(() => {
    function loadData() {
      execute(appDataPromise);
    }
    loadData();
  }, [execute]);

  // Register the user
  const signUp = React.useCallback(
    (form) => authClient.signUp(form).then((user) => setData({ user })),
    [setData]
  );

  // Make a login request
  const signIn = React.useCallback(
    (form) => authClient.signIn(form).then((user) => setData({ user })),
    [setData]
  );

  // Clear the token in the localStorage and the user data
  const logout = React.useCallback(() => {
    authClient.logout();
    setData(null);
  }, [setData]);

  const user = data?.user;

  const value = React.useMemo(() => ({ user, signUp, signIn, logout }), [
    user,
    signUp,
    signIn,
    logout,
  ]);

  // Normally provider components render the context provider with a value.
  // Here, post-pone rendering any of the children until after determined
  // whether or not there is a user token and if there is, render a spinner
  // while retrieving that user's data from the server.
  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
