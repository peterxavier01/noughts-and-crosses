import { create } from "zustand";

type MultiPlayerStore = {
  roomId: string;
  setRoomId: (roomId: string) => void;
  players: string[];
  setPlayers: (players: string) => void;
};

const useMultiPlayer = create<MultiPlayerStore>((set) => ({
  roomId: "",
  setRoomId: (roomId: string) => set({ roomId: roomId }),
  players: [],
  setPlayers: (players) =>
    set((state) => {
      const playersArray = [...state.players, players];

      return {
        ...state,
        players: playersArray,
      };
    }),
}));

export default useMultiPlayer;
