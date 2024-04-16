import { useEffect } from "react";

import Cell from "../Cell";

import useGame from "../../../store/useGame";
import useGameMode from "../../../store/useGameMode";
import useEndGameModal from "../../../store/useEndGameModal";

import { O, PVCPU, X } from "../../../lib/constants";
import { calculateWinner, cpuMove } from "../../../lib/utils";

import styles from "./index.module.css";

const Board = () => {
  const currentBoard = useGame((state) => state.currentBoard);
  const winner = useGame((state) => state.winner);
  const updateScore = useGame((state) => state.updateScore);
  const playerChoice = useGame((state) => state.playerChoice);
  const turn = useGame((state) => state.turn);
  const gameDifficulty = useGame((state) => state.gameDifficulty);

  const mode = useGameMode((state) => state.mode);

  const onOpen = useEndGameModal((state) => state.onOpen);

  // Update score on game over
  useEffect(() => {
    const handleScoreUpdate = () => {
      updateScore(winner);
    };

    handleScoreUpdate();
  }, [winner, updateScore]);

  // CPU to make move
  useEffect(() => {
    const updateBoard = useGame.getState().updateBoard;
    const setWinner = useGame.getState().setWinner;
    const toggleCpuTurn = useGame.getState().toggleCpuTurn;
    const isWinner = calculateWinner(currentBoard);

    if (isWinner) {
      // Get the winner
      setWinner(isWinner);

      // // Open modal when the game is over
      onOpen();
    } else if (playerChoice.player1 !== turn && mode === PVCPU) {
      toggleCpuTurn();
      const CPU = playerChoice.player1 === X ? O : X;
      const board = [...currentBoard];

      const cpuToMove = cpuMove(board, CPU, gameDifficulty);

      const timer = setTimeout(() => {
        updateBoard(turn, cpuToMove?.move as number);
        toggleCpuTurn();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [onOpen, currentBoard, mode, playerChoice, winner, turn, gameDifficulty]);

  return (
    <div className={styles.container}>
      {currentBoard.map((mark, index) => (
        <Cell key={index} index={index} cell={mark} />
      ))}
    </div>
  );
};

export default Board;
