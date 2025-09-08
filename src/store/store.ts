import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "./storage";

// slices
import modalReducer from "./slices/modalSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

// combine reducers
const rootReducer = combineReducers({
    modal: modalReducer,
    auth: authReducer,
    user: userReducer,
});

// persist config
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "user"], // only persist these slices
};

// wrap reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist
        }),
});

// persist store
export const persistor = persistStore(store);

// types for hooks
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
