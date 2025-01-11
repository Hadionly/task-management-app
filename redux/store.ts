// ../redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
