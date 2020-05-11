import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['message', 'error'], // message and error will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const persistor = persistStore(store);

export { store, persistor };
