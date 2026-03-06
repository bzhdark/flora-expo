import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React from "react";
import { Platform, Pressable, PressableProps } from "react-native";

interface HeaderButtonProps extends PressableProps {
  icon: keyof typeof Ionicons.glyphMap;
  className?: string;
  onPress: () => void;
}

export default function HeaderButton({ onPress, icon, className, ...props }: HeaderButtonProps) {
  if (Platform.OS === "android") {
    return (
      <Pressable
        onPress={onPress}
        className={clsx("p-3 rounded-full bg-gray-100 active:bg-gray-200", className)}
        {...props}
      >
        <Ionicons name={icon} size={24} color='gray' />
      </Pressable>
    );
  } else {
    return (
      <Pressable onPress={onPress} className={clsx("h-10 w-10 items-center justify-center", className)} {...props}>
        <Ionicons name={icon} size={24} />
      </Pressable >
    );
  }
}
