import React from 'react';

import { useAsync } from '../utils/useAsync';
import { loadAppData } from '../utils/loadAppData';
import * as authClient from '../utils/auth-client';
import FullPageSpinner from '../components/ui/FullPageSpinner';

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

  // Pre-load user's information if his token is the localStorage
  React.useLayoutEffect(() => {
    function loadData() {
      execute(appDataPromise);
    }
    loadData();
  }, [execute]);

  const signUp = React.useCallback(
    async (formValues) => await authClient.signUp(formValues),
    []
  );

  const signIn = React.useCallback(
    async (formValues) => {
      const user = await authClient.signIn(formValues);
      setData({ user });
    },
    [setData]
  );

  const logout = React.useCallback(async () => {
    await authClient.logout();
    setData(null);
  }, [setData]);

  const logoutAll = React.useCallback(async () => {
    await authClient.logoutAll();
    setData(null);
  }, [setData]);

  const resendVerificationEmail = React.useCallback(
    async (email) => await authClient.resendVerificationEmail(email),
    []
  );

  const resetPassword = React.useCallback(
    async (email) => await authClient.resetPassword(email),
    []
  );

  const changePassword = React.useCallback(
    async (password) => await authClient.changePassword(password),
    []
  );

  const verifyPassword = React.useCallback(
    async (userId, password) =>
      await authClient.verifyPassword(userId, password),
    []
  );

  const updateProfile = React.useCallback(
    async (userId, data) => {
      const response = await authClient.updateProfile(userId, data);
      setData({ user: response.data.user });
      return response;
    },
    [setData]
  );

  const deleteAccount = React.useCallback(
    async (userId, callback) => {
      const { user, createdRooms } = await authClient.deleteAccount(userId);
      callback(createdRooms);
      setData(user);
    },
    [setData]
  );

  // console.log('AuthContext', data);
  const user = data?.user;

  const value = React.useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logout,
      logoutAll,
      resendVerificationEmail,
      resetPassword,
      changePassword,
      verifyPassword,
      updateProfile,
      deleteAccount,
    }),
    [
      user,
      signUp,
      signIn,
      logout,
      logoutAll,
      resendVerificationEmail,
      resetPassword,
      changePassword,
      verifyPassword,
      updateProfile,
      deleteAccount,
    ]
  );

  // Normally provider components render the context provider with a value.
  // Here, post-pone rendering any of the children until after determined
  // whether or not there is a user token and if there is, render a spinner
  // while retrieving that user's data from the server.
  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    // console.log('AuthContext Error', error);
    return <div>{error.message}</div>;
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
