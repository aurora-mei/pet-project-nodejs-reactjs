import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./BookSlice";
const store = configureStore({
  reducer: {
    bookReducer: bookSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
