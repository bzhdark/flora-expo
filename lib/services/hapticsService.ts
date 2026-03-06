import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export const hapticsLight = async () => {
  if (Platform.OS === "ios") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } else {
    Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Context_Click);
  }
};

export const hapticsMedium = async () => {
  if (Platform.OS === "ios") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } else {
    Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Context_Click);
  }
};
