export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export type TodoCreate = Omit<Todo, 'id' | 'completed'>;
