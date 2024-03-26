import { createFileRoute } from '@tanstack/react-router';

const SignUp: React.FC = () => {
  return <main>Sign up page</main>;
};

export const Route = createFileRoute('/sign-up/')({
  component: SignUp,
});
