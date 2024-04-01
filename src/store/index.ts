import { configureStore } from "@reduxjs/toolkit";
import storage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import counterReducer from "./redux/reducers/counter.reducer";
import authReducer from "./redux/reducers/auth.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["counter"]
};

const persisedtReducer = persistReducer(persistConfig, counterReducer);

export const store = configureStore({
  reducer: {
    counter: persisedtReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
