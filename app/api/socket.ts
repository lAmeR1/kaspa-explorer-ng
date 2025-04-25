import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "wss://api.kaspa.org";
export const socket = io(SOCKET_URL, {
  path: "/ws/socket.io",
  autoConnect: true,
});

export const useSocketConnected = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleConnect = () => {
      clearTimeout(timeoutId!);
      timeoutId = setTimeout(() => {
        setConnected(true);
      }, 200);
    };

    const handleDisconnect = () => {
      setConnected(false);
      clearTimeout(timeoutId!);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return { connected };
};
