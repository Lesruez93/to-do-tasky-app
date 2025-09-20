'use client';

import { useState } from 'react';
import type { Todo } from '@/app/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Pencil, Trash2, Check, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().optional(),
});
type FormValues = z.infer<typeof formSchema>;

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (todo: Todo) => Promise<void>;
  onDeleteTodo: (id: number) => Promise<void>;
  onToggleTodo: (id: number) => Promise<void>;
}

export function TodoItem({ todo, onUpdateTodo, onDeleteTodo, onToggleTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
    },
  });

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggleTodo(todo.id);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDeleteTodo(todo.id);
    // The component will unmount, so no need to setIsDeleting(false)
  };

  const handleSave = async (values: FormValues) => {
    setIsSaving(true);
    try {
      await onUpdateTodo({ ...todo, ...values });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card
      className={cn(
        'transition-all duration-300',
        todo.completed ? 'bg-card/60 border-dashed' : 'bg-card',
        isEditing && 'ring-2 ring-accent'
      )}
    >
      <CardContent className="p-4 flex items-start gap-4">
        <div className="flex items-center h-full pt-1">
          {isToggling ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          ) : (
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={handleToggle}
              className="h-6 w-6"
              aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
          )}
        </div>

        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex-1 space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} className="text-lg font-semibold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} className="text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" size="sm" disabled={isSaving}>
                  {isSaving ? <Loader2 className="animate-spin" /> : <Check />}
                  Save
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  <X /> Cancel
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex-1">
            <label
              htmlFor={`todo-${todo.id}`}
              className={cn(
                'font-semibold text-lg cursor-pointer',
                todo.completed && 'line-through text-muted-foreground'
              )}
            >
              {todo.title}
            </label>
            {todo.description && (
              <p className={cn('text-muted-foreground text-sm mt-1', todo.completed && 'line-through')}>
                {todo.description}
              </p>
            )}
          </div>
        )}

        {!isEditing && (
          <div className="flex gap-2 items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} aria-label="Edit task">
              <Pencil className="h-5 w-5" />
            </Button>
            <AlertDialog>
              <Button asChild variant="ghost" size="icon" disabled={isDeleting} aria-label="Delete task">
                <AlertDialogTrigger>
                  {isDeleting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5 text-destructive" />
                  )}
                </AlertDialogTrigger>
              </Button>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove "{todo.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
