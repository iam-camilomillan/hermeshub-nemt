/* Zustand Imports */
import { create } from "zustand";

/* Store Interface */
interface TripsStore {
  filtersData: {
    date: {
      from: Date;
      to: Date;
    };
    status: string[];
  };
  setFiltersData: (filters: TripsStore["filtersData"]) => void;
}

/* Store */
export const useTripsStore = create<TripsStore>((set) => ({
  filtersData: {
    date: {
      from: new Date(),
      to: new Date(),
    },
    status: [] as string[],
  },
  setFiltersData: (filters) => set({ filtersData: filters }),
}));
