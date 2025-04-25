import { socket, useSocketConnected } from "../api/socket";
import { useEffect } from "react";

const roomReferences: Record<string, number> = {};

interface UseSocketRoomOptions<T> {
  room: string;
  eventName: string;
  onMessage: (message: T) => void;
}

export const useSocketRoom = <T>({ room, onMessage, eventName }: UseSocketRoomOptions<T>) => {
  const { connected } = useSocketConnected();

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
        // nothing to do now..
      }
    };
  }, [room, onMessage, connected]);

  return {};
};
