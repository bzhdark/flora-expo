import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface ActionSheetButtonProps extends PressableProps {
  label: string;
  className?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: "purple" | "red" | "orange" | "gray";
}

const colorConfig = {
  purple: {
    bg: "bg-purple-50",
    activeBg: "active:bg-purple-100",
    border: "border-purple-200",
    text: "text-purple-700",
    iconColor: "#7c3aed",
  },
  red: {
    bg: "bg-red-50",
    activeBg: "active:bg-red-100",
    border: "border-red-200",
    text: "text-red-700",
    iconColor: "#dc2626",
  },
  orange: {
    bg: "bg-amber-50",
    activeBg: "active:bg-amber-100",
    border: "border-amber-200",
    text: "text-amber-700",
    iconColor: "#d97706",
  },
  gray: {
    bg: "bg-slate-50",
    activeBg: "active:bg-slate-100",
    border: "border-slate-200",
    text: "text-slate-600",
    iconColor: "#475569",
  },
};

export default function ActionSheetButton({
  label,
  className,
  icon,
  onPress,
  color = "purple",
  ...props
}: ActionSheetButtonProps) {
  const config = colorConfig[color];

  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "h-20 w-20 rounded-2xl flex items-center justify-center gap-1.5",
        "border",
        config.bg,
        config.activeBg,
        config.border,
        "active:scale-[0.97]",
        className
      )}
      {...props}
    >
      <Ionicons name={icon} size={28} color={config.iconColor} />
      <Text
        className={clsx(
          "text-[11px] text-center font-medium",
          config.text
        )}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}
