# Tasky — TODO App

Tasky is a modern, minimal TODO application built with Next.js, React, Tailwind CSS, Radix UI components, and Redux Toolkit for state management. It demonstrates clean component structure, form validation, optimistic UI patterns, and user-friendly feedback using toasts and skeleton loading states.

## Features
- Add new tasks with title and optional description
- Edit, toggle complete, and delete tasks
- Client-side validation with zod and react-hook-form
- Toast notifications for success/error states
- Skeleton placeholders and loading messages while operations are in progress
- **Simulated API with artificial delay and a small random failure rate to mimic real-world network conditions**

## Tech Stack
- Next.js 15 (App Router)
- React 18
- Redux Toolkit + React Redux (global state management)
- Tailwind CSS + Tailwind CSS Animate
- Radix UI components and icons (lucide-react)
- react-hook-form + zod validation

## Getting Started
1. Install dependencies:
   - pnpm install
2. Run the development server (port 9002 as configured in package.json):
   - npm run dev
3. Open your browser at:
   - http://localhost:9002

## Project Structure (high level)
- src/app/page.tsx — Home page rendering the app
- src/app/layout.tsx — App layout and metadata; wraps the app with Redux Providers
- src/app/providers.tsx — Client-only wrapper that injects the Redux store
- src/app/store/ — Redux Toolkit store and slices
  - index.ts — configureStore and types
  - todosSlice.ts — Todos slice (set/add/update/delete)
- src/app/hooks/redux.ts — Typed Redux hooks (useAppDispatch/useAppSelector)
- src/app/components/ — UI components for the TODO app
  - add-todo-form.tsx — Form with validation to create tasks
  - todo-app.tsx — Main container handling data flow and UI states, dispatches Redux actions
  - todo-list.tsx / todo-item.tsx — List and item controls (edit/toggle/delete)
  - todo-skeleton.tsx — Loading skeletons
- src/app/lib/
  - api.ts — In-memory simulated API (delay + random failures)
  - types.ts — Shared TypeScript types
  - mock-data.ts — Initial seed data for the in-memory store (if present)
- src/components/ui/ — Reusable UI primitives (inputs, buttons, alerts, toasts, etc.)

## Simulated API Behavior
The API is fully client-side and uses an in-memory store. It adds a small delay and a ~10% random failure rate to emulate real network behavior.
- Source: src/app/lib/api.ts
- Operations: getTodos, addTodo, updateTodo, deleteTodo
- No database or external services are required to run the app

## State Management
Global state (the list of todos) is managed with Redux Toolkit. Components call the simulated API and then dispatch actions with the results.
- Store: src/app/store/index.ts
- Slice: src/app/store/todosSlice.ts
- Typed hooks: src/app/hooks/redux.ts
- Provider setup: src/app/providers.tsx and used in src/app/layout.tsx

## Available Scripts
- npm run dev — Start development server on port 9002
- npm run build — Build the app for production
- npm start — Start the production server (after build)
- npm run typecheck — TypeScript checking
- npm run lint — Linting (if configured)

## Customization
- Adjust the artificial delay or failure rate in src/app/lib/api.ts (SIMULATED_DELAY, FAILURE_RATE)
- Tweak styles via Tailwind classes in components and globals.css
- Update metadata and fonts in src/app/layout.tsx

## Notes
- No environment variables are required for local development.
- Redux is used for global state (todos) while API calls and UI loading/toasts remain in components.
- This project was scaffolded as a Next.js starter and adapted into the Tasky TODO app.
