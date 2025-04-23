import { io } from "socket.io-client";

const SOCKET_URL = "wss://api.kaspa.org";
export const socket = io(SOCKET_URL, {
  path: "/ws/socket.io",
  autoConnect: true,
});
