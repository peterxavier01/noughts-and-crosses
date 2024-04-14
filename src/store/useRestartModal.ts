import { create } from "zustand";

interface RestartModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRestartModal = create<RestartModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRestartModal;
