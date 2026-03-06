import { create } from "zustand";

export interface BottomSheetConfig {
  id: string;
  component: React.ComponentType<any>;
  props?: any;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  backdropOpacity?: number;
  index?: number;
}

interface BottomSheetStore {
  sheets: BottomSheetConfig[];
  activeSheetId: string | null;

  // Actions
  openSheet: (config: BottomSheetConfig) => void;
  closeSheet: (id: string) => void;
  closeActiveSheet: () => void;
  updateSheetProps: (id: string, props: any) => void;
  clearAllSheets: () => void;
}

export const useBottomSheetStore = create<BottomSheetStore>((set, get) => ({
  sheets: [],
  activeSheetId: null,

  openSheet: (config) => {
    set((state) => {
      // Remove existing sheet with same ID if any
      const filteredSheets = state.sheets.filter((sheet) => sheet.id !== config.id);

      const newState = {
        sheets: [
          ...filteredSheets,
          {
            ...config,
            snapPoints: config.snapPoints || ["25%", "50%", "90%"],
            enablePanDownToClose: config.enablePanDownToClose ?? true,
            backdropOpacity: config.backdropOpacity ?? 0.5,
            index: config.index ?? 1,
          },
        ],
        activeSheetId: config.id,
      };
      return newState;
    });
  },

  closeSheet: (id) => {
    set((state) => ({
      sheets: state.sheets.filter((sheet) => sheet.id !== id),
      activeSheetId: state.activeSheetId === id ? null : state.activeSheetId,
    }));
  },

  closeActiveSheet: () => {
    const { activeSheetId, closeSheet } = get();
    if (activeSheetId) {
      closeSheet(activeSheetId);
    }
  },

  updateSheetProps: (id, newProps) => {
    set((state) => ({
      sheets: state.sheets.map((sheet) =>
        sheet.id === id ? { ...sheet, props: { ...sheet.props, ...newProps } } : sheet
      ),
    }));
  },

  clearAllSheets: () => {
    set({ sheets: [], activeSheetId: null });
  },
}));
