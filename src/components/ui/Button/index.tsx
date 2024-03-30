import classes from './index.module.scss';

// TODO: Add sizes to buttons? Then I can also create icon buttons with respective sizes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
}) => {
  return (
    <button className={classes.Button}>{loading ? '...' : children}</button>
  );
};
