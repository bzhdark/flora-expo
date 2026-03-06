import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomSheetStore } from "../lib/stores/bottomSheetStore";

export const BottomSheetManager: React.FC = () => {
  const { sheets, activeSheetId, closeSheet } = useBottomSheetStore();
  const bottomSheetRefs = useRef<{ [key: string]: BottomSheetModal }>({});

  const activeSheet = sheets.find((sheet) => sheet.id === activeSheetId);

  // Present the bottom sheet when it becomes active
  useEffect(() => {
    if (activeSheet && bottomSheetRefs.current[activeSheet.id]) {
      bottomSheetRefs.current[activeSheet.id].present();
    }
  }, [activeSheet]);

  // Custom backdrop component
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps, opacity: number = 0.5) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={opacity}
        onPress={() => {
          if (activeSheetId) {
            closeSheet(activeSheetId);
          }
        }}
      />
    ),
    [activeSheetId, closeSheet]
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1 && activeSheetId) {
        closeSheet(activeSheetId);
      }
    },
    [activeSheetId, closeSheet]
  );

  if (!activeSheet) {
    return null;
  }

  const Component = activeSheet.component;

  return (
    <BottomSheetModal
      ref={(ref) => {
        console.log("BottomSheetModal ref callback - ref:", ref, "activeSheet.id:", activeSheet.id);
        if (ref && activeSheet.id) {
          bottomSheetRefs.current[activeSheet.id] = ref;
          console.log("Ref stored for BottomSheetModal");
        }
      }}
      snapPoints={activeSheet.snapPoints!}
      enablePanDownToClose={activeSheet.enablePanDownToClose}
      backdropComponent={(props) => renderBackdrop(props, activeSheet.backdropOpacity)}
      onChange={handleSheetChanges}
      onDismiss={() => closeSheet(activeSheet.id)}
    >
      <BottomSheetView style={styles.contentContainer}>
        <SafeAreaView className='flex-1' edges={["bottom"]}>
          <Component {...(activeSheet.props || {})} />
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
