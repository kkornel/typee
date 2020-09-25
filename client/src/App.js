import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import Header from './components/home/Header';
import FullPageSpinner from './components/ui/FullPageSpinner';
import logImportantData from './utils/logImportantData';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

function App() {
  const { user } = useAuth();

  logImportantData();

  return (
    <BrowserRouter>
      <React.Suspense fallback={<FullPageSpinner />}>
        {user ? (
          <AuthenticatedApp />
        ) : (
          <>
            <Header />
            <UnauthenticatedApp />
          </>
        )}
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
