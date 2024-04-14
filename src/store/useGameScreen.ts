import { create } from "zustand";

type GameScreenStore = {
  screen: string;
  setScreen: (screen: string) => void;
};

const useGameScreen = create<GameScreenStore>((set) => ({
  screen: "start",
  setScreen: (name: string) => set({ screen: name }),
}));

export default useGameScreen;