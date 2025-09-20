'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import * as api from '@/app/lib/api';
import type { Todo, TodoCreate } from '@/app/lib/types';

import { AddTodoForm } from './add-todo-form';
import { TodoList } from './todo-list';
import { TodoSkeleton } from './todo-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { setTodos as setTodosAction, addTodo as addTodoAction, updateTodo as updateTodoAction, deleteTodo as deleteTodoAction } from '@/app/store/todosSlice';

export function TodoApp() {
  // Local UI state remains here (loading, messages, errors)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const { toast } = useToast();

  // Get todos from Redux store instead of local state
  const todos = useAppSelector(state => state.todos.items);
  const dispatch = useAppDispatch();

  // Initial fetch: get todos from API and store them in Redux
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const fetchedTodos = await api.getTodos();
        dispatch(setTodosAction(fetchedTodos));
        setError(null);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        setError(message);
        toast({
          variant: 'destructive',
          title: 'Error fetching tasks',
          description: message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [dispatch, toast]);

  // Helper to show a short-lived loading message around async actions
  const withLoading = useCallback(
    async <T extends unknown[], R>(
      operation: (...args: T) => Promise<R>,
      operationType: string,
      ...args: T
    ): Promise<R> => {
      let messageTimeout: NodeJS.Timeout | null = null;
      try {
        setLoadingMessage(`Please wait, ${operationType}...`);
        // Auto-hide the message after 3 seconds
        messageTimeout = setTimeout(() => setLoadingMessage(null), 3000);
        const result = await operation(...args);
        return result;
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        setError(message);
        toast({
          variant: 'destructive',
          title: `Error: ${operationType}`,
          description: message,
        });
        throw e; // re-throw to be caught by caller
      } finally {
        if (messageTimeout) clearTimeout(messageTimeout);
        setLoadingMessage(null);
      }
    },
    [toast]
  );

  // Add a new todo: call API then dispatch to store
  const addTodo = useCallback(
    async (todoData: TodoCreate) => {
      const newTodo = await withLoading(api.addTodo, 'adding task', todoData);
      dispatch(addTodoAction(newTodo));
      sonnerToast.success('Task added successfully');
    },
    [dispatch, withLoading]
  );

  // Update an existing todo: call API then dispatch updated entity
  const updateTodo = useCallback(
    async (updatedTodo: Todo) => {
      const result = await withLoading(api.updateTodo, 'updating task', updatedTodo);
      dispatch(updateTodoAction(result));
      sonnerToast.success('Task updated successfully');
    },
    [dispatch, withLoading]
  );

  // Delete a todo: call API then dispatch id to remove
  const deleteTodo = useCallback(
    async (id: number) => {
      await withLoading(api.deleteTodo, 'deleting task', id);
      dispatch(deleteTodoAction(id));
      sonnerToast.success('Task deleted successfully');
    },
    [dispatch, withLoading]
  );

  // Convenience toggle: read from store and flip the completed flag
  const toggleTodo = useCallback(
    async (id: number) => {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await updateTodo({ ...todo, completed: !todo.completed });
      }
    },
    [todos, updateTodo]
  );

  return (
    <div className="max-w-3xl mx-auto">
      <AddTodoForm onAddTodo={addTodo} />

      {loadingMessage && (
        <Alert className="mt-4 bg-primary/20 border-primary/50 text-primary-foreground">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Working on it...</AlertTitle>
          <AlertDescription>{loadingMessage}</AlertDescription>
        </Alert>
      )}

      <div className="mt-8">
        {loading ? (
          <TodoSkeleton />
        ) : error && todos.length === 0 ? (
          <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>An Error Occurred</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <TodoList todos={todos} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} onToggleTodo={toggleTodo} />
        )}
      </div>
    </div>
  );
}
