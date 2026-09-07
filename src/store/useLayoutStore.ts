import { create } from "zustand";
import { SiteConfig } from "../types/config";

interface LayoutState {
  siteConfig: SiteConfig | null;
  loading: boolean;

  setSiteConfig: (siteConfig: SiteConfig) => void;
  clearSiteConfig: () => void;

  setLoading: (loading: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  siteConfig: null,
  loading: true,

  setSiteConfig: (siteConfig) => set({ siteConfig }),

  clearSiteConfig: () => set({ siteConfig: null }),

  setLoading: (loading) => set({ loading }),
}));
