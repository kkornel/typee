import { getUser } from './auth-client';

async function loadAppData() {
  let appData = { user: null };

  // When using only JWT this was the way to check if the token is saved
  // in the memory and if it is, then grab that token and get user's profile.
  // But when Google authentication came, it is necessary to check not only
  // if there is the token, but also if there is a cookie.
  // By setting on the server side the option 'httponly' to true, it is not possible
  // to manually check (by document.cookie) if there is a cookie, because it is invisible.
  // So the request has to be made to the server and the server and passport will check
  // for existence of that cookie.
  // If there is one, send profile, if not, the null will be send.
  // if (isLoggedIn()) {
  //   console.log('loadAppData isLoggedIn()');
  //   const user = await getUser();
  //   appData = { user };
  //   console.log('loadAppData appData', appData);
  // }

  const user = await getUser();
  appData = { user };

  return appData;
}

export { loadAppData };
