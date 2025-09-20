'use client';

import { Provider } from 'react-redux';
import { store } from '@/app/store';

// Client-only Providers wrapper to inject Redux store into the app tree.
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
