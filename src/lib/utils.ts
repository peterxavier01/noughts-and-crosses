import useGame from "../store/useGame";
import { Tie } from "./constants";

const setWinPattern = useGame.getState().setWinPattern;

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
