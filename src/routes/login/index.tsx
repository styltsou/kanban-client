import { createFileRoute } from '@tanstack/react-router';

const Login: React.FC = () => {
  return <div>Login page</div>;
};

export const Route = createFileRoute('/login/')({
  component: Login,
});
