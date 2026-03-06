import React from "react";
import { View } from "react-native";

interface InvisibleInputDividerProps {
  className?: string;
}

export default function InvisibleInputDivider({ className }: InvisibleInputDividerProps) {
  return <View className={`h-0.5 bg-gray-50 my-2 ${className}`} />;
}
