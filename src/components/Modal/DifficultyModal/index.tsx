import { ModalOverlay } from "..";

import { EASY, HARD, NORMAL, PVCPU } from "../../../lib/constants";

import useDifficultyModal from "../../../store/useDifficultyModal";
import useGame from "../../../store/useGame";
import useGameMode from "../../../store/useGameMode";
import useGameScreen from "../../../store/useGameScreen";

import styles from "./index.module.css";

const DifficultyModal = () => {
  const isOpen = useDifficultyModal((state) => state.isOpen);
  const onClose = useDifficultyModal((state) => state.onClose);

  const setMode = useGameMode((state) => state.setMode);
  const setScreen = useGameScreen((state) => state.setScreen);
  const setGameDifficulty = useGame((state) => state.setGameDifficulty);

  const selectDifficulty = (event: React.MouseEvent) => {
    const targetElement = event?.target as HTMLLIElement;
    const difficulty = targetElement.dataset.difficulty;

    if (difficulty) setGameDifficulty(difficulty);

    setMode(PVCPU);
    setScreen("play");
    onClose();
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <div className={styles.container}>
            <h2 className={styles.header}>Select difficulty</h2>
            <ul className={styles.list}>
              <li
                className={styles.item}
                onClick={selectDifficulty}
                data-difficulty={EASY}
              >
                Easy
              </li>
              <li
                className={styles.item}
                onClick={selectDifficulty}
                data-difficulty={NORMAL}
              >
                Normal
              </li>
              <li
                className={styles.item}
                onClick={selectDifficulty}
                data-difficulty={HARD}
              >
                Hard
              </li>
            </ul>
          </div>
        </ModalOverlay>
      )}
    </>
  );
};

export default DifficultyModal;
