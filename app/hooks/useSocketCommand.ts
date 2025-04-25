import { socket, useSocketConnected } from "../api/socket";
import { useEffect } from "react";

interface UseSocketCommand<T> {
  command: string;
  onReceive?: (data: T) => void;
}

export const useSocketCommand = <T>({ command, onReceive }: UseSocketCommand<T>) => {
  const { connected } = useSocketConnected();

  useEffect(() => {
    if (!connected || !command) return;

    socket.emit(command, "");

    const handleResponse = (data: T) => {
      onReceive?.(data);
    };

    socket.on(command, handleResponse);
    return () => {
      socket.off(command, handleResponse);
    };
  }, [connected, command, onReceive]);

  return {};
};
