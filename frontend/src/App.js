import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import Header from './components/Home/Header';
import { FullPageSpinner } from './components/lib';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

function App() {
  const { user } = useAuth();
  // const user = null;

  console.log('App() user', user);

  return (
    <BrowserRouter>
      <Header />
      <React.Suspense fallback={<FullPageSpinner />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
