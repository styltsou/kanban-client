import { socket } from '@/lib/socket';
import { useEffect } from 'react';

export const useEmitSocketEvent = <T>(
  event: string,
  data: T,
  callback: (err: unknown, response: unknown) => void,
  timeout: number = 4000,
) => {
  useEffect(() => {
    socket.timeout(timeout).emit(event, data, callback);
  }, [callback, data, event, timeout]);
};
