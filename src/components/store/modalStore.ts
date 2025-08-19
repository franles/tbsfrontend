import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  isCreate: boolean;
  setIsCreate: (isCreate: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const modalStore = create<ModalStore>((set) => ({
  isOpen: false,
  isCreate: false,
  setIsCreate: (isCreate) => set({ isCreate }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
