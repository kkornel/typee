// import { client } from './api-client';

import axios from 'axios';
import { localStorageKey } from './api-client';

async function updateRoom(name, data) {
  // const response = await client(`rooms/${name}`, {
  //   // body: { name, file, deleteCurrentAvatar },
  //   body: { file },
  // });
  const token = localStorage.getItem(localStorageKey);
  const response = await axios.post(`/api/v1/rooms/${name}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('room-client updateRoom', response.data);
  return response.data;
}

export { updateRoom };
