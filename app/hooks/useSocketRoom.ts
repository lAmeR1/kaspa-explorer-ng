import { socket } from "../api/socket";
import { useEffect } from "react";

const roomReferences: Record<string, number> = {};

interface UseSocketRoomOptions<T> {
  room: string;
  eventName: string;
  onMessage: (message: T) => void;
}

export const useSocketRoom = <T>({ room, onMessage, eventName }: UseSocketRoomOptions<T>) => {
  useEffect(() => {
    roomReferences[room] = (roomReferences[room] || 0) + 1;
    if (roomReferences[room] === 1) {
      socket.emit("join-room", room);
    }
    socket.on(eventName, onMessage);

    return () => {
      socket.off(eventName, onMessage);

      roomReferences[room]--;
      if (roomReferences[room] === 0) {
        socket.emit("leave-room", room);
      }
    };
  }, [room, onMessage]);

  return { connected: socket.connected };
};
