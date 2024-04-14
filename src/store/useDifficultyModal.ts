import { create } from "zustand";

interface DifficultyModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDifficultyModal = create<DifficultyModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDifficultyModal;
