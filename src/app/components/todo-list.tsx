'use client';

import type { Todo } from '@/app/lib/types';
import { TodoItem } from './todo-item';

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: number) => Promise<void>;
  onToggleTodo: (id: number) => Promise<void>;
}

export function TodoList({ todos, onUpdateTodo, onDeleteTodo, onToggleTodo }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-card rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-card-foreground">All tasks completed!</h3>
        <p className="text-muted-foreground mt-2">Add a new task to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <div key={todo.id} className="animate-in fade-in-0 duration-500">
          <TodoItem
            todo={todo}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
            onToggleTodo={onToggleTodo}
          />
        </div>
      ))}
    </div>
  );
}
