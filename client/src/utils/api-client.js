const LOCAL_STORAGE_TOKEN_KEY = '__type_token__';

const API_URL = '/api/v1';

async function client(endpoint, { body } = {}) {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const headers = { 'content-type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body?.file) {
    delete headers['content-type'];
    // headers['content-type'] = 'multipart/form-data';
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

  const response = await fetch(`${API_URL}/${endpoint}`, config);

  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
}

export { client, LOCAL_STORAGE_TOKEN_KEY };
