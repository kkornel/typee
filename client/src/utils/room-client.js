import axios from 'axios';

import { LOCAL_STORAGE_TOKEN_KEY } from './api-client';

async function updateRoom(name, data) {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const response = await axios.post(`/api/v1/rooms/${name}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export { updateRoom };
