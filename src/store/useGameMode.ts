import { create } from "zustand";

type GameModeStore = {
  mode: string;
  setMode: (mode: string) => void;
};

const useGameMode = create<GameModeStore>((set) => ({
  mode: "",
  setMode: (mode: string) => set({ mode: mode }),
}));

export default useGameMode;
