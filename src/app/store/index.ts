import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

// Create the Redux store with the todos slice.
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  // Default middleware is fine here; no thunks are required for our minimal integration.
});

// Inferred types for the RootState and AppDispatch for typed hooks.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
