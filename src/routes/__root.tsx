import { TanStackRouterDevtools } from '@/TSRDevTools';
import { MainLayout } from '@/components/layout/MainLayout';
import { SidebarProvider } from '@/contexts/SideBarContext';
import { createRootRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <MainLayout />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </SidebarProvider>
  ),
});
