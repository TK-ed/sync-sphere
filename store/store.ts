import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;

  fileName: string;
  setFileName: (name: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  fileName: "",
  setFileName: (fileName: string) => set((state) => ({ fileName })),

  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open) => set((state) => ({ isDeleteModalOpen: open })),
}));
