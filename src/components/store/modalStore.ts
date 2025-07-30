import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  isEditOpen: boolean;
  setIsEditOpen: (isEditOpen: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const modalStore = create<ModalStore>((set) => ({
  isOpen: false,
  isEditOpen: false,
  setIsEditOpen: (isEditOpen) => set({ isEditOpen }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
