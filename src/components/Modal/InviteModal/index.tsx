import { useCallback, useEffect, useState } from "react";

import useMultiPlayer from "../../../store/useMultiPlayer";
import useInviteModal from "../../../store/useInviteModal";
import { ModalOverlay } from "..";

import styles from "./index.module.css";
import { socket } from "../../../lib/socket";
import { copyTextToClipboard } from "../../../lib/utils";

const InviteModal = () => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isJoining, setIsJoining] = useState<boolean>(false);

  const isOpen = useInviteModal((state) => state.isOpen);
  const onClose = useInviteModal((state) => state.onClose);

  const roomId = useMultiPlayer((state) => state.roomId);
  const setRoomId = useMultiPlayer((state) => state.setRoomId);
  const players = useMultiPlayer((state) => state.players);
  const setPlayers = useMultiPlayer((state) => state.setPlayers);

  const isGameRoomFull = useCallback(() => {
    if (players.size === 2) {
      onClose();
    }
  }, [onClose, players]);

  useEffect(() => {
    isGameRoomFull();
  }, [isGameRoomFull]);

  // Get the created room id and list of players
  useEffect(() => {
    socket.on("room_joined", (players) => {
      setPlayers(players);
    });

    socket.on("room_created", (roomId) => {
      setRoomId(roomId);
    });
  }, [setRoomId, setPlayers]);

  const handleGenerateRoomId = () => {
    socket.emit("create_room");
  };

  const joinRoom = () => {
    try {
      if (!value || value.trim() === "" || !socket) return;

      setIsJoining(true);

      socket.emit("join_room", value);
      socket.on("room_join_error", ({ error }) => alert(error));

      setIsJoining(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsJoining(false);
    }
  };

  const handleCopyToClipboard = (roomId: string) => {
    copyTextToClipboard(roomId);

    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinRoom();
    setError("");
    isGameRoomFull();
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          {players.size === 0 ? (
            <div className={styles.container}>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter room ID"
                />
                <button disabled={isJoining} type="submit">
                  {isJoining ? "Joining..." : "Join"}
                </button>

                {error && <p className={styles.error}>Invalid room id</p>}
              </form>

              <div className={styles.divider}>
                <span></span>
                <span>or</span>
                <span></span>
              </div>

              {roomId && (
                <a href="#" onClick={() => handleCopyToClipboard(roomId)}>
                  {roomId}
                </a>
              )}
              {isVisible && (
                <p className={styles.copyText}>ID copied to clipboard</p>
              )}
              <button onClick={handleGenerateRoomId}>Generate Room Id</button>
            </div>
          ) : players.size === 1 ? (
            <p className={styles.loadingText}>
              <span className={styles.loader}></span>
              Waiting for other player to join
            </p>
          ) : null}
        </ModalOverlay>
      )}
    </>
  );
};

export default InviteModal;
