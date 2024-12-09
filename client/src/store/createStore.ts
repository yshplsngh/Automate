import { create } from "zustand";

const storeMap = new Map();

const getStoreForRoute = (id: string) => {
  if (!storeMap.has(id)) {
    const useStore = create((set) => ({
      state: null,
      setState: (value) => set({ state: value }),
      clearState: () => set({ state: null }),
    }));

    storeMap.set(id, useStore);
  }

  return storeMap.get(id);
};

export default getStoreForRoute;
