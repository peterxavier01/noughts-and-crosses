import { ModalOverlay } from "..";
import useGame from "../../../store/useGame";
import useGameScreen from "../../../store/useGameScreen";

import useRestartModal from "../../../store/useRestartModal";

import styles from "./index.module.css";

const RestartGameModal = () => {
  const isOpen = useRestartModal((state) => state.isOpen);
  const onClose = useRestartModal((state) => state.onClose);

  const clearBoard = useGame((state) => state.clearBoard);
  const clearScore = useGame((state) => state.clearScore);
  const resetGameDifficulty = useGame((state) => state.resetGameDifficulty);

  const setScreen = useGameScreen((state) => state.setScreen);

  const cancelHandler = () => {
    onClose();
  };

  const restartHandler = () => {
    onClose();
    setScreen("start");
    clearBoard();
    clearScore();
    resetGameDifficulty();
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <div className={styles.container}>
            <h4>Restart game?</h4>

            <div className={styles.btnBox}>
              <button onClick={cancelHandler} className={styles.btnOne}>
                no, cancel
              </button>
              <button onClick={restartHandler} className={styles.btnTwo}>
                yes, restart
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </>
  );
};

export default RestartGameModal;
