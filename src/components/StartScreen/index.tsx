import { useEffect } from "react";
import { motion } from "framer-motion";

import { logoMarkVariants } from "../../animations";

import SelectMode from "./SelectMode";

import IconX from "../../assets/IconX";
import Logo from "../../assets/logo.svg";
import IconO from "../../assets/iconO";

import useGame from "../../store/useGame";
// import useMultiPlayer from "../../store/useMultiPlayer";
import useGameScreen from "../../store/useGameScreen";

import styles from "./index.module.css";

import { socket } from "../../lib/socket";
import { O, X } from "../../lib/constants";

const StartScreen = () => {
  const mark = useGame((state) => state.mark);
  const setMark = useGame((state) => state.setMark);
  const setPlayerOneChoice = useGame((state) => state.setPlayerOneChoice);

  const handleSelected = (selected: string) => {
    setMark(selected);
    setPlayerOneChoice(selected);
  };

  const screen = useGameScreen((state) => state.screen);
  const setScreen = useGameScreen((state) => state.setScreen);

  // const roomId = useMultiPlayer((state) => state.roomId);
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("roomId");

  useEffect(() => {
    const joinPath = window.location.href.includes("/join");

    // // Emit 'joinRoom' event with the room ID to join the room
    if (joinPath && roomId && screen === "start") {
      setScreen("play");
      socket.emit("joinRoom", roomId);
    }
  }, [setScreen, roomId, screen]);

  return (
    <div className={styles.container}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={logoMarkVariants}
        className={styles.rowOne}
      >
        <img src={Logo} alt="noughts and crosses royale logo" />
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={logoMarkVariants}
        className={styles.rowTwo}
      >
        <h1>Pick player 1's mark</h1>

        <div className={styles.selectBox}>
          <button
            onClick={() => handleSelected(X)}
            className={mark === X ? styles.selected : styles.notSelected}
          >
            <IconX currentColor="var(--color-dark-navy)" />
          </button>
          <button
            onClick={() => handleSelected(O)}
            className={mark === O ? styles.selected : styles.notSelected}
          >
            <IconO currentColor="var(--color-dark-navy)" />
          </button>
        </div>

        <p>remember: x goes first</p>
      </motion.div>

      <SelectMode />
    </div>
  );
};

export default StartScreen;
