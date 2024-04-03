import { useRef, useEffect } from 'react';
import classes from './index.module.scss';
import { Portal } from '@radix-ui/react-portal';

type Props = {
  isSolid: boolean;
  backgroundUrl: string | null;
  color: string | null;
};

// * Maybe there is no point in calculating bg image colors on the client
export const BoardBackground: React.FC<Props> = ({
  isSolid,
  backgroundUrl,
  color,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (backgroundUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvasRef.current?.getContext('2d');
      const img = new Image();

      if (img) {
        img.src = backgroundUrl;
        img.onload = () => {
          // Calculate appropriate dimensions to maintain aspect ratio
          const scaleFactor = Math.max(
            canvas.width / img.width,
            canvas.height / img.height,
          );
          const newWidth = img.width * scaleFactor;
          const newHeight = img.height * scaleFactor;
          const offsetX = (canvas.width - newWidth) / 2;
          const offsetY = (canvas.height - newHeight) / 2;
          ctx?.drawImage(img, offsetX, offsetY, newWidth, newHeight);

          // here get tha average color of the image and the avg color of the topbar portion
        };
      }
    }
  }, [backgroundUrl]);

  return (
    <Portal>
      <div className={classes.Container}>
        {isSolid ? (
          <div
            className={classes.SolidBackground}
            style={{ backgroundColor: color! }}
          />
        ) : (
          <>
            <img className={classes.BackgroundImage} src={backgroundUrl!} />
            <canvas
              ref={canvasRef}
              className={classes.Canvas}
              style={{ display: 'hidden' }}
            />
          </>
        )}
      </div>
    </Portal>
  );
};
