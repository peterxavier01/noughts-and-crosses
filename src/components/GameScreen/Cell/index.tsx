import useGame from "../../../store/useGame";

import IconXOutline from "../../../assets/icon-x-outline.svg";
import IconOOutline from "../../../assets/icon-o-outline.svg";
import IconX from "../../../assets/IconX";
import IconO from "../../../assets/iconO";

import { O, X } from "../../../lib/constants";

import styles from "./index.module.css";

type CellProps = {
  index: number;
  cell: string;
};

const Cell: React.FC<CellProps> = ({ index, cell }) => {
  const turn = useGame((state) => state.turn);
  const updateBoard = useGame((state) => state.updateBoard);
  const currentBoard = useGame((state) => state.currentBoard);
  const winner = useGame((state) => state.winner);
  const winPattern = useGame((state) => state.winPattern);
  const isCpuToPlay = useGame((state) => state.isCpuToPlay);

  // Return true for all indexes that contain the win pattern
  const cellMatch = winPattern?.includes(index);

  const clickHandler = (index: number) => {
    updateBoard(turn, index);
  };

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
          className={styles.iconSolid}
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
          className={styles.iconSolid}
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
    <button
      className={styles.container}
      onClick={isCpuToPlay ? () => {} : () => clickHandler(index)}
    >
      <img
        src={turn === X ? IconXOutline : IconOOutline}
        alt=""
        width={65}
        height={65}
        className={styles.iconOutline}
      />
    </button>
  );
};

export default Cell;
