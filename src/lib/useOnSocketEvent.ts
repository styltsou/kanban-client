import { useEffect } from 'react';
import { socket } from '@/lib/socket';

export const useOnSocketEvent = <E>(
  event: string,
  callback: (args: E) => void,
): void => {
  useEffect(() => {
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);
};
