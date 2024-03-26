import { createFileRoute } from '@tanstack/react-router';
import classes from './index.module.scss';

const Workspaces = () => {
  const params = Route.useParams();

  return (
    <div className={classes.Wrapper}>
      Workspace {params.workspaceId} is visible here!
    </div>
  );
};

export const Route = createFileRoute(
  '/_workspaceLayout/workspaces/$workspaceId',
)({
  component: Workspaces,
});
