import { io } from "socket.io-client";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

export const socket = io(serverUrl, {
  autoConnect: true,
  transports: ["websocket", "polling"],
});
