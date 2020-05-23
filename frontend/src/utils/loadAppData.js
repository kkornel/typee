import { isLoggedIn, getUser } from './auth-client';

async function loadAppData() {
  console.log('loadAppData');
  let appData = { user: null };

  if (isLoggedIn()) {
    console.log('loadAppData isLoggedIn()');
    const user = await getUser();
    appData = { user };
    console.log('loadAppData appData', appData);
  }

  return appData;
}

export { loadAppData };
