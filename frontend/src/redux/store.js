import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";          // common in both
import lawyerSlice from "./lawyerSlice";            // only in first snippet
import courtSlice from "./courtSlice";    // only in first snippet
import applicationSlice from "./applicationSlice"; // only in first snippet
import socketSlice from "./socketSlice";      
import chatSlice from "./chatSlice";
import rtnSlice from "./rtnSlice";
import postSlice from "./postSlice";          // common in both

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["socketio"], // Do not persist socket-related state
};

const rootReducer = combineReducers({
  auth: authSlice,
  lawyer: lawyerSlice,
  court: courtSlice,
  application: applicationSlice,
  socketio: socketSlice,
  chat: chatSlice,
  realTimeNotification: rtnSlice,
  post: postSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions and any non-serializable actions
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "socketio/setSocket",
        ],
        ignoredPaths: ["socketio.socket"],
      },
    }),
});

// (Optional) If you need to persist the store in your app, export the persistor as well.
export const persistor = persistStore(store);

export default store;
