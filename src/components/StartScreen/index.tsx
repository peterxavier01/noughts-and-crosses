import { useEffect } from "react";
import { motion } from "framer-motion";

import { logoMarkVariants } from "../../animations";

import SelectMode from "./SelectMode";
import SelectMark from "./SelectMark";

import Logo from "../../assets/logo.svg";

import useGame from "../../store/useGame";

import styles from "./index.module.css";

const StartScreen = () => {
  useEffect(() => {
    const resetWinner = useGame.getState().resetWinner;

    resetWinner();
  }, []);

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

      <SelectMark />

      <SelectMode />
    </div>
  );
};

export default StartScreen;
