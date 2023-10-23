import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlicer from "./slicer/auth.slicer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./api/auth.api";
import { dashboardApi } from "./api/dashboard.api";
import { userApi } from "./api/user.api";
import { interviewApi } from "./api/interviews.api";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    //api
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [interviewApi.reducerPath]: userApi.reducer,

    //slice
    auth: authSlicer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      dashboardApi.middleware,
      userApi.middleware,
      interviewApi.middleware,
    ]),
});

export const persistor = persistStore(store);
