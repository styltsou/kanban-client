import { TanStackRouterDevtools } from '@/TSRDevTools';
import { MainLayout } from '@/components/layout/MainLayout';
import { BoardMenuProvider } from '@/contexts/BoardMenuContext';
import { SidebarProvider } from '@/contexts/SideBarContext';
import { createRootRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <BoardMenuProvider>
        <MainLayout />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </BoardMenuProvider>
    </SidebarProvider>
  ),
});
