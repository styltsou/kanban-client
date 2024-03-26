import { TanStackRouterDevtools } from '@/TSRDevTools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
