import type { Todo } from './types';

// Mock data themed around common coding activities
export const initialTodos: Todo[] = [
  {
    id: 1,
    title: 'Refactor legacy module',
    description: 'Break down utils/legacy-helpers into smaller, testable functions.',
    completed: true,
  },
  {
    id: 2,
    title: 'Write unit tests for API layer',
    description: 'Cover addTodo, updateTodo, and deleteTodo with edge cases.',
    completed: false,
  },
  {
    id: 3,
    title: 'Set up CI pipeline',
    description: 'Configure GitHub Actions to run lint, typecheck, and tests on PRs.',
    completed: false,
  },
  {
    id: 4,
    title: 'Improve accessibility',
    description: 'Add ARIA labels to buttons and ensure proper keyboard navigation.',
    completed: true,
  },
  {
    id: 5,
    title: 'Document public APIs',
    description: 'Add JSDoc/TSDoc comments and update README usage examples.',
    completed: false,
  },
];
