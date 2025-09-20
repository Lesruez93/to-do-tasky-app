import { TodoApp } from '@/app/components/todo-app';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-center font-headline text-primary-foreground bg-primary py-4 rounded-lg shadow-md">
           Tasky  TO-DO APP
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <TodoApp />
      </main>
      <footer className="text-center py-4 text-muted-foreground text-sm">
        <p>Built with Next.js, Radix UI, and Tailwind CSS. Developed by Lester</p>
      </footer>
    </div>
  );
}
