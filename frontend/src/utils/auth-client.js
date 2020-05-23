import { client, localStorageKey } from './api-client';

function getToken() {
  return localStorage.getItem(localStorageKey);
}

function isLoggedIn() {
  return Boolean(getToken());
}

function handleResponse({ user, token }) {
  // TODO: uncomment
  if (token) {
    localStorage.setItem(localStorageKey, token);
  }
  return user;
}

async function getUser() {
  const token = getToken();

  // TODO: uncomment
  if (!token) {
    return Promise.resolve(null);
  }

  const response = await client('me');
  console.log('auth-client getUser response', response);
  return response.user;
}

async function signUp({ email, username, password }) {
  const response = await client('auth/register', {
    body: { email, username, password },
  });
  console.log('auth-client signUp response', response);
  // This was originally returned:
  // return handleResponse(response);
  return response;
}

async function signIn({ email, password }) {
  const response = await client('auth/login', { body: { email, password } });
  console.log('auth-client signUp response', response);
  return handleResponse(response);
}

async function resetPassword(email) {
  const response = await client('auth/password/reset', { body: { email } });
  console.log('auth-client passwordReset response', response);
  return response;
}

async function resendVerificationEmail(email) {
  const response = await client('auth/verify', { body: { email } });
  console.log('auth-client resendVerificationEmail response', response);
  return response;
}

async function changePassword(password) {
  const response = await client('auth/password/reset/new', {
    body: { password },
  });
  console.log('auth-client changePassword response', response);
  return response;
}

async function logout() {
  const response = await client('auth/logout', { body: {} });
  localStorage.removeItem(localStorageKey);
  console.log('auth-client logout response', response);
  return response;
}

const logoutAll = async () => await client('auth/logout/all', { body: {} });

export {
  signUp,
  signIn,
  logout,
  getToken,
  getUser,
  isLoggedIn,
  resetPassword,
  resendVerificationEmail,
  changePassword,
  logoutAll,
};
