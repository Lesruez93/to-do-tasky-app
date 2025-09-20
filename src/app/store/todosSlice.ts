import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '@/app/lib/types';

// Simple Redux slice to manage the list of todos.
// API calls are still made in components; this slice only stores results.
export interface TodosState {
  items: Todo[];
}

const initialState: TodosState = {
  items: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Replace all todos (e.g., after initial fetch)
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
    },
    // Add a new todo at the top
    addTodo(state, action: PayloadAction<Todo>) {
      state.items = [action.payload, ...state.items];
    },
    // Update an existing todo by id
    updateTodo(state, action: PayloadAction<Todo>) {
      const updated = action.payload;
      state.items = state.items.map(t => (t.id === updated.id ? updated : t));
    },
    // Remove a todo by id
    deleteTodo(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.items = state.items.filter(t => t.id !== id);
    },
    // Optional: clear all (not used yet, but handy)
    clearTodos(state) {
      state.items = [];
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo, clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
