import useGame from "../store/useGame";
import { O, Tie, X } from "./constants";

// Pure function for checking winner without side effects (for AI)
const checkWinnerPure = (currentBoard: string[]) => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      currentBoard[a] &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[a] === currentBoard[c]
    ) {
      return currentBoard[a]; // Return the winning player (either 'X' or 'O')
    }
  }

  // Check if the board is full (no empty cells)
  if (currentBoard.every((cell) => cell !== "")) {
    return Tie;
  }

  // If no winner yet
  return null;
};

export const calculateWinner = (currentBoard: string[]) => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      currentBoard[a] &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[a] === currentBoard[c]
    ) {
      // Set win pattern using current state
      const setWinPattern = useGame.getState().setWinPattern;
      setWinPattern(pattern);
      return currentBoard[a]; // Return the winning player (either 'X' or 'O')
    }
  }

  // Check if the board is full (no empty cells)
  if (currentBoard.every((cell) => cell !== "")) {
    return Tie;
  }

  // If no winner yet
  return null;
};

// // check if there are any available cells
const isBoardFull = (board: string[]) => {
  return board.every((item) => item !== "");
};

export const minimax = (
  currentBoard: string[],
  currentPlayer: string,
  playerChoice?: { player1: string; player2: string }
): { move: number | null; score: number } => {
  // Get current player choices or use defaults
  const choices = playerChoice || useGame.getState().playerChoice;
  const PLAYER = choices.player1;
  const CPU = choices.player1 === X ? O : X;

  // Use pure function to avoid side effects during AI computation
  const winner = checkWinnerPure(currentBoard);
  
  if (winner === CPU) {
    return { score: 10, move: null };
  } else if (winner === PLAYER) {
    return { score: -10, move: null };
  } else if (isBoardFull(currentBoard)) {
    return { score: 0, move: null };
  }

  let bestMove: number | null = null;
  let bestScore: number = currentPlayer === CPU ? -Infinity : Infinity;

  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] == "") {
      const newBoard = [...currentBoard];
      newBoard[i] = currentPlayer;
      const score = minimax(
        newBoard,
        currentPlayer === CPU ? PLAYER : CPU,
        choices
      ).score;

      if (
        (currentPlayer === CPU && score > bestScore) ||
        (currentPlayer === PLAYER && score < bestScore)
      ) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return { move: bestMove, score: bestScore };
};

const emptyIndexes = (board: string[]): number[] => {
  return board.reduce((indexes, item, index) => {
    if (item === "") {
      indexes.push(index);
    }
    return indexes;
  }, [] as number[]);
};

export const cpuMove = (board: string[], cpu: string, difficulty: string) => {
  const EasyMode = (newBoard: string[]) => {
    const availableSpots = emptyIndexes(newBoard);
    if (availableSpots.length === 0) return { move: null };
    const random = Math.floor(Math.random() * availableSpots.length);
    return { move: availableSpots[random] };
  };

  const NormalMode = () => {
    const random = Math.floor(Math.random() * 2);
    if (random) {
      const playerChoice = useGame.getState().playerChoice;
      const result = minimax(board, cpu, playerChoice);
      if (result.move !== null) {
        return { move: result.move };
      }
    }
    return EasyMode(board);
  };

  if (difficulty === "easy") {
    return EasyMode(board);
  } else if (difficulty === "normal") {
    return NormalMode();
  } else if (difficulty === "hard") {
    const playerChoice = useGame.getState().playerChoice;
    const result = minimax(board, cpu, playerChoice);
    if (result.move !== null) {
      return { move: result.move };
    }
    return EasyMode(board); // Fallback to easy mode
  }

  // Default fallback
  return EasyMode(board);
};

export async function shareLink(title: string, url: string) {
  try {
    await navigator.share({
      title: title,
      url: url,
    });
    console.log("Link shared successfully!");
  } catch (error) {
    console.error("Error sharing link:", error);
  }
}

// copy text to clipboard
export const copyTextToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};
