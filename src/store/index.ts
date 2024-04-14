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
import { applyMiddleware, combineReducers } from "redux";

import authReducer from "./redux/reducers/auth.reducer";
import applicationReducer from "./redux/reducers/application.reducer";
import bottomSheetReducer from "./redux/reducers/bottomSheet.reducer";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};

const persisedtReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persisedtReducer,
    application: applicationReducer,
    bottomSheet: bottomSheetReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(thunk)
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
