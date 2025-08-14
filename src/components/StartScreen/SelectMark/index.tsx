import { motion } from "framer-motion";

import { logoMarkVariants } from "../../../animations";

import useGame from "../../../store/useGame";

import IconX from "../../../assets/IconX";
import IconO from "../../../assets/iconO";

import { O, X } from "../../../lib/constants";

import styles from "./index.module.css";

const SelectMark = () => {
  const mark = useGame((state) => state.mark);
  const setMark = useGame((state) => state.setMark);
  const setPlayerOneChoice = useGame((state) => state.setPlayerOneChoice);

  const handleSelected = (selected: string) => {
    setMark(selected);
    setPlayerOneChoice(selected);
  };

  return (
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
  );
};

export default SelectMark;
