import useGameScreen from "../../../store/useGameScreen";
import useEndGameModal from "../../../store/useEndGameModal";
import { ModalOverlay } from "..";

import useGame from "../../../store/useGame";
import useGameMode from "../../../store/useGameMode";

import IconX from "../../../assets/IconX";
import IconO from "../../../assets/iconO";

import { O, PVCPU, PVP, Tie, X } from "../../../lib/constants";

import styles from "./index.module.css";

const EndGameModal = () => {
  const winner = useGame((state) => state.winner);
  const setScreen = useGameScreen((state) => state.setScreen);
  const clearBoard = useGame((state) => state.clearBoard);
  const clearScore = useGame((state) => state.clearScore);
  const playerChoice = useGame((state) => state.playerChoice);

  const mode = useGameMode((state) => state.mode);
  const resetGameDifficulty = useGame((state) => state.resetGameDifficulty);

  const isOpen = useEndGameModal((state) => state.isOpen);
  const onClose = useEndGameModal((state) => state.onClose);

  const quitHandler = () => {
    onClose();
    clearBoard();
    clearScore();
    resetGameDifficulty();
    setScreen("start");
  };

  const nextRoundHandler = () => {
    onClose();
    clearBoard();
  };

  const winRound = winner === X || winner === O;

  let resultText;

  if (winner !== Tie && mode === PVCPU) {
    resultText =
      playerChoice.player1 === winner ? "You won!" : "Oh no! You lost...";
  }

  if (winner !== Tie && mode === PVP) {
    resultText =
      playerChoice.player1 === winner ? "player 1 won " : "player 2 won";
  }

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <div className={styles.container}>
            {winRound && <p className={styles.resultText}>{resultText}</p>}

            {winRound ? (
              <div className={styles.markResult}>
                <span>
                  {winner === X ? (
                    <IconX currentColor="var(--color-light-blue)" />
                  ) : (
                    <IconO currentColor="var(--color-light-blue)" />
                  )}
                </span>
                <span>takes the round</span>
              </div>
            ) : winner === Tie ? (
              <div className={styles.markResult}>
                <span className={styles.roundTied}>Round tied</span>
              </div>
            ) : null}

            <div className={styles.btnWrapper}>
              <button onClick={quitHandler} className={styles.btnOne}>
                quit
              </button>
              <button onClick={nextRoundHandler} className={styles.btnTwo}>
                next round
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </>
  );
};

export default EndGameModal;
