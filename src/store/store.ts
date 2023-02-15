import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

import { CategoryState } from "./category/category.reducer";
import { CartState } from "./cart/cart.reducer";
import { UserState } from "./user/user.reducer";

export type RootState = ReturnType<typeof rootReducer>

declare global{
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

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

const composedEnhancer = (process.env.NODE_ENV !== 'production' 
&& window 
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
|| compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined,composedEnhancers)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)