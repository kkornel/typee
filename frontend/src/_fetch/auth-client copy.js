import { client, localStorageKey } from './api-client';

function handleUserResponse({ user: { token, ...user } }) {
  window.localStorage.setItem(localStorageKey, token);
  return user;
}

async function getUser() {
  const token = getToken();

  if (!token) {
    return Promise.resolve(null);
  }

  const data = await client('me');
  return data.user;
}

function login({ email, password }) {
  return client('login', { body: { username, password } }).then(
    handleUserResponse
  );
}

function signUp({ email, username, password }) {
  return client('sign-up', { body: { email, username, password } }).then(
    handleUserResponse
  );
}

function getToken() {
  return localStorage.getItem(localStorageKey);
}

function isLoggedIn() {
  return Boolean(getToken());
}

function logout() {
  localStorage.removeItem(localStorageKey);
}

export { login, signUp, logout, getToken, getUser, isLoggedIn };
