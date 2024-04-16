import { motion } from "framer-motion";

import Display from "./Display";
import RestartBtn from "./RestartBtn";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";

import useGame from "../../store/useGame";
import useGameMode from "../../store/useGameMode";
import useInviteModal from "../../store/useInviteModal";

import {
  BoardVariants,
  footerVariants,
  headerVariants,
} from "../../animations";

import { O, PVCPU, PVP, X } from "../../lib/constants";

import styles from "./index.module.css";

import Logo from "../../assets/logo.svg";

const GameScreen = () => {
  const score = useGame((state) => state.score);
  const mode = useGameMode((state) => state.mode);
  const playerChoice = useGame((state) => state.playerChoice);

  const onOpen = useInviteModal((state) => state.onOpen);

  let textX;
  let textO;

  if (mode === PVP) {
    textX = playerChoice.player1 === X ? "P1" : "P2";
    textO = playerChoice.player1 === O ? "P1" : "P2";
  }

  if (mode === PVCPU) {
    textX = playerChoice.player1 === X ? "YOU" : "CPU";
    textO = playerChoice.player1 === O ? "YOU" : "CPU";
  }

  const handleClick = () => {
    onOpen();
  };

  return (
    <div className={styles.gameWrapper}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={headerVariants}
        className={styles.rowOne}
      >
        <div className={styles.logoBox}>
          <img src={Logo} alt="nought and crosses royale logo" />
        </div>
        <Display />
        <RestartBtn />
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={BoardVariants}
        className={styles.rowTwo}
      >
        <Board />
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={footerVariants}
        className={styles.rowThree}
      >
        <ScoreBoard
          text={`X ${textX}`}
          bgColor="var(--color-light-blue)"
          score={score.X}
        />
        <ScoreBoard
          text="TIES"
          bgColor="var(--color-silver)"
          score={score.Tie}
        />
        <ScoreBoard
          text={`O ${textO}`}
          bgColor="var(--color-light-yellow)"
          score={score.O}
        />
      </motion.div>
      {mode === PVP && (
        <button className={styles.invite} onClick={handleClick}>
          Invite Player
        </button>
      )}
    </div>
  );
};

export default GameScreen;
