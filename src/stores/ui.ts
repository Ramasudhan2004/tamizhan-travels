import { create } from 'zustand';

type UIState = {
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (v: boolean) => void;
  toggleMobileDrawer: () => void;

  lightboxOpen: boolean;
  lightboxIndex: number;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  setLightboxIndex: (index: number) => void;
  nextLightbox: () => void;
  prevLightbox: () => void;

  lenisInstance: any | null;
  setLenisInstance: (i: any) => void;
};

export const useUIStore = create<UIState>((set, get) => ({
  mobileDrawerOpen: false,
  setMobileDrawerOpen: (v) => set({ mobileDrawerOpen: v }),
  toggleMobileDrawer: () => set((s) => ({ mobileDrawerOpen: !s.mobileDrawerOpen })),

  lightboxOpen: false,
  lightboxIndex: 0,
  openLightbox: (index) => set({ lightboxOpen: true, lightboxIndex: index }),
  closeLightbox: () => set({ lightboxOpen: false }),
  setLightboxIndex: (index) => set({ lightboxIndex: index }),
  nextLightbox: () => { /* consumer sets length via context */ },
  prevLightbox: () => { /* consumer sets length via context */ },

  lenisInstance: null,
  setLenisInstance: (i) => set({ lenisInstance: i }),
}));

// lightbox length helper
export function useLightboxNavigate(length: number) {
  const { lightboxIndex, setLightboxIndex } = useUIStore();
  const next = () => setLightboxIndex((lightboxIndex + 1) % Math.max(length, 1));
  const prev = () => setLightboxIndex((lightboxIndex - 1 + Math.max(length, 1)) % Math.max(length, 1));
  return { next, prev };
}
