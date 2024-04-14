import { useEffect } from "react";
import { motion } from "framer-motion";

import { pvcpuVariants, pvpVariants } from "../../../animations";

import useGame from "../../../store/useGame";
import useGameMode from "../../../store/useGameMode";
import useGameScreen from "../../../store/useGameScreen";
import useDifficultyModal from "../../../store/useDifficultyModal";
import useMultiPlayer from "../../../store/useMultiPlayer";

import { socket } from "../../../lib/socket";
import { PVCPU, PVP } from "../../../lib/constants";

import styles from "../index.module.css";

const SelectMode = () => {
  const startGame = useGame((state) => state.startGame);

  const setMode = useGameMode((state) => state.setMode);
  const screen = useGameScreen((state) => state.screen);
  const setScreen = useGameScreen((state) => state.setScreen);

  const onOpen = useDifficultyModal((state) => state.onOpen);

  const roomId = useMultiPlayer((state) => state.roomId);
  const setRoomId = useMultiPlayer((state) => state.setRoomId);
  const setPlayers = useMultiPlayer((state) => state.setPlayers);

  // Get the created room id and list of players
  useEffect(() => {
    socket.on("roomJoined", (players) => {
      setPlayers(players);
    });

    socket.on("roomCreated", (roomId) => {
      setRoomId(roomId);
    });
  }, [setRoomId, setPlayers]);

  // Join room after the room has been created
  useEffect(() => {
    if (screen === "play") {
      roomId && socket.emit("joinRoom", roomId);
    }
  }, [roomId, screen]);

  const createRoom = () => {
    socket.emit("createRoom");
  };

  return (
    <div className={styles.rowThree}>
      <motion.button
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pvcpuVariants}
        className={styles.btnOne}
        onClick={() => {
          onOpen();
          startGame();
          setMode(PVCPU);
        }}
      >
        New game (vs cpu)
      </motion.button>
      <motion.button
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pvpVariants}
        className={styles.btnTwo}
        onClick={() => {
          setScreen("play");
          startGame();
          setMode(PVP);
          createRoom();
        }}
      >
        new game (vs player)
      </motion.button>
    </div>
  );
};

export default SelectMode;
