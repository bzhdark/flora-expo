import { BottomSheetConfig, useBottomSheetStore } from "@/lib/stores/bottomSheetStore";
import { useRouter } from "expo-router";

export const useBottomSheet = () => {
  const router = useRouter();
  const { openSheet, closeSheet, closeActiveSheet, updateSheetProps, clearAllSheets, activeSheetId } =
    useBottomSheetStore();

  const openBottomSheet = (config: Omit<BottomSheetConfig, "id"> & { id?: string }) => {
    const sheetId = config.id || `sheet_${Date.now()}_${Math.random()}`;
    openSheet({ ...config, id: sheetId });
    return sheetId;
  };

  // Helper to close sheet and navigate
  const closeAndNavigate = (path: string, params?: Record<string, any>) => {
    closeActiveSheet();
    // Small delay to allow sheet close animation
    setTimeout(() => {
      if (params) {
        router.push({ pathname: path as any, params });
      } else {
        router.push(path as any);
      }
    }, 150);
  };

  // Helper to replace current route after closing sheet
  const closeAndReplace = (path: string, params?: Record<string, any>) => {
    closeActiveSheet();
    setTimeout(() => {
      if (params) {
        router.replace({ pathname: path as any, params });
      } else {
        router.replace(path as any);
      }
    }, 150);
  };

  const isSheetOpen = (id?: string) => {
    return id ? activeSheetId === id : activeSheetId !== null;
  };

  return {
    openBottomSheet,
    closeSheet,
    closeActiveSheet,
    closeAndNavigate,
    closeAndReplace,
    updateSheetProps,
    clearAllSheets,
    isSheetOpen,
    activeSheetId,
    router,
  };
};
