import { createFileRoute } from '@tanstack/react-router';
import { WorkspaceLayout } from '@/components/layout/workspace';

// TODO: Here add loader to fetch the sidebar's data

export const Route = createFileRoute('/_workspaceLayout')({
  component: WorkspaceLayout,
});
