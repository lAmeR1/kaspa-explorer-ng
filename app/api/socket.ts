import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const rooms = new Set<string>();

const SOCKET_URL = "wss://api.kaspa.org";
export const socket = io(SOCKET_URL, {
  path: "/ws/socket.io",
  autoConnect: true,
});

export const joinRoom = (room: string) => {
  socket.emit("join-room", room);
  rooms.add(room);
};

export const leaveRoom = (room: string) => {
  socket.emit("leave-room", room);
  rooms.delete(room);
};

export const useSocketConnected = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!connected) return;
    socket.emit("join-room", "blocks");
    console.log("joining room");
  }, [connected]);

  useEffect(() => {
    const handleConnect = () => {
      setConnected(true);
      rooms.forEach((room) => {
        socket.emit("join-room", room);
      });
    };
    const handleDisconnect = () => setConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return { connected };
};
