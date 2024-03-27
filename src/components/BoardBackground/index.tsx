import classes from './index.module.scss';

const imageUrl =
  'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const backgroundType: string = 'image';
const solidBg = 'darkblue';

export const BoardBackground = () => {
  return (
    <div className={classes.Container}>
      {backgroundType === 'solid' && (
        <div
          className={classes.SolidBackground}
          style={{ backgroundColor: solidBg }}
        />
      )}
      <img className={classes.BackgroundImage} src={imageUrl} />
    </div>
  );
};
