import { motion } from "framer-motion";

import { pvcpuVariants, pvpVariants } from "../../../animations";

import useGame from "../../../store/useGame";
import useGameMode from "../../../store/useGameMode";
import useGameScreen from "../../../store/useGameScreen";
import useDifficultyModal from "../../../store/useDifficultyModal";
import { PVCPU, PVP, PVPOnline } from "../../../lib/constants";

import styles from "./index.module.css";

const SelectMode = () => {
  const startGame = useGame((state) => state.startGame);

  const setMode = useGameMode((state) => state.setMode);
  const setScreen = useGameScreen((state) => state.setScreen);

  const onOpen = useDifficultyModal((state) => state.onOpen);

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
        }}
      >
        new game (vs player)
      </motion.button>

      <motion.button
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pvcpuVariants}
        className={styles.btnThree}
        onClick={() => {
          setScreen("create-game");
          setMode(PVPOnline);
        }}
      >
        Online Game (vs player)
      </motion.button>
    </div>
  );
};

export default SelectMode;
