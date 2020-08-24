import { client } from './api-client';

import axios from 'axios';

async function updateRoom(name, data) {
  // const response = await client(`rooms/${name}`, {
  //   // body: { name, file, deleteCurrentAvatar },
  //   body: { file },
  // });
  const response = await axios.post(`/api/v1/rooms/${name}`, data);
  console.log('room-client updateRoom', response.data);
  return response.data;
}

export { updateRoom };
