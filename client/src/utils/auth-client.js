import { client, LOCAL_STORAGE_TOKEN_KEY } from './api-client';

import axios from 'axios';

function handleLoginResponse({ user, token }) {
  if (token) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  }

  return user;
}

function getToken() {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
}

function removeToken() {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}

function isLoggedIn() {
  return Boolean(getToken());
}

async function getUser() {
  const response = await client('users');
  console.log('auth-client getUser response', response);
  return response.user;
}

async function signUp({ email, username, password }) {
  const response = await client('auth/register', {
    body: { email, username, password },
  });
  console.log('auth-client signUp response', response);
  return response;
}

async function signIn({ email, password }) {
  const response = await client('auth/login', { body: { email, password } });
  console.log('auth-client signIn response', response);
  return handleLoginResponse(response);
}

async function logout() {
  const response = await client('auth/logout', { body: {} });
  removeToken();
  console.log('auth-client logout response', response);
  return response;
}

async function logoutAll() {
  const response = await client('auth/logout/all', { body: {} });
  removeToken();
  console.log('auth-client logout response', response);
  return response;
}

async function resendVerificationEmail(email) {
  const response = await client('auth/verify', { body: { email } });
  console.log('auth-client resendVerificationEmail response', response);
  return response;
}

async function resetPassword(email) {
  const response = await client('auth/password/reset', { body: { email } });
  console.log('auth-client passwordReset response', response);
  return response;
}

async function changePassword(password) {
  const response = await client('auth/password/reset/new', {
    body: { password },
  });
  console.log('auth-client changePassword response', response);
  return response;
}

async function verifyPassword(userId, password) {
  const response = await client(`users/${userId}/verify`, {
    body: { password },
  });
  console.log('auth-client verifyPassword response', response);
  return response;
}

async function deleteAccount(userId) {
  const response = await client(`users/${userId}/delete`, { body: {} });
  console.log('auth-client deleteAccount response', response);
  removeToken();
  return response;
}

async function updateProfile(userId, data) {
  // Can't send files with fetch, so using axios...
  const token = localStorage.getItem(localStorageKey);
  const response = await axios.post(`/api/v1/users/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export {
  getToken,
  isLoggedIn,
  getUser,
  signUp,
  signIn,
  logout,
  logoutAll,
  resendVerificationEmail,
  resetPassword,
  changePassword,
  updateProfile,
  verifyPassword,
  deleteAccount,
};
