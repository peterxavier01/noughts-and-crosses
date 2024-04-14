import Cell from "../Cell";

import useGame from "../../../store/useGame";

import styles from "./index.module.css";
import { useEffect } from "react";

const Board = () => {
  const currentBoard = useGame((state) => state.currentBoard);
  const winner = useGame((state) => state.winner);
  const updateScore = useGame((state) => state.updateScore);

  // Update score on game over
  useEffect(() => {
    const handleScoreUpdate = () => {
      updateScore(winner);
    };

    handleScoreUpdate();
  }, [winner, updateScore]);

  return (
    <div className={styles.container}>
      {currentBoard.map((mark, index) => (
        <Cell key={index} index={index} cell={mark} />
      ))}
    </div>
  );
};

export default Board;
