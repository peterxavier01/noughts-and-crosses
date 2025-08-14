import { useCallback, useEffect } from "react";

import WinCell from "../WinCell";

import useGame from "../../../store/useGame";
import useGameMode from "../../../store/useGameMode";
import useMultiPlayer from "../../../store/useMultiPlayer";

import IconXOutline from "../../../assets/icon-x-outline.svg";
import IconOOutline from "../../../assets/icon-o-outline.svg";
import IconX from "../../../assets/IconX";
import IconO from "../../../assets/iconO";

import { socket } from "../../../lib/socket";
import { O, PVPOnline, X } from "../../../lib/constants";

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
  const mode = useGameMode((state) => state.mode);

  // Get multiplayer state for turn validation
  const playerRole = useMultiPlayer((state) => state.playerRole);
  const isMyTurn = useMultiPlayer((state) => state.isMyTurn);
  const setIsMyTurn = useMultiPlayer((state) => state.setIsMyTurn);

  // Return all indexes that contain the win pattern
  const cellMatch = winPattern?.includes(index);

  useEffect(() => {
    const handleGameMove = (moveData: {
      index: number;
      turn: string;
      currentTurn?: string;
      gameBoard?: string[];
    }) => {
      updateBoard(moveData.turn, moveData.index);

      // Update turn status for PVPOnline mode
      if (mode === PVPOnline && moveData.currentTurn && playerRole) {
        const newIsMyTurn = playerRole === moveData.currentTurn;
        setIsMyTurn(newIsMyTurn);
      }
    };

    const handleError = (error: { message: string }) => {
      if (import.meta.env.DEV) {
        console.error("❌ [DEBUG] Game error:", error.message);
      }
      // Optionally show error to user
    };

    socket.on("on_game_move", handleGameMove);
    socket.on("error", handleError);

    return () => {
      socket.off("on_game_move", handleGameMove);
      socket.off("error", handleError);
    };
  }, [updateBoard, mode, playerRole, setIsMyTurn]);

  const clickHandler = useCallback(
    (index: number) => {
      // Disallow move if already marked or game is over
      if (currentBoard[index] !== "" || winner) return;

      if (mode === PVPOnline) {
        // Check if it's the player's turn
        if (!isMyTurn) {
          return;
        }

        // Check if the move matches the player's role
        if (playerRole !== turn) {
          return;
        }

        // For online mode, emit move to server (server will validate and broadcast)
        socket.emit("game_move", { index, turn });
        // Don't update board locally, wait for server confirmation
      } else {
        // For local modes, update board directly
        updateBoard(turn, index);
      }
    },
    [turn, mode, currentBoard, winner, isMyTurn, playerRole, updateBoard]
  );

  // Return any cell that is selected or marked
  const isMarked = currentBoard[index] !== "";

  const matchCellX = winner === X && cellMatch;
  const matchCellO = winner === O && cellMatch;

  if (isMarked && cell === X) {
    return (
      <WinCell
        matchCell={matchCellX}
        btnStyles={isMarked ? styles.selected : styles.container}
        iconStyles={styles.iconSolid}
        Icon={IconX}
        accentColor="var(--color-light-blue)"
      />
    );
  }

  if (isMarked && cell === O) {
    return (
      <WinCell
        matchCell={matchCellO}
        btnStyles={isMarked ? styles.selected : styles.container}
        iconStyles={styles.iconSolid}
        Icon={IconO}
        accentColor="var(--color-light-yellow)"
      />
    );
  }

  // Determine if clicks should be disabled
  const shouldDisableClick = () => {
    if (isCpuToPlay) return true;
    if (mode === PVPOnline && !isMyTurn) return true;
    return false;
  };

  return (
    <button
      className={`${styles.container} ${
        mode === PVPOnline && !isMyTurn ? styles.disabled : ""
      }`}
      onClick={shouldDisableClick() ? () => {} : () => clickHandler(index)}
      disabled={mode === PVPOnline && !isMyTurn}
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
