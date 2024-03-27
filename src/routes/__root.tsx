import { TanStackRouterDevtools } from '@/TSRDevTools';
import { MainLayout } from '@/components/layout/MainLayout';
import { createRootRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createRootRoute({
  component: () => (
    <>
      <MainLayout />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
