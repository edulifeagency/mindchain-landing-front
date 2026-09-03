import { create } from "zustand";
import { SiteConfig } from "../types/config";

interface LayoutState {
  siteConfig: SiteConfig | null;
  setSiteConfig: (siteConfig: SiteConfig) => void;
  clearSiteConfig: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  siteConfig: null,

  setSiteConfig: (siteConfig) => set({ siteConfig }),

  clearSiteConfig: () => set({ siteConfig: null }),
}));
