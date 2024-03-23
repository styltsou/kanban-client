import classes from './index.module.scss';

export const Sidebar: React.FC = () => {
  return (
    <aside className={classes.Wrapper}>
      <div className={classes.WorksopaceSelector}>Hackney</div>
    </aside>
  );
};
