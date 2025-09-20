import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: 'TO-DO APP',
  description: 'A modern To-Do application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {/* Wrap the app in Redux Providers so all client components can access the store */}
        <Providers>{children}</Providers>
        <Toaster />
        <SonnerToaster richColors />
      </body>
    </html>
  );
}
