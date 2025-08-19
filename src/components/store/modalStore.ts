import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  isEditOpen: boolean;
  isCreate: boolean;
  setIsCreate: (isCreate: boolean) => void;
  setIsEditOpen: (isEditOpen: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const modalStore = create<ModalStore>((set) => ({
  isOpen: false,
  isCreate: false,
  isEditOpen: false,
  setIsCreate: (isCreate) => set({ isCreate }),
  setIsEditOpen: (isEditOpen) => set({ isEditOpen }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
