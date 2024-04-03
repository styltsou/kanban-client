import { useState, useEffect } from 'react';
import { socket } from '@/lib/socket';

export const useConnectSocket = (): boolean => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, []);

  return isConnected;
};
