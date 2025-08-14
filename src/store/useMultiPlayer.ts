import { create } from "zustand";

type MultiPlayerStore = {
  roomId: string;
  setRoomId: (roomId: string) => void;
  players: Set<string>;
  setPlayers: (players: Set<string> | string) => void;
  addPlayer: (player: string) => void;
  clearPlayers: () => void;
  playerRole: string | null; // 'X' or 'O' or null
  setPlayerRole: (role: string | null) => void;
  isMyTurn: boolean;
  setIsMyTurn: (isMyTurn: boolean) => void;
};

const useMultiPlayer = create<MultiPlayerStore>((set) => ({
  roomId: "",
  setRoomId: (roomId: string) => set({ roomId: roomId }),
  players: new Set<string>(),
  setPlayers: (players) =>
    set(() => ({
      players: players instanceof Set ? new Set(players) : new Set([players]),
    })),
  addPlayer: (player: string) =>
    set((state) => ({
      players: new Set(state.players).add(player),
    })),
  clearPlayers: () => set({ players: new Set<string>() }),
  playerRole: null,
  setPlayerRole: (role: string | null) => set({ playerRole: role }),
  isMyTurn: false,
  setIsMyTurn: (isMyTurn: boolean) => set({ isMyTurn: isMyTurn }),
}));

export default useMultiPlayer;
