import { useEffect } from "react";

import useGame from "../../../store/useGame";
import useEndGameModal from "../../../store/useEndGameModal";

import IconXOutline from "../../../assets/icon-x-outline.svg";
import IconOOutline from "../../../assets/icon-o-outline.svg";
import IconX from "../../../assets/IconX";
import IconO from "../../../assets/iconO";

import { calculateWinner } from "../../../lib/utils";

import styles from "./index.module.css";

import { O, X } from "../../../lib/constants";

type CellProps = {
  index: number;
  cell: string;
};

const Cell: React.FC<CellProps> = ({ index, cell }) => {
  const turn = useGame((state) => state.turn);
  const updateBoard = useGame((state) => state.updateBoard);
  const currentBoard = useGame((state) => state.currentBoard);
  const winner = useGame((state) => state.winner);
  const setWinner = useGame((state) => state.setWinner);
  const winPattern = useGame((state) => state.winPattern);

  const onOpen = useEndGameModal((state) => state.onOpen);

  // Return true for all indexes that contain the win pattern
  const cellMatch = winPattern?.includes(index);

  // Update the current board state and if there is no winner
  const clickHandler = () => {
    if (currentBoard[index] === "" && !calculateWinner(currentBoard)) {
      updateBoard(turn, index);
    }
  };

  // Get the winner
  useEffect(() => {
    setWinner(calculateWinner(currentBoard));
  }, [currentBoard, setWinner]);

  // Open modal when the game is over
  useEffect(() => {
    if (winner) {
      onOpen();
    }
  }, [winner, onOpen]);

  // Return any cell that is selected or marked
  const isMarked = currentBoard[index] !== "";

  const matchCellX = winner === X && cellMatch;
  const matchCellO = winner === O && cellMatch;

  if (isMarked && cell === X) {
    return (
      <button
        className={isMarked ? styles.selected : styles.container}
        style={{ backgroundColor: matchCellX ? "var(--color-light-blue)" : "" }}
      >
        <IconX
          currentColor={
            matchCellX
              ? "var(--color-semi-dark-navy)"
              : "var(--color-light-blue)"
          }
        />
      </button>
    );
  }

  if (isMarked && cell === O) {
    return (
      <button
        className={isMarked ? styles.selected : styles.container}
        style={{
          backgroundColor: matchCellO ? "var(--color-light-yellow)" : "",
        }}
      >
        <IconO
          currentColor={
            matchCellO
              ? "var(--color-semi-dark-navy)"
              : "var(--color-light-yellow)"
          }
        />
      </button>
    );
  }

  return (
    <button className={styles.container} onClick={clickHandler}>
      <img
        src={turn === "X" ? IconXOutline : IconOOutline}
        alt=""
        width={65}
        height={65}
      />
    </button>
  );
};

export default Cell;
