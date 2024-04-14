import { create } from "zustand";

interface EndGameModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEndGameModal = create<EndGameModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEndGameModal;
