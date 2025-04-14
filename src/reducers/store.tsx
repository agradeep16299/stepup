import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/reducers";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'apple',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch