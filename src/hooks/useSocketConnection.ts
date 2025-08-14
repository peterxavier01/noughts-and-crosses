import { useEffect, useRef } from "react";

import { socket } from "../lib/socket";

export const useSocketConnection = () => {
  const isConnected = useRef(false);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected");
      isConnected.current = true;
    };

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
      isConnected.current = false;
    };

    const handleConnectError = (error: Error) => {
      console.error("Socket connection error:", error);
    };

    // Set up event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    // Connect if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
    };
  }, []);

  return {
    socket,
    isConnected: isConnected.current,
  };
};

export default useSocketConnection;
