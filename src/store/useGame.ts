import { create } from "zustand";

import { O, Tie, X } from "../lib/constants";

type GameStore = {
  mark: string;
  setMark: (mark: string) => void;
  turn: string;
  currentBoard: string[];
  updateBoard: (turn: string, index: number) => void;
  winner: string | null;
  setWinner: (winner: string | null) => void;
  hasGameStarted: boolean;
  winPattern: number[] | null;
  setWinPattern: (pattern: number[] | null) => void;
  startGame: () => void;
  clearBoard: () => void;
  score: {
    X: number;
    O: number;
    Tie: number;
  };
  updateScore: (winner: string | null) => void;
  clearScore: () => void;
  playerChoice: {
    player1: string;
    player2: string;
  };
  playerOneChoice: string;
  setPlayerOneChoice: (choice: string) => void;
  gameDifficulty: string;
  setGameDifficulty: (gameDifficulty: string) => void;
  resetGameDifficulty: () => void;
};

const useGame = create<GameStore>((set) => ({
  mark: "X",
  setMark: (mark) => set({ mark: mark }),
  turn: "X",
  currentBoard: Array(9).fill(""),

  updateBoard: (turn, index) => {
    set((state) => {
      // Create a new copy of the current board array
      const newBoard = [...state.currentBoard];
      newBoard[index] = turn;

      // Toggle the turn
      const newTurn = state.turn === "X" ? "O" : "X";

      // Return the new state object
      return {
        ...state,
        currentBoard: newBoard,
        turn: newTurn,
      };
    });
  },

  winner: null,
  setWinner: (winner) => set({ winner: winner }),
  winPattern: null,
  setWinPattern: (pattern) => set({ winPattern: pattern }),
  hasGameStarted: false,
  startGame: () => set({ hasGameStarted: true }),
  clearBoard: () =>
    set({
      currentBoard: Array(9).fill(""),
      turn: "X",
      winPattern: null,
    }),
  score: {
    X: 0,
    O: 0,
    Tie: 0,
  },
  updateScore: () =>
    set((state) => {
      const { winner } = state;
      if (winner === X) {
        return {
          score: { ...state.score, X: state.score.X + 1 },
        };
      } else if (winner === O) {
        return {
          score: { ...state.score, O: state.score.O + 1 },
        };
      } else if (winner === Tie) {
        return {
          score: { ...state.score, Tie: state.score.Tie + 1 },
        };
      } else {
        return state;
      }
    }),
  clearScore: () => set({ score: { X: 0, O: 0, Tie: 0 } }),
  playerChoice: {
    player1: X,
    player2: O,
  },
  playerOneChoice: X,
  setPlayerOneChoice: (choice) => {
    set({
      playerOneChoice: X,
      playerChoice: {
        player1: choice,
        player2: choice === X ? O : X,
      },
    });
  },
  gameDifficulty: "",
  setGameDifficulty: (difficulty) => set({ gameDifficulty: difficulty }),
  resetGameDifficulty: () => set({ gameDifficulty: "" }),
}));

export default useGame;
