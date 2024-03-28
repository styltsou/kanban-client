import classes from './index.module.scss';

type Props = {
  isSolid: boolean;
  backgroundUrl: string | null;
  color: string | null;
};

export const BoardBackground: React.FC<Props> = ({
  isSolid,
  backgroundUrl,
  color,
}) => {
  return (
    <div className={classes.Container}>
      {isSolid && (
        <div
          className={classes.SolidBackground}
          style={{ backgroundColor: color! }}
        />
      )}
      <img className={classes.BackgroundImage} src={backgroundUrl!} />
    </div>
  );
};
