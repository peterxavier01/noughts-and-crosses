import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";

import { socket } from "../../lib/socket";

import useMultiPlayer from "../../store/useMultiPlayer";
import useGameScreen from "../../store/useGameScreen";
import useGame from "../../store/useGame";

import styles from "./index.module.css";
import {
  arrowIconVariants,
  createScreenFormVariants,
  createScreenTextVariants,
  createScreenContainerVariants,
  waitingRoomVariants,
  waitingCardVariants,
} from "../../animations";

const CreateGameScreen = () => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const { setRoomId, setPlayers, setPlayerRole, setIsMyTurn } =
    useMultiPlayer();
  const roomId = useMultiPlayer((state) => state.roomId);
  const players = useMultiPlayer((state) => state.players);

  const { setScreen } = useGameScreen();
  const { startGame } = useGame();

  // Setup socket event listeners once - use empty dependency array to prevent re-registration
  useEffect(() => {
    const handleRoomJoined = (roomInfo: {
      roomId: string;
      players: string[];
      playerCount: number;
      playerRoles?: { [key: string]: string };
      currentTurn?: string;
      gameStarted?: boolean;
      isGameReady?: boolean;
    }) => {
      if (roomInfo && roomInfo.players) {
        const socketsSet = new Set(roomInfo.players);
        setPlayers(socketsSet);
        setRoomId(roomInfo.roomId);

        // Set player role and turn status
        if (roomInfo.playerRoles && socket.id) {
          const myRole = roomInfo.playerRoles[socket.id];
          setPlayerRole(myRole);

          if (roomInfo.currentTurn) {
            const isMyTurn = myRole === roomInfo.currentTurn;
            setIsMyTurn(isMyTurn);
          }
        }
      }
      setIsJoining(false);
    };

    const handlePlayerJoined = (roomInfo: {
      roomId: string;
      players: string[];
      playerCount: number;
      playerRoles?: { [key: string]: string };
      currentTurn?: string;
      gameStarted?: boolean;
      newPlayerId: string;
      isGameReady?: boolean;
    }) => {
      if (roomInfo && roomInfo.players) {
        const socketsSet = new Set(roomInfo.players);
        setPlayers(socketsSet);

        // Update player role and turn status
        if (roomInfo.playerRoles && socket.id) {
          const myRole = roomInfo.playerRoles[socket.id];
          setPlayerRole(myRole);

          if (roomInfo.currentTurn) {
            const isMyTurn = myRole === roomInfo.currentTurn;
            setIsMyTurn(isMyTurn);
          }
        }
      }

      // If game is ready and started, transition to game screen
      if (roomInfo.isGameReady && roomInfo.gameStarted) {
        startGame();
        setScreen("play");
      }
    };

    const handleRoomFull = (roomInfo: {
      roomId: string;
      players: string[];
      playerCount: number;
      isGameReady: boolean;
    }) => {
      if (roomInfo && roomInfo.players) {
        const socketsSet = new Set(roomInfo.players);
        setPlayers(socketsSet);
      }

      // Start the game!
      startGame();
      setScreen("play");
    };

    const handlePlayerLeft = (roomData: {
      players: string[];
      playerCount: number;
      leftPlayerId: string;
    }) => {
      if (roomData && roomData.players) {
        const socketsSet = new Set(roomData.players);
        setPlayers(socketsSet);
      }

      // If this was our own leave event, reset everything
      if (roomData.leftPlayerId === socket.id) {
        setPlayers(new Set());
        setRoomId("");
        setError("");
      }
    };

    const handleRoomCreated = (roomId: string) => {
      setRoomId(roomId);
    };

    const handleRoomJoinError = ({ error }: { error: string }) => {
      setError(error);
      setIsJoining(false);

      // Show user-friendly error message for full room
      if (error.includes("full") || error.includes("capacity")) {
        setError(
          "This room is at full capacity. Please try another room or create a new one."
        );
      }
    };

    socket.on("room_joined", handleRoomJoined);
    socket.on("player_joined", handlePlayerJoined);
    socket.on("player_left", handlePlayerLeft);
    socket.on("room_full", handleRoomFull);
    socket.on("room_created", handleRoomCreated);
    socket.on("room_join_error", handleRoomJoinError);

    return () => {
      if (import.meta.env.DEV) {
        console.log("🧹 [DEBUG] Cleaning up socket event listeners");
      }
      socket.off("room_joined", handleRoomJoined);
      socket.off("player_joined", handlePlayerJoined);
      socket.off("player_left", handlePlayerLeft);
      socket.off("room_full", handleRoomFull);
      socket.off("room_created", handleRoomCreated);
      socket.off("room_join_error", handleRoomJoinError);
    };
  }, [setRoomId, setPlayers, setPlayerRole, setIsMyTurn, setScreen, startGame]); // These should be stable now

  const createRoom = () => {
    socket.emit("create_room");
  };

  const joinRoom = () => {
    try {
      if (!value || value.trim() === "" || !socket) return;

      setIsJoining(true);
      setError("");

      socket.emit("join_room", value);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Error joining room:", err);
      }
      setIsJoining(false);
      setError("Failed to join room. Please try again.");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isJoining) {
      joinRoom();
      setError("");
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.toastIcon}>✓</div>
          Room ID copied to clipboard!
        </motion.div>
      )}

      {players.size === 0 ? (
        <motion.section
          className={styles.container}
          variants={createScreenContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            variants={arrowIconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.iconContainer}
            onClick={() => setScreen("start")}
          >
            <MdArrowBack size={32} className={styles.icon} />
          </motion.div>

          <motion.form
            variants={createScreenFormVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onSubmit={onSubmit}
          >
            <motion.h1
              variants={createScreenTextVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              Join a Game Room
            </motion.h1>

            <div className={styles.formContainer}>
              <motion.input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter room ID (e.g. ABC123)"
                disabled={isJoining}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />

              <motion.button
                disabled={isJoining || !value.trim()}
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {isJoining ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid transparent",
                        borderTop: "2px solid currentColor",
                        borderRadius: "50%",
                        animation: "loading 1s linear infinite",
                      }}
                    ></div>
                    Joining Room...
                  </div>
                ) : (
                  "Join Room"
                )}
              </motion.button>
            </div>

            <motion.div
              className={styles.divider}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span></span>
              <span>or</span>
              <span></span>
            </motion.div>

            <motion.button
              type="button"
              className={styles.createRoomButton}
              onClick={createRoom}
              disabled={isJoining}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Create New Room
            </motion.button>

            {error && (
              <motion.div
                className={styles.error}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </motion.form>
        </motion.section>
      ) : players.size === 1 ? (
        <motion.section
          className={styles.waitingContainer}
          variants={waitingRoomVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            variants={arrowIconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.iconContainer}
            onClick={() => {
              // Leave room if we're in one before going back
              if (roomId) {
                socket.emit("leave_room", roomId);
              }
            }}
          >
            <MdArrowBack
              size={32}
              className={styles.icon}
              color="var(--color-silver)"
              style={{ cursor: "pointer" }}
            />
          </motion.div>

          <motion.div
            className={styles.waitingCard}
            variants={waitingCardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className={styles.loadingText}>
              <div className={styles.loader}></div>
              <div>
                <div>Waiting for opponent</div>
                <div className={styles.loadingSubtext}>
                  Share the room ID with your friend
                </div>
              </div>
            </div>

            <motion.div
              className={styles.roomInfo}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {roomId}
            </motion.div>

            <div className={styles.playerCount}>
              <div className={styles.playerDot}></div>
              <span>{players.size} / 2 Players Connected</span>
            </div>

            <motion.div
              className={styles.buttonGroup}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.button
                className={styles.copyButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(roomId || "");
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                  } catch (err) {
                    console.error("Failed to copy room ID:", err);
                  }
                }}
              >
                Copy Room ID
              </motion.button>

              <motion.button
                className={styles.cancelButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  console.log("Leaving room:", roomId);
                  socket.emit("leave_room", roomId);
                  // Don't update state immediately, wait for server confirmation via player_left event
                }}
              >
                Leave Room
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.section>
      ) : null}
    </>
  );
};

export default CreateGameScreen;
