/* Zustand Imports */
import { create } from "zustand";

/* Store Interface */
interface DrawerStore {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;

  drawerData: any;
  setDrawerData: (data: any) => void;

  refreshData: boolean;
  setRefreshData: (refresh: boolean) => void;
}

/* Store */
export const useDrawerStore = create<DrawerStore>((set) => ({
  isDrawerOpen: false,
  setIsDrawerOpen: (open) => set({ isDrawerOpen: open }),

  drawerData: null,
  setDrawerData: (data) => set({ drawerData: data }),

  refreshData: false,
  setRefreshData: (refresh) => set({ refreshData: refresh }),
}));
