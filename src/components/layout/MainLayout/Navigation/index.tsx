import classes from './index.module.scss';

export const Navigation: React.FC = () => {
  return (
    <header className={classes.Wrapper}>
      <div className={classes.LeftSide}>
        <div>Logo here</div>
      </div>
      <div className={classes.RightSide}>
        <div>Search here?</div>
        <div>ST</div>
      </div>
    </header>
  );
};
