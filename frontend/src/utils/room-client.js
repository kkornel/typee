import axios from 'axios';

import { localStorageKey } from './api-client';

async function updateRoom(name, data) {
  const token = localStorage.getItem(localStorageKey);
  const response = await axios.post(`/api/v1/rooms/${name}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export { updateRoom };
