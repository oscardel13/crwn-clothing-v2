import { configureStore } from '@reduxjs/toolkit';

import { createStore, Middleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer, PersistConfig, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>

// root-reducer

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
     whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [process.env.NODE_ENV !== 'production' && logger, 
// thunk,
sagaMiddleware
].filter((middleware): middleware is Middleware=>Boolean(middleware));

export const store = configureStore({
    reducer: persistedReducer,
    middleware :(getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: !![FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
    }).concat(middlewares),
})

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)