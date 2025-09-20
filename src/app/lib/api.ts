import { initialTodos } from './mock-data';
import type { Todo, TodoCreate } from './types';

let todos: Todo[] = [...initialTodos];
let nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

const SIMULATED_DELAY = 1000;
const FAILURE_RATE = 0.1; // 10% chance of failure

const simulateRequest = <T>(data: T, customDelay?: number): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error('API request failed! Please try again.'));
      } else {
        resolve(data);
      }
    }, customDelay ?? SIMULATED_DELAY);
  });
};

export const getTodos = async (): Promise<Todo[]> => {
  return simulateRequest(todos, 500);
};

export const addTodo = async (todoData: TodoCreate): Promise<Todo> => {
  const newTodo: Todo = {
    ...todoData,
    id: nextId++,
    completed: false,
  };
  todos = [newTodo, ...todos];
  return simulateRequest(newTodo);
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  todos = todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));
  return simulateRequest(updatedTodo);
};

export const deleteTodo = async (id: number): Promise<{ id: number }> => {
  todos = todos.filter(todo => todo.id !== id);
  return simulateRequest({ id });
};
