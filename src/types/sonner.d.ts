declare module 'sonner' {
  import * as React from 'react';
  export const Toaster: React.ComponentType<any>;
  export function toast(message: string, opts?: any): void;
  export namespace toast {
    function success(message: string, opts?: any): void;
    function error(message: string, opts?: any): void;
    function info(message: string, opts?: any): void;
    function warning(message: string, opts?: any): void;
  }
}
