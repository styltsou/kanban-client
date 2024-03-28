import { useCallback, useEffect, useRef } from 'react';

export const useDragScroll = <T extends HTMLElement>(): React.RefObject<T> => {
  const ref = useRef<T>(null);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      const startPos = {
        left: ref.current.scrollLeft,
        top: ref.current.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;

        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        ref.current.scrollTop = startPos.top - dy;
        ref.current.scrollLeft = startPos.left - dx;
        updateCursor(ref.current);
      };

      const handleMouseUp = () => {
        if (!ref.current) return;

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        resetCursor(ref.current);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current],
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!ref.current) return;

      const touch = e.touches[0];
      const startPos = {
        left: ref.current.scrollLeft,
        top: ref.current.scrollTop,
        x: touch.clientX,
        y: touch.clientY,
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!ref.current) return;

        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        const dy = touch.clientY - startPos.y;
        ref.current.scrollTop = startPos.top - dy;
        ref.current.scrollLeft = startPos.left - dx;
        updateCursor(ref.current);
      };

      const handleTouchEnd = () => {
        if (!ref.current) return;

        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        resetCursor(ref.current);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current],
  );

  const updateCursor = (element: HTMLElement) => {
    element.style.cursor = 'grabbing';
    element.style.userSelect = 'none';
  };

  const resetCursor = (element: HTMLElement) => {
    element.style.cursor = 'default';
    element.style.removeProperty('user-select');
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener('mousedown', handleMouseDown);
    ref.current.addEventListener('touchstart', handleTouchStart);

    return () => {
      ref!.current!.removeEventListener('mousedown', handleMouseDown);
      ref!.current!.removeEventListener('touchstart', handleTouchStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return ref;
};
