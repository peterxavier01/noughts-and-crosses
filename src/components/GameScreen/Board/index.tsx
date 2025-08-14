import { useEffect, useCallback, useRef } from "react";

import Cell from "../Cell";

import useGame from "../../../store/useGame";
import useGameMode from "../../../store/useGameMode";
import useEndGameModal from "../../../store/useEndGameModal";

import { O, PVCPU, X } from "../../../lib/constants";
import { calculateWinner, cpuMove } from "../../../lib/utils";

import styles from "./index.module.css";

const Board = () => {
  const processingCpuMove = useRef(false);

  const currentBoard = useGame((state) => state.currentBoard);
  const winner = useGame((state) => state.winner);
  const updateScore = useGame((state) => state.updateScore);
  const setWinner = useGame((state) => state.setWinner);
  const toggleCpuTurn = useGame((state) => state.toggleCpuTurn);
  const playerChoice = useGame((state) => state.playerChoice);
  const turn = useGame((state) => state.turn);
  const gameDifficulty = useGame((state) => state.gameDifficulty);
  const isCpuToPlay = useGame((state) => state.isCpuToPlay);

  const mode = useGameMode((state) => state.mode);

  const onOpen = useEndGameModal((state) => state.onOpen);

  // Memoize the score update callback
  const handleScoreUpdate = useCallback(() => {
    if (winner) {
      updateScore(winner);
    }
  }, [winner, updateScore]);

  // Update score on game over
  useEffect(() => {
    handleScoreUpdate();
  }, [handleScoreUpdate]);

  // CPU to make move
  useEffect(() => {
    console.log(
      "Board useEffect triggered. Turn:",
      turn,
      "isCpuToPlay:",
      isCpuToPlay,
      "mode:",
      mode
    );

    const isWinner = calculateWinner(currentBoard);

    if (isWinner) {
      console.log("Game has a winner:", isWinner);
      // Get the winner
      setWinner(isWinner); // Update winner state to open end game modal

      // Open modal when the game is over
      const timer = setTimeout(() => {
        onOpen();
      }, 700);

      return () => clearTimeout(timer);
    }

    // Simplified CPU logic - only trigger when it's CPU's turn and not already processing
    if (
      playerChoice.player1 !== turn &&
      mode === PVCPU &&
      !processingCpuMove.current
    ) {
      console.log(
        "CPU should play now. Turn:",
        turn,
        "Player1:",
        playerChoice.player1
      );

      // Mark that we're processing a CPU move
      processingCpuMove.current = true;

      // Prevent human moves during CPU turn
      if (!isCpuToPlay) {
        toggleCpuTurn();
      }

      const CPU = playerChoice.player1 === X ? O : X;
      const board = [...currentBoard];

      console.log(
        "CPU move calculation for:",
        CPU,
        "difficulty:",
        gameDifficulty
      );
      const cpuMoveResult = cpuMove(board, CPU, gameDifficulty);
      console.log("CPU move result:", cpuMoveResult);

      if (
        cpuMoveResult &&
        cpuMoveResult.move !== null &&
        cpuMoveResult.move !== undefined
      ) {
        const timer = setTimeout(() => {
          console.log("CPU making move at position:", cpuMoveResult.move);

          // Use getState to get the most current state
          const currentState = useGame.getState();
          console.log(
            "Fresh state - turn:",
            currentState.turn,
            "board:",
            currentState.currentBoard
          );

          // Make the CPU move
          currentState.updateBoard(
            currentState.turn,
            cpuMoveResult.move as number
          );

          console.log("CPU move completed, resetting flags");

          // Reset flags
          processingCpuMove.current = false;
          if (isCpuToPlay) {
            toggleCpuTurn();
          }
        }, 500);

        return () => {
          clearTimeout(timer);
          processingCpuMove.current = false;
        };
      } else {
        console.log("CPU couldn't find a valid move");
        processingCpuMove.current = false;
        if (isCpuToPlay) {
          toggleCpuTurn();
        }
      }
    }
  }, [
    currentBoard,
    mode,
    playerChoice,
    turn,
    gameDifficulty,
    isCpuToPlay,
    onOpen,
    setWinner,
    toggleCpuTurn,
  ]);

  return (
    <div className={styles.container}>
      {currentBoard.map((mark, index) => (
        <Cell key={index} index={index} cell={mark} />
      ))}
    </div>
  );
};

export default Board;
