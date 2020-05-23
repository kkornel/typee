// import { logout } from './auth-client';

const localStorageKey = '__backend_frontend_token__';

async function client(endpoint, { body } = {}) {
  const token = localStorage.getItem(localStorageKey);
  const headers = { 'content-type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    headers: {
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/${endpoint}`,
    config
  );

  // TODO: what to do with this?
  // if (response.status === 401) {
  //   logout();

  //   // Refresh the page
  //   window.location.assign(window.location);

  //   return Promise.reject({ message: 'Please re-authenticate.' });
  // }

  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}

export { client, localStorageKey };
